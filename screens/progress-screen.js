import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';

const ProgressScreen = (props) => {
  const reduxWaterGoal = useSelector(state => state.water.waterGoal)
  const dailyProgress = useSelector(state => state.water.waterProgress)

  const [currentProgress, updateGoal] = useState()

  const progressCalculator = (current, goal) => {
    const progressCalculation = current / goal * 100;
    return Math.floor(progressCalculation)
  }

  useEffect(() => {
    updateGoal(progressCalculator(dailyProgress, reduxWaterGoal))
  })

  return (
    <View style={styles.container}>
      <Text>
        Progress.....
      </Text>
      <View style={styles.progressBar}>
      <Text style={{alignContent: 'flex-start', color: 'blue', backgroundColor: 'blue', width: `50%`}}></Text>
      <Text>{currentProgress}%</Text>
      </View>
    </View>
  );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 8,
    },
    progressBar: {
      height: 20,
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 5
    },
    customFill: {
      alignContent: 'flex-start',
      color: 'blue',
      backgroundColor: 'blue',
      width: '30%',
    }
  });
    
export default ProgressScreen;