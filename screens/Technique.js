import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { events, nowTheme } from '../constants/';
import { Card } from '../components/';

class Technique extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
      <Text size={16} style={styles.title}>
        Cards
      </Text>
        <Card item={events[0]} horizontal />
        <Card item={events[1]} horizontal />
        <Card item={events[2]} horizontal />
        <Card item={events[3]} horizontal />
        <Card item={events[4]} horizontal />
      </Block>
    );
  };

  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default Technique;
