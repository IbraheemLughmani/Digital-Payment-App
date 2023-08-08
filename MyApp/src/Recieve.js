import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecieveScreen = () => {
  const [user, setUser] = useState(null); // State to store the user data
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveUserData();
  }, []);

  useEffect(() => {
    if (user && user.user && user.user[4]) {
      setImageUrl(`data:image/png;base64,${user.user[4]}`);
    }
  }, [user]);

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

  function handleGoBack() {
    setRecieve(false);
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.buttonText, { fontSize: 20, textAlign: "center", marginBottom: 20, marginTop: 25 }]}>
        Recieve Amount
      </Text>
      <View style={styles.inputContainer}></View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={[
            styles.buttonText,
            {
              fontSize: 18,
              fontStyle: "normal",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            },
          ]}
        >
          Scan QR
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 250, height: 250 }}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke"
  },
  button: {
    backgroundColor: "skyblue",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "skyblue",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
});

export default RecieveScreen;
