import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Slider, Button, ThemeProvider } from 'react-native-elements';

import CustomButton from '../components/custom-button';
import ProgressTracker from '../components/progress-tracker'
import { updateDailyConsumption } from '../store/water-actions';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const theme = {
  Button: {
    titleStyle: {
      color: Colors.accentColorBlue,
      fontFamily: 'inconsolata-regular',
    },
  },
};

const AddScreen = (props) => {
  const [quantitySelected, changeQuantity] = useState(8)
  const [cupsSelected, updateCups] = useState(1)

  const dispatch = useDispatch()
  
  const addWaterProgress = async () => {
    const ouncesSelected = (quantitySelected * cupsSelected)
    await dispatch(updateDailyConsumption(+ouncesSelected))
    await updateCups(1)
  }

  const updateMultiplier = async (direction) => {
    if (direction === 'more') {
      await updateCups(cupsSelected + 1)
    }
    if (direction === 'less') {
      await updateCups(cupsSelected - 1)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pickerSection}>
      <Text style={styles.title}>Glass Size?</Text>
        <View style={styles.sliderStyle}>
        <Slider
          value={quantitySelected}
          minimumValue={6}
          maximumValue={40}
          step={2}
          thumbTintColor={Colors.accentColorBlue}
          onValueChange={value => changeQuantity(value)}
        />
        <Text style={styles.sliderText}>{quantitySelected}oz</Text>
        </View>
        </View>
        <View style={styles.quantitySection}>
          <Text style={styles.title}>How Many?</Text>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={() =>{updateMultiplier('less')}}>
              <Ionicons name="ios-remove-circle-outline" size={50} color={Colors.accentColorBlue} />
            </CustomButton>
            <Text style={styles.quantityText}>{cupsSelected}</Text>
            <CustomButton onPress={() =>{updateMultiplier('more')}}>
              <Ionicons name="ios-add-circle-outline" size={50} color={Colors.accentColorBlue} />
            </CustomButton>
          </View>
        </View>
        <View style={styles.submitContainer}>
          <ThemeProvider theme={theme}>
            <Button 
              title='Add to Log' 
              type='clear'
              containerStyle={styles.button} 
              onPress={addWaterProgress} />
          </ThemeProvider>
        </View>
      <ProgressTracker />
        {/* <Text style={styles.sliderText}>{currentProgress}%</Text> */}
      </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 10,
  },
  title:  {
    fontFamily: 'inconsolata-regular',
    fontSize: 20,
    color: Colors.accentColorOrange,
  },
  pickerSection: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantitySection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'inconsolata-regular',
    fontSize: 50,
    color: 'white',
  },
  sliderStyle: {
    width: '70%',
    height: 132,
    margin: 15,
    maxWidth: '60%'
  },
  sliderText: {
    fontFamily: 'inconsolata-regular',
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%'
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '40%'
  }
})

export default AddScreen;