import React, { useState } from 'react';
import { Text, StyleSheet, View, Picker, Button, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../components/custom-button';
import { updateDailyConsumption } from '../store/water-actions';
import { Ionicons } from '@expo/vector-icons';

const AddScreen = (props) => {
  const [quantitySelected, changeQuantity] = useState(8)
  const currentWaterProgress = useSelector(state => state.water.waterProgress)
  const testNumber = useSelector(state => state.water.waterGoal)

  const dispatch = useDispatch()

  const addWaterProgress = async () => {
    await dispatch(updateDailyConsumption(+quantitySelected))
  }

  // const addWaterProgress = async (direction) => {
  //   if (direction === 'more') {
  //     await updateGoal(waterGoal + 8)
  //   }
  //   if (direction === 'lower') {
  //     if (waterGoal <= 8) {
  //         Alert.alert("Cant have less than that!", 'You will wither away...', [
  //           { text: 'alright!' }
  //         ]);
  //         return;
  //     }
  //     await updateGoal(waterGoal - 8)
  //   }
  //   await dispatch(updateDailyConsumption(+quantitySelected))
  // }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Glass Size?</Text>
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
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() =>{addWaterProgress('lower')}}>
          <Ionicons name="ios-remove-circle-outline" size={50} color='black' />
        </CustomButton>
        <CustomButton onPress={() =>{addWaterProgress('more')}}>
          <Ionicons name="ios-add-circle-outline" size={50} color='black' />
        </CustomButton>
      </View>
        <Button title='Save' onPress={addWaterProgress} />
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
  title:  {
    fontSize: 20,
    // fontWeight: 'bold'
  },
  pickerStyles: {
    height: 50,
    width: 125,
    maxWidth: '60%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%'
  },
})

export default AddScreen;