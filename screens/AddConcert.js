import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Switch } from "../components";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Icon, Input } from '../components';
import Moment from 'moment';

import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");

export default class AddConcert extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
        data_teams: [],
        data_events_types: [],
        data_teams_managers: [],
        isLoading: true,
        team_id: '',
        concert_date: '09/09/2022'
    };


  }
  InsertRecord=()=>{
    var TeamId = this.state.team_id;
    var ConcertDate = this.state.concert_date;

    if ((ConcertDate.length==0)){
      alert("Required Field Is Missing!!!");
    }else{
      var APIURL = "http://srv36013.seohost.com.pl/anseba/save_concert.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        TeamId: TeamId,
        ConcertDate: ConcertDate
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
          //this.props.navigation.navigate("App");
        }
        console.log(Data);
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

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case "switch":
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="#525F7F">{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              value={this.state[item.id]}
            />
          </Block>
        );
      case "button":
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate(item.id)}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="#525F7F">{item.title}</Text>
                <Icon
                  name="angle-right"
                  family="font-awesome"
                  style={{ paddingRight: 5 }}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        );
      default:
        break;
    }
  };

  render() {
    const { data_teams, data_events_types, data_teams_managers, isLoading } = this.state;

    const DropdownTeams = () => {
        return (
            <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                items={data_teams}
                placeholder={{label: "Select team from list", value: null}}
            />
        );
    };

    const DropdownEventsTypes = () => {
            return (
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={data_events_types}
                placeholder={{label: "Select event type from list", value: null}}
                />
            );
        };

    const DropdownTeamsManagers = () => {
            return (
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={data_teams_managers}
                placeholder={{label: "Select team manager from list", value: null}}
                />
            );
        };

    const InputWithDatePickerConcert = (props) => {
        const [date, setDate] = React.useState(new Date());
        const [showPicker, setShowPicker] = React.useState(false);

        return (
            <>
                <Input
                    placeholder="Concert date"
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

    const InputWithTimePickerConcert = () => {
                const [time, setTime] = React.useState(new Date());
                const [showPicker, setShowPicker] = React.useState(false);

                return (
                    <>
                        <Input
                             placeholder="Concert time"
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
                             onClick={() => setShowPicker(true) || console.log(showPicker)}
                        />
                        { showPicker ? (
                             <DateTimePicker
                                testID="time-picker"
                                value={new Date(time)}
                                mode="time"
                                is24Hour={true}
                                onChange={(_: any, time?: Date) => setTime(time) || setShowPicker(false) || console.log(time)}
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
                       onClick={() => setShowPicker(true) || console.log(showPicker)}
                   />
                   { showPicker ? (
                        <DateTimePicker
                           testID="date-picker"
                           value={new Date(date)}
                           mode="date"
                           is24Hour={true}
                           onChange={(_: any, date?: Date) => setDate(date) || setShowPicker(false) || console.log(date)}
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
                                onClick={() => setShowPicker(true) || console.log(showPicker)}
                           />
                           { showPicker ? (
                                <DateTimePicker
                                   testID="time-picker"
                                   value={new Date(time)}
                                   mode="time"
                                   is24Hour={true}
                                   onChange={(_: any, time?: Date) => setTime(time) || setShowPicker(false) || console.log(time)}
                                   timeZoneOffsetInSeconds={3600}
                                 />
                           ) : null }
                       </>
                   );
               };
    const recommended = [
      { title: "Use FaceID to sign in", id: "face", type: "switch" },
      { title: "Auto-Lock security", id: "autolock", type: "switch" },
      { title: "Notifications", id: "NotificationsSettings", type: "button" }
    ];

    const payment = [
      { title: "Manage Payment Options", id: "Payment", type: "button" },
      { title: "Manage Gift Cards", id: "gift", type: "button" }
    ];

    const privacy = [
      { title: "User Agreement", id: "Agreement", type: "button" },
      { title: "Privacy", id: "Privacy", type: "button" },
      { title: "About", id: "About", type: "button" }
    ];

    return (
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
         <FlatList
                        ListHeaderComponent={DropdownTeams}
                      />
                      </Block>
                      <Block row middle style={styles.rows}>
                      <Input
                                                    placeholder="Concert place"
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
                                                    onChangeText={email=>this.setState({email})}
                                                  />
                      </Block>
                      <Block row middle style={styles.rows}>
                               <FlatList
                                              ListHeaderComponent={InputWithDatePickerConcert}
                                            />
                                            <FlatList
                                                 ListHeaderComponent={InputWithTimePickerConcert}
                                                                                          />
                                            </Block>
                       <Block row middle style={styles.rows}>
                                                      <FlatList
                                                                     ListHeaderComponent={InputWithDatePickerSample}
                                                                   />
                                                                   <FlatList
                                                                        ListHeaderComponent={InputWithTimePickerSample}
                                                                                                                 />
                                                                   </Block>
        <Block center style={styles.title}>
          <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
            Event information
          </Text>
        </Block>
            <Block row middle style={styles.rows}>
                                  <Input
                                                                placeholder="Number of sets"
                                                                style={styles.inputs}
                                                                iconContent={
                                                                  <Icon
                                                                    size={16}
                                                                    color="#ADB5BD"
                                                                    name="agenda-bookmark2x"
                                                                    family="NowExtra"
                                                                    style={styles.inputIcons}
                                                                  />
                                                                }
                                                                onChangeText={email=>this.setState({email})}
                                                              />
                                  </Block>
                                  <Block row middle style={styles.rows}>
                                           <FlatList
                                                          ListHeaderComponent={DropdownEventsTypes}
                                                        />
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
                                                                                                   onChangeText={email=>this.setState({email})}
                                                                                                 />
                                                                     </Block>
                                  <Block row middle style={styles.rows}>
                                           <FlatList
                                                          ListHeaderComponent={DropdownTeamsManagers}
                                                        />
                                                        </Block>
                                                        <Block row middle style={styles.rows}>
                                                                                                                             <Input
                                                                                                                                                           placeholder="Client phone"
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
                                                                                                                                                           onChangeText={email=>this.setState({email})}
                                                                                                                                                         />
                                                                                                                             </Block>
                                                        <Block center>
                                                            <Button color="primary" round style={styles.createButton} onPress={()=>{this.InsertRecord()}}>
                                                                                    <Text
                                                                                      style={{ fontFamily: 'montserrat-bold' }}
                                                                                      size={14}
                                                                                      color={nowTheme.COLORS.WHITE}
                                                                                    >
                                                                                      Save concert
                                                                                    </Text>
                                                                                  </Button>
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
    height: theme.SIZES.BASE * 3.5,
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
    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
      },
});