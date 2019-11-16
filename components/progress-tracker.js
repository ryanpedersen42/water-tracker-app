import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';


const ProgressTracker = (props) => {
  const reduxWaterGoal = useSelector(state => state.water.waterGoal)
  const dailyProgress = useSelector(state => state.water.waterProgress)

  const progressCalculator = (current, goal) => {
    const progressCalculation = current / goal * 100;
    return Math.floor(progressCalculation)
  }

  const progressInt = parseInt(currentProgress);

  const progressStyles = {
    alignContent: 'flex-start',
    color: 'blue',
    backgroundColor: 'blue',
    width: `${progressInt}%`
  }

  const currentProgress = progressCalculator(dailyProgress, reduxWaterGoal)

  return (
    <View>
      <Text style={styles.progressText}>{currentProgress}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  progressText: {
    fontFamily: 'inconsolata-regular',
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
  },
})

export default ProgressTracker;