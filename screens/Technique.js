import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, ActivityIndicator, FlatList, Text, View } from 'react-native';
import { CardT, Button, Input, Icon } from "../components";
const { width } = Dimensions.get("screen");
import { Block, NavBar, theme } from 'galio-framework';
import AsyncStorage from '@react-native-async-storage/async-storage'
import nowTheme from '../constants/Theme';

export default class Technique extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };

     AsyncStorage.getItem('logged_user_id').then((value) => {
        this.setState({user_id: value});
        this.getTechnique('');
     });
  }

  async getTechnique(searchPhrase) {
    try {
    console.log(this.state.user_id);
    var Data = { userId: this.state.user_id, searchPhrase: searchPhrase };
      const response = await fetch('http://srv36013.seohost.com.pl/anseba/get_technique.php', {method: 'POST', body: JSON.stringify(Data)});
      const json = await response.json();
      this.setState({ data: json.technique });
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
                placeholder="Szukaj w montażu audio-wizualnym..."
                placeholderTextColor={'#8898AA'}
                onChangeText={search=>this.setState({search})}
                iconContent={
                  <Icon size={16} color={theme.COLORS.MUTED} name="zoom-bold2x" family="NowExtra" onPress={() => this.getTechnique(this.state.search)} />
                }
              />
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
                      return item.technique_id;
                    }}
            renderItem={({ item }) => (
                <CardT item={item} horizontal />
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