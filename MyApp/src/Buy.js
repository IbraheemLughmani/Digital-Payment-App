import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { URL } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BuyPointsScreen = () => {
  const [amount, setAmount] = useState("");
  const [points, setPoints] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    retrieveUserData(); // Retrieve user data when the component mounts
  }, []);

  const retrieveUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handleBuyPoints = async () => {
    try {
      const apiUrl = `${URL}/buy_points`;
      const payload = {
        username: user.user[0],
        amount: parseFloat(amount * 2), // Convert amount to a float
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        // const data = await response.json();
        // console.log(response)
        // const boughtPoints = parseFloat(data.points); // Assuming the server responds with the bought points
        setPoints(amount * 2);
        console.log("Points updated successfully.");
      } else {
        console.log("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.log("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Points</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        placeholderTextColor={'black'}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleBuyPoints}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
      {points !== "" && (
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>You Bought {points} Points</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "whitesmoke",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 60,
    color: "skyblue"
  },
  input: {
    width: "90%",
    height: 55,
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 12,
    color: 'black',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  button: {
    backgroundColor: "skyblue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 140
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  pointsContainer: {
    marginTop: 20,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "skyblue",
  },
});

export default BuyPointsScreen;
