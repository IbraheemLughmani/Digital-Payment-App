import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils";
export default function Send() {
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    qrCodeData = data.replace(/'/g, '"');
    const parsedData = JSON.parse(qrCodeData);
    setData(parsedData);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
        setScanned(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {!scanned || !data ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <TransactionScreen data={data} />
      )}
    </View>
  );
}

function TransactionScreen({ data }) {
  const [amount, setAmount] = useState();
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

  const handleTransaction = async () => {
    const reponseData = {
      sender: user.user[0],
      username: data.username,
      amount: amount,
    };
    // Make the API call to the endpoint and send the data
    await fetch(`${URL}/send_points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reponseData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleAmountChange = (text) => {
    setAmount(text);
  };
  console.log(data);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.accountName,
          {
            textAlign: "center",
            color: "skyblue",
            fontSize: 20,
          },
        ]}
      >
        Receiver's Data
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: "skyblue",
          }}
        >
          Username
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: "black",
          }}
        >
          {data.username}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="black"
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity onPress={handleTransaction} style={styles.button}>
        <Text style={styles.buttonText}>Send Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 10,
    backgroundColor: "whitesmoke",
  },
  input: {
    width: "75%",
    padding: 15,
    color: "black",
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 12, // Set border radius to make it round
    marginBottom: 16,
    backgroundColor: "whitesmoke", // Set the input background color to white
    justifyContent: "center",
    marginLeft: 45,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 20,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 180,
    marginLeft: 130,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

