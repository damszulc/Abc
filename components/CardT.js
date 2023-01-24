import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import { nowTheme } from '../constants';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Moment from 'moment';

class CardT extends React.Component {
  async addToCalendar(title, startDateUTC, endUTC, place, description) {
    const eventConfig = {
        title: title,
        startDate: startDateUTC,
        endDate: endUTC,
        location: place,
        notes: description
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then((eventInfo:{calendarItemIdentifier:string,eventIdentifier:string})=>{
        console.log(JSON.stringify(eventInfo));
    })
    .catch((error:string)=>{
       console.warn(error);
    });
  }

  async showAlert(item_id) {
      Alert.alert('Uwaga', 'Czy na pewno chcesz usunąć ten montaż?', [
                {
                  text: 'Anuluj',
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => this.removeItem(item_id)},
              ]);
  }

  async removeItem(item_id) {
    const { navigation } = this.props;
     var APIURL = "http://anseba.nazwa.pl/app/remove_technique.php";

     var headers = {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
           };

       var Data ={
               ItemId: item_id
               }

        fetch(APIURL,{
             method: 'POST',
             headers: headers,
             body: JSON.stringify(Data)
           })
           .then((Response)=>Response.json())
           .then((Response)=>{
           console.log(Response);
             if (Response[0].Message == "Success") {
               navigation.replace("Technique");
               navigation.navigate("Audio Visual Support");
             }
           })
           .catch((error)=>{
             console.error("ERROR FOUND" + error);
           })
  }

  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    let button_remove = (item.userType=='admin' ? <Button style={styles.removeButton} textStyle={{ fontSize: 12, fontWeight: '400' }} onPress={() => this.showAlert(item.technique_id)}>Usuń montaż</Button> : null);
    let button_edit = ((item.userType=='admin' || item.userType=='tour_manager') ? <Button style={styles.editButton} textStyle={{ fontSize: 12, fontWeight: '400' }} onPress={() => navigation.navigate('Add Technique', {itemId: item.technique_id})}>Edytuj montaż</Button> : null);
    let button_add = (item.showAddButton==1) ? <Button style={styles.articleButton} textStyle={{ fontSize: 12, fontWeight: '400' }} onPress={() => this.addToCalendar(item.team_name, Moment(item.assembly_full_date_start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), Moment(item.assembly_full_date_end).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), item.place, item.event_details)}>Dodaj do kalendarza</Button> : null;

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Showtech', {itemId: item.technique_id})}>
                  <Block flex style={imgContainer}>
                    <Image resizeMode="cover" source={{ uri: item.background }} style={imageStyles} />
                  </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Showtech', {itemId: item.technique_id})}>
                  <Block flex space="between" style={styles.cardDescription}>
                    <Block flex>
                      <Text style={{ fontFamily: 'montserrat-regular' }}
                                     size={14}
                                     style={titleStyles}
                                     color={nowTheme.COLORS.SECONDARY}
                                   >{(item.support_name!='')?item.support_name+"\n":""}{item.assembly_date}{"\n"}{item.place}</Text></Block>
                     {button_remove}
                     {button_edit}
                     {button_add}
                  </Block>
                </TouchableWithoutFeedback>
      </Block>
    );
  }
}

CardT.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4
  },
  cardTitle: {
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 5,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 170,
    width: 'auto'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '90%',
    height: 25,
  },
  removeButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '90%',
    height: 25,
    backgroundColor: 'red',
    marginBottom: 0
  },
  editButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '90%',
    height: 25,
    backgroundColor: '#2973B8',
    marginBottom: 0
  }
});

export default function(props) {
  const navigation = useNavigation();
  const item = props.item;
  const horizontal = props.horizontal;
  const full = props.full;
  const style = props.style;
  const ctaColor = props.ctaColor;
  const imageStyle = props.imageStyle;
  const ctaRight = props.ctaRight;
  const titleStyle = props.titleStyle;

  return <CardT props={props} navigation={navigation} item={item} horizontal={horizontal} full={full} style={style} ctaColor={ctaColor} imageStyle={imageStyle} ctaRight={ctaRight} titleStyle={titleStyle} />;
}