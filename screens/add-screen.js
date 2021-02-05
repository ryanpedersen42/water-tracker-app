import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from "react-redux";
import { Slider, Button } from "react-native-elements";
import moment from "moment";

import CustomButton from "../components/custom-button";
import CustomTextButton from '../components/custom-text-button';
import ProgressTracker from "../components/progress-tracker";
import {
  updateDailyConsumption,
  setNewGoal,
  resetDailyConsumption,
  setAppReady,
} from "../store/water-actions";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const AddScreen = () => {
  const [quantitySelected, changeQuantity] = useState(12);
  const [cupsSelected, updateCups] = useState(1);
  const dailyProgress = useSelector((state) => state.water.waterProgress);
  const isAppReady = useSelector((state) => state.water.isAppReady);

  const dispatch = useDispatch();

  useEffect(() => {
    checkDate();
    getWaterGoal();
    getWaterProgress();
    dispatch(setAppReady());
  }, []);

  const addWaterProgress = async () => {
    const ouncesSelected = +(quantitySelected * cupsSelected);
    const updatedDailyConsumption = dailyProgress + ouncesSelected;
    if (ouncesSelected < 0 && dailyProgress < Math.abs(ouncesSelected)) {
      await dispatch(resetDailyConsumption());
    } else {
      await dispatch(updateDailyConsumption(updatedDailyConsumption));
    }
    await updateCups(1);
  };

  const updateMultiplier = async (direction) => {
    if (direction === "more") {
      await updateCups(cupsSelected + 1);
    }
    if (direction === "less") {
      await updateCups(cupsSelected - 1);
    }
  };

  const checkDate = async () => {
    // AsyncStorage.clear()
    let storedDate = await getStoredDate();
    let currentDateString = await moment().format("ll");

    if (storedDate) {
      if (moment(currentDateString).isAfter(storedDate)) {
        try {
          await AsyncStorage.setItem("storedDate", currentDateString);
          await dispatch(resetDailyConsumption());
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        await AsyncStorage.setItem("storedDate", currentDateString);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getWaterGoal = async () => {
    try {
      let reduxGoal;
      const waterGoal = await AsyncStorage.getItem("waterGoal");
      const currentGoal = JSON.parse(waterGoal);

      if (currentGoal) {
        reduxGoal = currentGoal;
        dispatch(setNewGoal(reduxGoal));
      } else {
        reduxGoal = 8;
        dispatch(setNewGoal(reduxGoal));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getWaterProgress = async () => {
    try {
      let reduxProgress;
      const waterProgress = await AsyncStorage.getItem("waterProgress");
      const currentProgress = JSON.parse(waterProgress);

      if (currentProgress) {
        reduxProgress = currentProgress;
        dispatch(updateDailyConsumption(reduxProgress));
      } else {
        dispatch(resetDailyConsumption());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getStoredDate = async () => {
    const storedDate = await AsyncStorage.getItem("storedDate");

    if (!storedDate) {
      const newDate = await moment().format("ll");
      AsyncStorage.setItem("storedDate", JSON.stringify(newDate));
    } else {
      return storedDate;
    }
  };

  if (!isAppReady) {
    <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.pickerSection}>
        <Text style={styles.title}>Cup Size?</Text>
        <View style={styles.sliderStyle}>
          <Slider
            value={quantitySelected}
            minimumValue={6}
            maximumValue={40}
            step={2}
            thumbTintColor={Colors.accentColorBlue}
            onValueChange={(value) => changeQuantity(value)}
          />
          <Text style={styles.sliderText}>{quantitySelected}oz</Text>
        </View>
      </View>
      <View style={styles.quantitySection}>
        <Text style={styles.title}>How Many?</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={() => {
              updateMultiplier("less");
            }}
          >
            <Ionicons
              name="ios-remove-circle-outline"
              size={50}
              color={Colors.accentColorBlue}
            />
          </CustomButton>
          <Text style={styles.quantityText}>{cupsSelected}</Text>
          <CustomButton
            onPress={() => {
              updateMultiplier("more");
            }}
          >
            <Ionicons
              name="ios-add-circle-outline"
              size={50}
              color={Colors.accentColorBlue}
            />
          </CustomButton>
        </View>
      </View>
      <View style={Platform.OS === "android" ? styles.androidFocusButtons : ""}>
        <View>
          <Button
            title="Add to Log"
            style={styles.focusButton}
            color={Colors.accentColorBlue}
            onPress={addWaterProgress}
          />

        </View>
        <View>
        <Button
          title="Reset Log"
          style={styles.focusButton}
          color={Colors.accentColorBlue}
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => dispatch(resetDailyConsumption())}
        />
        </View>
      </View>
      <ProgressTracker />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  androidFocusButtons: {
    margin: 0,
    paddingLeft: "20%",
    paddingRight: "20%",
    padding: "1%",
    paddingBottom: "5%",
    paddingVertical: "5%",
  },
  focusButton: {
    width: "100%",
    margin: 0,
    paddingLeft: "20%",
    paddingRight: "20%",
    color: Colors.accentColorBlue,
    padding: "1%",
    paddingBottom: "5%",
  },
  pickerSection: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  quantitySection: {
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    // fontFamily: 'inconsolata-regular',
    fontSize: 50,
    color: "white",
  },
  sliderStyle: {
    width: "70%",
    height: 132,
    margin: 15,
    maxWidth: "60%",
  },
  sliderText: {
    // fontFamily: 'inconsolata-regular',
    textAlign: "center",
    fontSize: 35,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  submitContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "40%",
  },
});

export default AddScreen;