import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const CustomTextButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 0.5,
    borderColor: Colors.accentColorBlue,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    // width: '60%',
    alignItems: 'center',
    margin: 0,
    paddingLeft: "20%",
    paddingRight: "20%",
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
})

export default CustomTextButton;