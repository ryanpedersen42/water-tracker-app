import React, { useState } from 'react';
import { Text, StyleSheet, View, Picker } from 'react-native';

const AddScreen = (props) => {
  const [quantitySelected, changeQuantity] = useState('8')
  return (
    <View style={styles.screen}>
      <Text>Add Drink Screen</Text>
      <Picker
        selectedValue={quantitySelected}
        style={styles.pickerStyles}
        onValueChange={(itemValue, itemIndex) =>
          changeQuantity(itemValue)
        }>
        <Picker.Item label="8oz" value="8" />
        <Picker.Item label="12oz" value="12" />
        <Picker.Item label="16oz" value="16" />
        <Picker.Item label="20oz" value="20" />
        <Picker.Item label="24oz" value="24" />
        <Picker.Item label="32oz" value="32" />
      </Picker>
      </View>
  )
}

AddScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Water Tracker'
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerStyles: {
    height: 50,
    width: 100,
  }
})

export default AddScreen;