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

export default class AddConcert extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
        data_teams: [],
        data_events_types: [],
        data_teams_managers: [],
        isLoading: true,
        team_id: 0,
        artist_name: '',
        place: '',
        concert_date: '',
        concert_time: '',
        duration: 0,
        rehearsal_date: '',
        rehearsal_time: '',
        sets_number: 0,
        event_details: '',
        event_type_id: 0,
        tour_manager_id: 0,
        contact_phone: '',
        user_id: 0,
        showPickerTimeConcert: false,
        showPickerDateConcert: false,
        showPickerTimeRehearsal: false,
        showPickerDateRehearsal: false
    };

    AsyncStorage.getItem('logged_user_id')
         .then((value) => {
         this.setState({user_id: value})
    });
  }
  InsertRecord=()=>{
    var TeamId = this.state.team_id;
    var ArtistName = this.state.artist_name;
    var Place = this.state.place;
    var ConcertDate = this.state.concert_date;
    var ConcertTime = this.state.concert_time;
    var Duration = this.state.duration;
    var RehearsalDate = this.state.rehearsal_date;
    var RehearsalTime = this.state.rehearsal_time;
    var SetsNumber = this.state.sets_number;
    var EventDetails = this.state.event_details;
    var EventTypeId = this.state.event_type_id;
    var TourManagerId = this.state.tour_manager_id;
    var ContactPhone = this.state.contact_phone;
    var UserId = this.state.user_id;

    if ((TeamId.value==0 && ArtistName.length==0) || Place.length==0 || ConcertDate.length==0 || ConcertTime.length==0 || EventTypeId.value==0) {
      alert("Proszę wypełnić pola oznaczone gwiazdką !!!");
    }else{
      var APIURL = "http://srv36013.seohost.com.pl/anseba/save_concert.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        TeamId: TeamId,
        ArtistName: ArtistName,
        Place: Place,
        ConcertDate: ConcertDate,
        ConcertTime: ConcertTime,
        Duration: Duration,
        RehearsalDate: RehearsalDate,
        RehearsalTime: RehearsalTime,
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
          this.props.navigation.navigate("Concerts");
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

    const InputWithDatePickerConcert = (props) => {
        const [date, setDate] = React.useState(new Date());
        const [showPicker, setShowPicker] = React.useState(false);

        return (
            <>
                <Button
                    style={styles.inputs_half} color='#ADB5BD'
                    onPress={() => this.setState({showPickerDateConcert: true})}>
                    <Block row>
                        <Icon size={16}
                            color="#ADB5BD"
                            name="calendar-602x"
                            family="NowExtra"
                            style={styles.inputIcons}
                            onPress={() => this.setState({showPickerDateConcert: true})}
                        />
                        <Text
                            style={{ color: '#ADB5BD' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}>
                            {this.state.concert_date != '' ? this.state.concert_date : 'Data koncertu *'}
                        </Text>
                    </Block>
                </Button>
            </>
        );
    };

    const InputWithTimePickerConcert = () => {
                const [time, setTime] = React.useState(new Date());
                const [showPicker, setShowPicker] = React.useState(false);

                return (
                    <>
                        <Button
                            style={styles.inputs_half} color='#ADB5BD'
                            onPress={() => this.setState({showPickerTimeConcert: true})}>
                            <Block row>
                                <Icon size={16}
                                    color="#ADB5BD"
                                    name="time-alarm2x"
                                    family="NowExtra"
                                    style={styles.inputIcons}
                                    onPress={() => this.setState({showPickerTimeConcert: true})}
                                />
                                <Text
                                    style={{ color: '#ADB5BD' }}
                                    size={14}
                                    color={nowTheme.COLORS.WHITE}>
                                    {this.state.concert_time != '' ? this.state.concert_time : 'Godzina koncertu *'}
                                </Text>
                            </Block>
                        </Button>
                    </>
                );
            };

   const InputWithDatePickerRehearsal = (props) => {
           const [date, setDate] = React.useState(new Date());
           const [showPicker, setShowPicker] = React.useState(false);

           return (
               <>
                    <Button
                        style={styles.inputs_half} color='#ADB5BD'
                        onPress={() => this.setState({showPickerDateRehearsal: true})}>
                        <Block row>
                            <Icon size={16}
                                color="#ADB5BD"
                                name="calendar-602x"
                                family="NowExtra"
                                style={styles.inputIcons}
                                onPress={() => this.setState({showPickerDateRehearsal: true})}
                            />
                            <Text
                                style={{ color: '#ADB5BD' }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}>
                                {this.state.rehearsal_date != '' ? this.state.rehearsal_date : 'Data próby'}
                            </Text>
                        </Block>
                    </Button>
               </>
           );
       };

       const InputWithTimePickerRehearsal = () => {
                   const [time, setTime] = React.useState(new Date());
                   const [showPicker, setShowPicker] = React.useState(false);

                   return (
                       <>
                            <Button
                                style={styles.inputs_half} color='#ADB5BD'
                                onPress={() => this.setState({showPickerTimeRehearsal: true})}>
                                <Block row>
                                    <Icon size={16}
                                        color="#ADB5BD"
                                        name="time-alarm2x"
                                        family="NowExtra"
                                        style={styles.inputIcons}
                                        onPress={() => this.setState({showPickerTimeRehearsal: true})}
                                    />
                                    <Text
                                        style={{ color: '#ADB5BD' }}
                                        size={14}
                                        color={nowTheme.COLORS.WHITE}>
                                        {this.state.rehearsal_time != '' ? this.state.rehearsal_time : 'Godzina próby'}
                                    </Text>
                                </Block>
                            </Button>
                       </>
                   );
               };

    return isLoading ? <ActivityIndicator size="large" /> : (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
      >
             { this.state.showPickerDateConcert ? (
                <DateTimePicker
                    testID="date-concert-picker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={(_: any, date?: Date) => this.setState({showPickerDateConcert: false}) || this.setState({concert_date: Moment(date).format('DD/MM/YYYY')})}
                    minimumDate={new Date()}
                    style={{width: '100%', backgroundColor: "white"}} />
                 ) : null }

             { this.state.showPickerTimeConcert ? (
                <DateTimePicker
                    testID="time-concert-picker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    onChange={(_: any, time?: Date) => this.setState({showPickerTimeConcert: false}) || this.setState({concert_time: Moment(time).format('HH:mm')})}
                    timeZoneOffsetInSeconds={3600}
                    style={{width: '100%', backgroundColor: "white"}}
                />
                ) : null }

             { this.state.showPickerDateRehearsal ? (
                <DateTimePicker
                    testID="date-rehearsal-picker"
                    value={new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={(_: any, date?: Date) => this.setState({showPickerDateRehearsal: false}) || this.setState({rehearsal_date: Moment(date).format('DD/MM/YYYY')})}
                    minimumDate={new Date()}
                    style={{width: '100%', backgroundColor: "white"}} />
                ) : null }

             { this.state.showPickerTimeRehearsal ? (
                <DateTimePicker
                    testID="time-rehearsal-picker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    onChange={(_: any, time?: Date) => this.setState({showPickerTimeRehearsal: false}) || this.setState({rehearsal_time: Moment(time).format('HH:mm')})}
                    timeZoneOffsetInSeconds={3600}
                    style={{width: '100%', backgroundColor: "white"}}
                />
                ) : null }

          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dane podstawowe
            </Text>
          </Block>
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.team_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({team_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz zespół z listy' value='0' />
                        { data_teams.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
               </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="lub podaj nazwę wykonawcy"
                          style={styles.inputs}
                          iconContent={
                              <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="briefcase-242x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                              />
                          }
                          value={this.state.artist_name}
                          onChangeText={artist_name=>this.setState({artist_name})}
                      />
                    </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Miejsce koncertu *"
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
                ListHeaderComponent={InputWithDatePickerConcert}
                horizontal={true}
            />
            <FlatList
                keyExtractor={(item, index) => item.id + index.toString()}
                ListHeaderComponent={InputWithTimePickerConcert}
                horizontal={true}
            />
          </Block>

          <Block row middle style={styles.rows}>
            <Input
                placeholder="Czas trwania w minutach *"
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
          <Block row middle style={styles.rows}>
            <FlatList
                keyExtractor={(item, index) => item.id + index.toString()}
                ListHeaderComponent={InputWithDatePickerRehearsal}
                horizontal={true}
            />
            <FlatList
                keyExtractor={(item, index) => item.id + index.toString()}
                ListHeaderComponent={InputWithTimePickerRehearsal}
                horizontal={true}
            />
          </Block>
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dodatkowe informacje
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Liczba setów"
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
                value={this.state.sets_number}
                onChangeText={sets_number=>this.setState({sets_number})}
            />
          </Block>
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.event_type_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({event_type_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz rodzaj koncertu z listy *' value='0' />
                        { data_events_types.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
                </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Szczegóły koncertu"
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
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.tour_manager_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({tour_manager_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz tour managera z listy *' value='0' />
                        { data_teams_managers.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
                </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows}>
                                <Input
                                    placeholder="Telefon kontaktowy"
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
                            Zapisz koncert
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
          marginRight: 5,
          backgroundColor: '#ffffff'
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
});