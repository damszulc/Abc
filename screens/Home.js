import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Card, Button } from "../components";
const { width } = Dimensions.get("screen");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getConcerts() {
    try {
      const response = await fetch('http://anseba.nazwa.pl/app/get_concerts.php');
      const json = await response.json();
      this.setState({ data: json.articles });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getConcerts();
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
                <Card item={item} horizontal />
            )}
          />
        )}
      </View>
    );
  }
};