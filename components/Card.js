import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';
import {useNavigation} from '@react-navigation/native';
import { nowTheme } from '../constants';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import Moment from 'moment';

class Card extends React.Component {
  async addToCalendar(title, startDateUTC, endUTC, place) {
    const eventConfig = {
        title: title,
        startDate: startDateUTC,
        endDate: endUTC,
        location: place
    };

    console.log(eventConfig);
    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then((eventInfo:{calendarItemIdentifier:string,eventIdentifier:string})=>{
        console.log(JSON.stringify(eventInfo));
    })
    .catch((error:string)=>{
       console.warn(error);
    });
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

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Profile', {itemId: item.concert_id})}>
          <Block flex style={imgContainer}>
            <Image resizeMode="cover" source={{ uri: item.thumbnail }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Profile', {itemId: item.concert_id})}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >{item.team_name.toUpperCase()}{"\n"}{item.concert_date}{"\n"}{item.place}</Text>
            </Block>
             <Button style={styles.articleButton} textStyle={{ fontSize: 12, fontWeight: '400' }} onPress={() => this.addToCalendar(item.team_name, Moment(item.concert_full_date_start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), Moment(item.concert_full_date_end).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'), item.place)}>Dodaj do kalendarza</Button>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
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
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 5
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
    height: 122,
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
    width: 130,
    height: 30
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

  return <Card props={props} navigation={navigation} item={item} horizontal={horizontal} full={full} style={style} ctaColor={ctaColor} imageStyle={imageStyle} ctaRight={ctaRight} titleStyle={titleStyle} />;
}