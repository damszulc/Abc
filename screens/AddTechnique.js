import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Block, Text, theme } from "galio-framework";
import { Switch, Button, Icon, Input } from "../components";

import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';

import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");

export default class AddTechnique extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
        data_teams: [],
        data_events_types: [],
        data_teams_managers: [],
        isLoading: true,
        team_id: 0,
        place: '',
        concert_date: '',
        concert_time: '',
        duration: 0,
        sample_date: '',
        sample_time: '',
        sets_number: 0,
        event_details: '',
        event_type_id: 0,
        tour_manager_id: 0,
        contact_phone: '',
        user_id: 0
    };

    AsyncStorage.getItem('logged_user_id')
         .then((value) => {
         this.setState({user_id: value})
    });
  }
  InsertRecord=()=>{
    var TeamId = this.state.team_id;
    var Place = this.state.place;
    var TechniqueDate = this.state.concert_date;
    var TechniqueTime = this.state.concert_time;
    var Duration = this.state.duration;
    var SampleDate = this.state.sample_date;
    var SampleTime = this.state.sample_time;
    var SetsNumber = this.state.sets_number;
    var EventDetails = this.state.event_details;
    var EventTypeId = this.state.event_type_id;
    var TourManagerId = this.state.tour_manager_id;
    var ContactPhone = this.state.contact_phone;
    var UserId = this.state.user_id;

    if (TeamId.value==0 || Place.length==0 || TechniqueDate.length==0 || TechniqueTime.length==0 || EventTypeId.value==0) {
      alert("Required field is missing !!!");
    }else{
      var APIURL = "http://srv36013.seohost.com.pl/anseba/save_concert.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        TeamId: TeamId,
        Place: Place,
        TechniqueDate: TechniqueDate,
        TechniqueTime: TechniqueTime,
        Duration: Duration,
        SampleDate: SampleDate,
        SampleTime: SampleTime,
        SetsNumber: SetsNumber,
        EventDetails: EventDetails,
        EventTypeId: EventTypeId,
        TourManagerId: TourManagerId,
        ContactPhone: ContactPhone,
        UserId: UserId
      };

      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
        if (Response[0].Message == "Success") {
          console.log("true")
          this.props.navigation.navigate("Techniques");
        }
      })
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })
    }
  }

  async getDictionaries() {
    try {
      const response = await fetch('http://srv36013.seohost.com.pl/anseba/get_dictionaries.php');
      const json = await response.json();
      this.setState({ data_teams: json.teams, data_events_types: json.events_types, data_teams_managers: json.teams_managers });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getDictionaries();
  }

  state = {};

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  render() {
    const { data_teams, data_events_types, data_teams_managers, isLoading } = this.state;

    const InputWithDatePickerTechnique = (props) => {
        const [date, setDate] = React.useState(new Date());
        const [showPicker, setShowPicker] = React.useState(false);

        return (
            <>
                <Input
                    placeholder="Technique date *"
                    style={styles.inputs_half}
                    iconContent={
                        <Icon
                            size={16}
                            color="#ADB5BD"
                            name="calendar-602x"
                            family="NowExtra"
                            style={styles.inputIcons}
                            onPress={() => setShowPicker(true)}

                        />
                    }
                    value={this.state.concert_date}
                    onClick={() => setShowPicker(true) || console.log(showPicker)}
                />
                { showPicker ? (
                     <DateTimePicker
                        testID="date-picker"
                        value={new Date(date)}
                        mode="date"
                        is24Hour={true}
                        onChange={(_: any, date?: Date) => setShowPicker(false) || this.setState({concert_date: Moment(date).format('DD/MM/YYYY')})}
                        minimumDate={new Date()}
                      />
                ) : null }
            </>
        );
    };

    const InputWithTimePickerTechnique = () => {
                const [time, setTime] = React.useState(new Date());
                const [showPicker, setShowPicker] = React.useState(false);

                return (
                    <>
                        <Input
                             placeholder="Technique time *"
                             style={styles.inputs_half}
                             iconContent={
                                 <Icon
                                    size={16}
                                    color="#ADB5BD"
                                    name="time-alarm2x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                    onPress={() => setShowPicker(true)}
                                 />
                             }
                            value={this.state.concert_time}
                             onClick={() => setShowPicker(true) || console.log(showPicker)}
                        />
                        { showPicker ? (
                             <DateTimePicker
                                testID="time-picker"
                                value={new Date(time)}
                                mode="time"
                                is24Hour={true}
                                onChange={(_: any, time?: Date) => setTime(time) || setShowPicker(false) || this.setState({concert_time: Moment(time).format('HH:mm')})}
                                timeZoneOffsetInSeconds={3600}
                              />
                        ) : null }
                    </>
                );
            };

   const InputWithDatePickerSample = (props) => {
           const [date, setDate] = React.useState(new Date());
           const [showPicker, setShowPicker] = React.useState(false);

           return (
               <>
                   <Input
                       placeholder="Sample date"
                       style={styles.inputs_half}
                       iconContent={
                           <Icon
                               size={16}
                               color="#ADB5BD"
                               name="calendar-602x"
                               family="NowExtra"
                               style={styles.inputIcons}
                               onPress={() => setShowPicker(true)}
                           />
                       }
                        value={this.state.sample_date}
                       onClick={() => setShowPicker(true) || console.log(showPicker)}
                   />
                   { showPicker ? (
                        <DateTimePicker
                           testID="date-picker"
                           value={new Date(date)}
                           mode="date"
                           is24Hour={true}
                           onChange={(_: any, date?: Date) => setDate(date) || setShowPicker(false) || this.setState({sample_date: Moment(date).format('DD/MM/YYYY')})}
                           maximumDate={new Date()}
                         />
                   ) : null }
               </>
           );
       };

       const InputWithTimePickerSample = () => {
                   const [time, setTime] = React.useState(new Date());
                   const [showPicker, setShowPicker] = React.useState(false);

                   return (
                       <>
                           <Input
                                placeholder="Sample time"
                                style={styles.inputs_half}
                                iconContent={
                                    <Icon
                                       size={16}
                                       color="#ADB5BD"
                                       name="time-alarm2x"
                                       family="NowExtra"
                                       style={styles.inputIcons}
                                       onPress={() => setShowPicker(true)}
                                    />
                                }
                                value={this.state.sample_time}
                                onClick={() => setShowPicker(true) || console.log(showPicker)}
                           />
                           { showPicker ? (
                                <DateTimePicker
                                   testID="time-picker"
                                   value={new Date(time)}
                                   mode="time"
                                   is24Hour={true}
                                   onChange={(_: any, time?: Date) => setTime(time) || setShowPicker(false) || this.setState({sample_time: Moment(time).format('HH:mm')})}
                                   timeZoneOffsetInSeconds={3600}
                                 />
                           ) : null }
                       </>
                   );
               };

    return isLoading ? <ActivityIndicator size="large" /> : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Basic information
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="Event name *"
                          style={styles.inputs}
                          iconContent={
                              <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="list-bullet2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                              />
                          }
                          value={this.state.event_name}
                          onChangeText={event_name=>this.setState({event_name})}
                      />
                    </Block>
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.team_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({team_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Select user from list *' value='0' />
                        { data_teams.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
               </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Place *"
                style={styles.inputs}
                iconContent={
                    <Icon
                        size={16}
                        color="#ADB5BD"
                        name="pin-32x"
                        family="NowExtra"
                        style={styles.inputIcons}
                    />
                }
                value={this.state.place}
                onChangeText={place=>this.setState({place})}
            />
          </Block>
          <Block row middle style={styles.rows}>
            <FlatList
                keyExtractor={(item, index) => item.id + index.toString()}
                ListHeaderComponent={InputWithDatePickerTechnique}
                horizontal={true}
            />
            <FlatList
                keyExtractor={(item, index) => item.id + index.toString()}
                ListHeaderComponent={InputWithTimePickerTechnique}
                horizontal={true}
            />
          </Block>

          <Block row middle style={styles.rows}>
            <Input
                placeholder="Duration in minutes *"
                style={styles.inputs}
                iconContent={
                    <Icon
                        size={16}
                        color="#ADB5BD"
                        name="time-alarm2x"
                        family="NowExtra"
                        style={styles.inputIcons}
                    />
                }
                value={this.state.duration}
                onChangeText={duration=>this.setState({duration})}
            />
          </Block>
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Additional information
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Event details"
                style={styles.inputs_textarea}
                iconContent={
                    <Icon
                        size={16}
                        color="#ADB5BD"
                        name="list-bullet2x"
                        family="NowExtra"
                        style={styles.inputIcons}
                    />
                }
                value={this.state.event_details}
                onChangeText={event_details=>this.setState({event_details})}/>
          </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="Contact phone"
                          style={styles.inputs_textarea}
                          iconContent={
                              <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="headphones-22x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                              />
                          }
                          value={this.state.contact_phone}
                          onChangeText={contact_phone=>this.setState({contact_phone})}/>
                    </Block>
          <Block row middle style={styles.rows, {paddingTop: 10}}>
            <Block center>
                <Button color="primary" round style={styles.createButton} onPress={()=>{this.InsertRecord()}}>
                    <Text
                        style={{ fontFamily: 'montserrat-bold' }}
                        size={14}
                        color={nowTheme.COLORS.WHITE}>
                            Save technical support
                    </Text>
                </Button>
            </Block>
          </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  rows: {
    height: theme.SIZES.BASE * 3.8,
    paddingHorizontal: theme.SIZES.BASE
  },
  rows_big: {
      height: theme.SIZES.BASE * 10,
      paddingHorizontal: theme.SIZES.BASE
    },
   inputs: {
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: 21.5,
      width: width-40,
    },
    inputs_half: {
          borderWidth: 1,
          borderColor: '#E3E3E3',
          borderRadius: 21.5,
          width: (width-50)/2,
          marginLeft: 5,
          marginRight: 5
        },
    inputs_textarea: {
          borderWidth: 1,
          borderColor: '#E3E3E3',
          borderRadius: 21.5,
          width: width-40
        },
    inputs_select: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E3E3E3',
              borderRadius: 25,
              width: width-40,
              paddingHorizontal: 10,
              paddingVertical: 0
            },
    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
      },
      createButton: {
        paddingHorizontal: 10,
        width: 230
      }
});