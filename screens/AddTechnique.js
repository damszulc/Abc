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
import { Block, Text, theme, Checkbox } from "galio-framework";
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
        data_events: [],
        data_supports_types: [],
        data_assembly_types: [],
        data_events_types: [],
        data_teams_managers: [],
        isLoading: true,
        event_id: 0,
        support_name: '',
        support_type_id: 0,
        assembly_type_list: [],
        assembly_date: '',
        assembly_time: '',
        duration: 0,
        place: '',
        event_details: '',
        tour_manager_id: 0,
        event_type_id: 0,
        contact_phone: '',
        user_id: 0,
        showPickerTime: false,
        showPickerDate: false
    };

    AsyncStorage.getItem('logged_user_id')
         .then((value) => {
         this.setState({user_id: value})
    });
  }
  InsertRecord=()=>{
    var EventId = this.state.event_id;
    var SupportName = this.state.support_name;
    var SupportTypeId = this.state.support_type_id;
    var AssemblyTypeList = this.state.assembly_type_list;
    var AssemblyDate = this.state.assembly_date;
    var AssemblyTime = this.state.assembly_time;
    var Duration = this.state.duration;
    var Place = this.state.place;
    var EventDetails = this.state.event_details;
    var TourManagerId = this.state.tour_manager_id;
    var EventTypeId = this.state.event_type_id;
    var ContactPhone = this.state.contact_phone;
    var UserId = this.state.user_id;

   // if (EventId.value==0 || Place.length==0 || AssemblyDate.length==0 || AssemblyTime.length==0 || EventTypeId.value==0) {
   //   alert("Required field is missing !!!");
   // }else
    {
      var APIURL = "http://srv36013.seohost.com.pl/anseba/save_technique.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        EventId: EventId,
        SupportName: SupportName,
        SupportTypeId: SupportTypeId,
        AssemblyTypeList: AssemblyTypeList.toString(),
        AssemblyDate: AssemblyDate,
        AssemblyTime: AssemblyTime,
        Duration: Duration,
        Place: Place,
        EventDetails: EventDetails,
        TourManagerId: TourManagerId,
        EventTypeId: EventTypeId,
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
      console.log(Response);
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
      this.setState({ data_events: json.events, data_teams_managers: json.teams_managers, data_supports_types: json.supports_types, data_assembly_types: json.assembly_types, data_events_types: json.technique_types});
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
    const { data_events, data_supports_types, data_assembly_types, data_events_types, data_teams_managers, isLoading } = this.state;

    const InputWithDatePickerTechnique = (props) => {
        const [date, setDate] = React.useState(new Date());
        const [showPicker, setShowPicker] = React.useState(false);

        return (
            <>
                <Button
                    style={styles.inputs_half} color='#ADB5BD'
                    onPress={() => this.setState({showPickerDate: true})}>
                    <Block row>
                        <Icon size={16}
                          color="#ADB5BD"
                          name="calendar-602x"
                          family="NowExtra"
                          style={styles.inputIcons}
                          onPress={() => this.setState({showPickerDate: true})}
                        />
                        <Text
                            style={{ color: '#ADB5BD' }}
                            size={14}
                            color={nowTheme.COLORS.WHITE}>
                            {this.state.assembly_date != '' ? this.state.assembly_date : 'Data montażu *'}
                        </Text>
                    </Block>
                </Button>
            </>
        );
    };

    const InputWithTimePickerTechnique = () => {
                const [time, setTime] = React.useState(new Date());
                const [showPicker, setShowPicker] = React.useState(false);

                return (
                    <>
                        <Button
                            style={styles.inputs_half} color='#ADB5BD'
                            onPress={() => this.setState({showPickerTime: true})}>
                            <Block row>
                                <Icon size={16}
                                  color="#ADB5BD"
                                  name="time-alarm2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                  onPress={() => this.setState({showPickerTime: true})}
                                />
                                <Text
                                    style={{ color: '#ADB5BD' }}
                                    size={14}
                                    color={nowTheme.COLORS.WHITE}>
                                    {this.state.assembly_time != '' ? this.state.assembly_time : 'Godzina montażu *'}
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
        { this.state.showPickerDate ? (
            <DateTimePicker
                testID="date-picker"
                value={new Date()}
                mode="date"
                is24Hour={true}
                onChange={(_: any, date?: Date) => this.setState({showPickerDate: false}) || this.setState({assembly_date: Moment(date).format('DD/MM/YYYY')})}
                minimumDate={new Date()}
                style={{width: '100%', backgroundColor: "white"}}
            />
            ) : null }
        { this.state.showPickerTime ? (
            <DateTimePicker
                testID="time-picker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                onChange={(_: any, time?: Date) => this.setState({showPickerTime: false}) || this.setState({assembly_time: Moment(time).format('HH:mm')})}
                timeZoneOffsetInSeconds={3600}
                style={{width: '100%', backgroundColor: "white"}}
            />
            ) : null }
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dane podstawowe
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="Nazwa zlecenia *"
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
                              selectedValue={this.state.support_type_id}
                              onValueChange={(itemValue, itemIndex) => this.setState({support_type_id: itemValue})}>
                                  <Picker.Item style={{fontSize:14}} label='Wybierz rodzaj supportu z listy *' value='0' />
                                  { data_supports_types.map((item, key)=>
                                      <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                                  )}
                          </Picker>
                      </Block>
                    </Block>
          <Block middle style={{paddingTop: 10}}>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.event_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({event_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz wydarzenie z listy *' value='0' />
                        { data_events.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
                </Picker>
            </Block>
          </Block>
          <Block middle style={{paddingTop: 20}}>
            <Text>Zamówiony support</Text>
                {data_assembly_types.map((item, key)=>
                <Block style={{ marginVertical: theme.SIZES.BASE/2, marginLeft: 15}} row width={width*0.9} key={key}>
                    <Checkbox
                        checkboxStyle={{
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: '#E3E3E3'
                        }}
                        color={nowTheme.COLORS.PRIMARY}
                        labelStyle={{
                            color: nowTheme.COLORS.HEADER,
                            fontFamily: 'montserrat-regular'
                        }}
                        key={item.value}
                        label={item.label}
                        onChange={(checked) => (checked) ?
                        this.state.assembly_type_list.push(item.value) :
                        this.state.assembly_type_list.splice(this.state.assembly_type_list.indexOf(item.value), 1)}
                    />
                  </Block>
                )}
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Miejsce montażu *"
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
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dodatkowe informacje
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Szczegóły"
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
          <Block middle style={{paddingTop: 10}}>
                      <Block style={styles.rows, styles.inputs_select}>
                          <Picker
                              selectedValue={this.state.event_type_id}
                              onValueChange={(itemValue, itemIndex) => this.setState({event_type_id: itemValue})}>
                                  <Picker.Item style={{fontSize:14}} label='Wybierz rodzaj montażu *' value='0' />
                                  { data_events_types.map((item, key)=>
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
                            Zapisz montaż
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
      createButton: {
        paddingHorizontal: 10,
        width: 230
      }
});