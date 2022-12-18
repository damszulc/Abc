import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Card, Button, Input, Icon } from "../components";
const { width } = Dimensions.get("screen");
import { Block, NavBar, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage'
import nowTheme from '../constants/Theme';

export default class Concerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };

     AsyncStorage.getItem('logged_user_id').then((value) => {
        this.setState({user_id: value});
        this.getConcerts('');
     });
  }

  async getConcerts(searchPhrase) {
    try {
    var Data = { userId: this.state.user_id, searchPhrase: searchPhrase };
      const response = await fetch('http://srv36013.seohost.com.pl/anseba/get_concerts.php', {method: 'POST', body: JSON.stringify(Data)});
      const json = await response.json();
      this.setState({ data: json.articles });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator size="large" /> : (
        <>
         <Input
                right
                color="black"
                style={styles.search}
                placeholder="Szukaj w koncertach..."
                placeholderTextColor={'#8898AA'}
                onChangeText={search=>this.setState({search})}
                iconContent={
                  <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" onPress={() => this.getConcerts(this.state.search)} />
                }
              />
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
                      return item.concert_id;
                    }}
            renderItem={({ item }) => (
                <Card item={item} horizontal />
            )}
          />
          </>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  search: {
    height: 48,
    width: width - 48,
    marginHorizontal: 0,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  }
});