import React, { useState } from 'react';
import { Text, StyleSheet, View, Picker } from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/custom-button';

const AddScreen = (props) => {
  const [language, changeLanguage] = useState('8')
  return (
    <View style={styles.screen}>
      <Text>Add Drink Screen</Text>
      <Picker
        selectedValue={language}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
          changeLanguage(itemValue)
        }>
        <Picker.Item label="8oz" value="8" />
        <Picker.Item label="12oz" value="12" />
        <Picker.Item label="16oz" value="16" />
        <Picker.Item label="20oz" value="20" />
        <Picker.Item label="24oz" value="24" />
        <Picker.Item label="32oz" value="32" />
      </Picker>
        <Text>{language}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default AddScreen;