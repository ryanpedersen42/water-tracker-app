import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Alert, Button } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';

import CustomButton from '../components/custom-button';
import { Ionicons } from '@expo/vector-icons';
import { updateWaterGoal } from '../store/water-actions';

const GoalScreen = (props) => {
  const [waterGoal, updateGoal] = useState();
  const reduxWaterGoal = useSelector(state => state.water.waterGoal)

  const dispatch = useDispatch()

  useEffect(() => {
    updateGoal(calculateCupsFromOunces(reduxWaterGoal))
  }, []);

  const adjustWaterHandler = async (direction) => {
    if (direction === 'more') {
      await updateGoal(waterGoal + 1)
    }
    if (direction === 'lower') {
      if (waterGoal <= 8) {
          Alert.alert("Cant have less than that!", 'You will wither away...', [
            { text: 'alright!' }
          ]);
          return;
      }
      await updateGoal(waterGoal - 1)
    }
    await dispatch(updateWaterGoal(waterGoal))
  }

  const calculateCupsFromOunces = (number) => {
    const updatedNumber = number / 8;
    return updatedNumber;
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.goalPrompt}>How many 8oz glasses of water would you like to drink each day?</Text>
      <View style={styles.buttonContainer}>
      <CustomButton onPress={() => adjustWaterHandler('lower')}>
         <Ionicons name="ios-remove-circle-outline" size={50} color='black' />
      </CustomButton>
      <Text style={styles.goalNumber}>{waterGoal}</Text>
      <CustomButton onPress={() => adjustWaterHandler('more')}>
         <Ionicons name="ios-add-circle-outline" size={50} color='black' />
      </CustomButton>
      </View>
      <Button title='Save' onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%'
  },
  goalNumber: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  goalPrompt: {
    margin: 10,
    textAlign: 'center'
  }
})

export default GoalScreen;