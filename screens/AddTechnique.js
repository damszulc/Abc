import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Block, Text, theme, Checkbox } from "galio-framework";
import { Switch, Button, Icon, Input } from "../components";

import DatePicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Picker} from '@react-native-picker/picker';

import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");

export default class AddTechnique extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
        data_teams: [],
        data_supports_types: [],
        data_assembly_types: [],
        data_events_types: [],
        data_teams_managers: [],
        isLoading: true,
        technique_id: 0,
        team_id: 0,
        support_name: '',
        support_type_id: 0,
        assembly_type_list: [],
        assembly_date: getToday(),
        assembly_time: '00:00',
        duration: 0,
        place: '',
        place_id: '',
        longitude: 0.00,
        latitude: 0.00,
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

   async getTechnique() {
     const { navigation } = this.props;
     {this.props.route.params?.itemId}
      try {
      var Data = { itemId: this.props.route.params?.itemId };
        const response = await fetch('http://anseba.nazwa.pl/app/get_technique_for_edition.php', {method: 'POST', body: JSON.stringify(Data)});
        const json = await response.json();
        const data = json.technique;
        console.log(data);
        this.setState({ technique_id: data.technique_id,
                        team_id: data.team_id,
                        support_name: data.support_name,
                        support_type_id: data.support_type_id,
                        assembly_type_list: data.assembly_types.split(','),
                        assembly_date: data.assembly_date,
                        assembly_time: data.assembly_time,
                        duration: data.duration,
                        place: data.place,
                        place_id: data.place_id,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        event_details: data.event_details,
                        tour_manager_id: data.tour_manager_id,
                        event_type_id: data.event_type_id,
                        contact_phone: data.contact_phone });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }

  InsertRecord=()=>{
    const { navigation } = this.props;

    var TechniqueId = this.state.technique_id;
    var TeamId = this.state.team_id;
    var SupportName = this.state.support_name;
    var SupportTypeId = this.state.support_type_id;
    var AssemblyTypeList = this.state.assembly_type_list;
    var AssemblyDate = this.state.assembly_date;
    var AssemblyTime = this.state.assembly_time;
    var Duration = this.state.duration;
    var Place = this.state.place;
    var PlaceId = this.state.place_id;
    var Longitude = this.state.longitude;
    var Latitude = this.state.latitude;
    var EventDetails = this.state.event_details;
    var TourManagerId = this.state.tour_manager_id;
    var EventTypeId = this.state.event_type_id;
    var ContactPhone = this.state.contact_phone;
    var UserId = this.state.user_id;

      var APIURL = "http://anseba.nazwa.pl/app/save_technique.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        TechniqueId: TechniqueId,
        TeamId: TeamId,
        SupportName: SupportName,
        SupportTypeId: SupportTypeId,
        AssemblyTypeList: AssemblyTypeList.toString(),
        AssemblyDate: AssemblyDate,
        AssemblyTime: AssemblyTime,
        Duration: Duration,
        Place: Place,
        PlaceId: PlaceId,
        Longitude: Longitude,
        Latitude: Latitude,
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
          this.setState({technique_id: 0, team_id: 0, support_name: '', support_type_id: 0, assembly_type_list: [], assembly_date: getToday(),
                        assembly_time: '00:00', duration: 0, place: '', place_id: '', longitude: 0.00, latitude: 0.00, event_details: '',
                        tour_manager_id: 0, event_type_id: 0, contact_phone: ''});
          navigation.replace("Technika");
          navigation.navigate("Audio Visual Support");
        }
      })
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })

  }

  async getDictionaries() {
    try {
      const response = await fetch('http://anseba.nazwa.pl/app/get_dictionaries.php');
      const json = await response.json();
      this.setState({ data_teams: json.teams, data_teams_managers: json.teams_managers, data_supports_types: json.supports_types, data_assembly_types: json.assembly_types, data_events_types: json.technique_types});
    } catch (error) {
      console.log(error);
    } finally {
      //this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getDictionaries();
    this.getTechnique();
  }

  state = {};

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  render() {
    const { data_teams, data_supports_types, data_assembly_types, data_events_types, data_teams_managers, isLoading } = this.state;

     const changeDate = (ev) => {
     this.state.assembly_date = ev;
     }

     const changeTime = (ev) => {
        this.state.assembly_time = ev;
     }

     const currentDate = () => {
             if(this.state.assembly_date!='' && this.state.assembly_date!='0000/00/00' && this.state.assembly_date!='1970/01/01') {
                 return this.state.assembly_date+" "+this.state.assembly_time;
             }
             else return getToday();
         }

     const checkAssemblyValue = (value) => {
        let ret = false;
           { this.state.assembly_type_list.map((item, key)=>
                {if(item === value) ret = true;}
           )}
        return ret;
     }

    return isLoading ? <ActivityIndicator size="large" /> : (
      <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.settings}
              keyboardShouldPersistTaps='always'
              listViewDisplayed={false}
            >
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dane podstawowe
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="Nazwa zlecenia"
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
                          value={this.state.support_name}
                          onChangeText={support_name=>this.setState({support_name})}
                      />
          </Block>
          <Block middle>
                      <Block style={styles.rows, styles.inputs_select}>
                          <Picker
                              selectedValue={this.state.support_type_id}
                              onValueChange={(itemValue, itemIndex) => this.setState({support_type_id: itemValue})}>
                                  <Picker.Item style={{fontSize:14}} label='Wybierz rodzaj supportu z listy' value='0' />
                                  { data_supports_types.map((item, key)=>
                                      <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                                  )}
                          </Picker>
                      </Block>
                    </Block>
          <Block middle style={{paddingTop: 10}}>
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
                        initialValue={checkAssemblyValue(item.value)}
                        key={item.value}
                        label={item.label}
                        onChange={(checked) => (checked) ?
                        this.state.assembly_type_list.push(item.value) :
                        this.state.assembly_type_list.splice(this.state.assembly_type_list.indexOf(item.value), 1)}
                    />
                  </Block>
                )}
          </Block>
          <Block row middle style={styles.rows_place}>
          <SafeAreaView style={{flex: 1}}>
                       <GooglePlacesAutocomplete
                                                          placeholder='Miejsce montażu'
                                                          GooglePlacesDetailsQuery={{ fields: "geometry" }}
                                                          fetchDetails={true}
                                                          textInputProps={{
                                                                          value: (this.state.place!='') ? this.state.place : this.value
                                                          }}
                                                          styles={{textInput: {
                                                                               backgroundColor: '#ffffff',
                                                                               height: 44,
                                                                               borderRadius: 21.5,
                                                                               paddingVertical: 5,
                                                                               paddingHorizontal: 25,
                                                                               fontSize: 14,
                                                                               flex: 1,
                                                                               borderColor: '#E3E3E3',
                                                                               borderWidth: 1,
                                                                               width: '100%'
                                                                             }}}
                                                          onPress={(data: any, details: any = null) => {
                                                                                                            this.setState({place: data.description});
                                                                                                            this.setState({place_id: data.place_id});
                                                                                                            this.setState({longitude: details?.geometry?.location.lng});
                                                                                                            this.setState({latitude: details?.geometry?.location.lat});
                                                                                                          }}
                                                          query={{
                                                            key: 'AIzaSyAWnOCMVKbWVyrf1qDKaGKRdP7y58ClvqA',
                                                            language: 'pl'
                                                          }}
                                                          renderRightButton={() => (
                                                          						<TouchableOpacity
                                                          							style={styles.clearButton}
                                                          							onPress={() => {
                                                          								this.setState({place: ''});
                                                          							}}
                                                          						>
                                                          							<Icon
                                                                                                            size={16}
                                                                                                            color="#ADB5BD"
                                                                                                            name="simple-remove2x"
                                                                                                            family="NowExtra"
                                                                                                            style={styles.removeIcons}
                                                                                                        />
                                                          						</TouchableOpacity>
                                                          					)}
                                                        />
                                                        </SafeAreaView>
          </Block>
          <Block row middle style={styles.only_label}>
                         <Text
                          style={{ color: '#000000' }}
                          size={14}>Data i godzina montażu</Text>
                     </Block>
                     <Block row middle style={styles.calendar}>
                         <DatePicker
                            selected={currentDate()}
                            current={currentDate()}
                            onDateChange={changeDate}
                            onTimeChange={changeTime}
                            minimumDate={getToday()}
                         />
                    </Block>

          <Block row middle style={styles.rows}>
            <Input
                placeholder="Czas trwania w minutach"
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
          <Block row middle style={styles.rows_textarea}>
            <TextInput
                placeholder="Szczegóły"
                multiline = {true}
                numberOfLines = {4}
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
                        <Picker.Item style={{fontSize:14}} label='Wybierz tour managera z listy' value='0' />
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
                                  <Picker.Item style={{fontSize:14}} label='Wybierz rodzaj montażu' value='0' />
                                  { data_events_types.map((item, key)=>
                                      <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                                  )}
                          </Picker>
                      </Block>
                    </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="Telefon kontaktowy"
                          style={styles.inputs}
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
          <Block row middle style={styles.rows, {paddingTop: 10, paddingBottom: 200}}>
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
          </KeyboardAvoidingView>
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
  rows_place: {
      paddingHorizontal: theme.SIZES.BASE * 1.3,
    paddingTop: theme.SIZES.BASE,
    },
  rows_big: {
      height: theme.SIZES.BASE * 10,
      paddingHorizontal: theme.SIZES.BASE
    },
      only_label: {
        paddingTop: theme.SIZES.BASE
      },
      calendar: {
        paddingHorizontal: theme.SIZES.BASE * 1.5,
        paddingTop: theme.SIZES.BASE
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
              width: width-40,
              height: theme.SIZES.BASE * 10,
              backgroundColor: '#ffffff',
              paddingHorizontal: theme.SIZES.BASE,
              paddingVertical: theme.SIZES.BASE,
            },
        rows_textarea: {
            height: theme.SIZES.BASE * 10,
            paddingHorizontal: theme.SIZES.BAS2,
            marginTop: 7,
            marginBottom: 7
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
      },
      clearButton: {
        backgroundColor: '#cccccc',
        borderRadius: 20,
        width: 26,
        height: 26,
        marginLeft: -35,
        marginTop: 8,
      },
      removeIcons: {
              color: nowTheme.COLORS.ICON_INPUT,
              marginLeft: 5,
              marginTop: 5,
            }
});