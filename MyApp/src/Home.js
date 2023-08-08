import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null); // State to store the user data

  useEffect(() => {
    handlePageLoad(); // Call the function to handle page load
  }, []);

  const handlePageLoad = async () => {
    await retrieveUserData(); // Retrieve user data
    if (user) {
      await handleLogin(); // Call handleLogin if user data exists
    }
  };
  useEffect(() => {
    retrieveUserData();
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

  const handleLogin = async () => {
    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user.user[0], password: user.user[2] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          AsyncStorage.setItem(
            "user",
            JSON.stringify({
              user: data.user,
              transaction_history: data.transaction_history,
            })
          ) // Store the user data
            .then(() => {
              setUser();
              navigation.navigate("Home");
            });
        }
      });
  };

  // Example balance amount, replace with your own logic to fetch and display the current balance

  const handleReceive = () => {
    // Navigate to the Receive screen
    navigation.navigate("Recieve");
  };

  const handleSend = () => {
    // Navigate to the Send screen
    navigation.navigate("Send");
  };

  const handleBuy = () => {
    // Navigate to the Buy screen
    navigation.navigate("Buy");
  };

  const LoginScreen = () => {
    // Navigate to the Earn screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user" size={30} color={"white"} />
      </TouchableOpacity>
      <Text
        style={{
          color: "skyblue",
          fontSize: 30,
          textAlign: "center",
          // fontWeight: "Italic",
        }}
      >
        Welcome Back
      </Text>
      {user && (
        <View style={styles.balanceContainer}>
          <TouchableOpacity
            style={[styles.button, styles.sendButton]}
            onPress={handlePageLoad}
          >
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
          <Text style={styles.balanceText}>Username</Text>
          <Text style={styles.balanceAmountText}>{user.user[0]}</Text>
          <Text style={styles.balanceText}>Current Points</Text>
          <Text style={styles.balanceAmountText}>{user.user[3]}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.receiveButton]}
          onPress={handleReceive}
        >
          <Text style={styles.buttonText}>Receive Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.sendButton]}
          onPress={handleSend}
        >
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buyButton]}
          onPress={handleBuy}
        >
          <Text style={styles.buttonText}>Buy Points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.earnButton]}
          onPress={LoginScreen}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  headerContainer: {
    backgroundColor: "skyblue",
    paddingVertical: 22,
    paddingHorizontal: 17,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 25,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceContainer: {
    backgroundColor: "whitesmoke",
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 36,
    alignItems: "center",
  },
  balanceText: {
    fontSize: 25,
    color: "skyblue",
    fontWeight: "bold",
    marginBottom: 5,
  },
  balanceAmountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  button: {
    width: "46%",
    height: 60,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  receiveButton: {
    backgroundColor: "skyblue",
  },
  sendButton: {
    backgroundColor: "skyblue",
  },
  buyButton: {
    backgroundColor: "skyblue",
  },
  earnButton: {
    backgroundColor: "skyblue",
  },
  iconContainer: {
    position: "absolute",
    color: "skyblue",
    top: 35,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
