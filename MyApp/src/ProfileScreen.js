import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import TransactionHistoryScreen from "./TransactionHistoryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // State to store the user data

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
  console.log(user);
  return (
    <ScrollView>
    <View style={styles.profileContainer}>
      {user && (
        <View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Username</Text>
            <Text style={styles.balanceAmountText}>{user.user[0]}</Text>
            <Text style={styles.balanceText}>Current Points</Text>
            <Text style={styles.balanceAmountText}>{user.user[3]}</Text>
          </View>
          <View>
          <Text style={styles.buttonText}>Transaction History</Text>
            {user.transaction_history.map((hist) => {
              return (
                <View
                style={{
                  backgroundColor: "skyblue",    
                  display: "flex",
                  // flexDirection: "row",
                  marginBottom: 10,
                  paddingVertical: 5,

                  // paddingBottom: 10,
                  // position: 'relative',
                  // marginTop: 1,
                  // marginStart: 50,
                  // marginVertical: 1,
                  // marginEnd: 50,
                  // marginRight: 50,
                  // marginTop: 2,
                  textAlign: "center",
                  justifyContent: "center",
                  }}
                >
                  <Text>{hist[1]}</Text>
                  <Text>{hist[0]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    marginBottom: 50,
  },
  headerContainer: {
    backgroundColor: "skyblue",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 60,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 50,
    marginTop: 300,
  },
  balanceContainer: {
    backgroundColor: "whitesmoke",
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 450,
    marginTop: 5,
    width: 260,
    alignItems: "center",
  },
  balanceText: {
    fontSize: 24,
    color: "skyblue",
    marginBottom: 10,
    marginTop: 10,
  },
  balanceAmountText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 5,
  },
  // buttonContainer: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // paddingHorizontal: 24,
    // marginBottom: 240,
    // marginTop: 30,
  // },
  // button: {
    // width: "48%",
    // height: 120,
    // borderRadius: 10,
    // marginBottom: 16,
    // alignItems: "center",
    // justifyContent: "center",
    // color: 'white'
  // },
  buttonText: {
    fontSize: 20,
    color: "skyblue",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    marginTop: -400,
  },
  // receiveButton: {
    // backgroundColor: "#651FFF",
  // },
  // sendButton: {
    // backgroundColor: "#651FFF",
  // },
  // buyButton: {
    // backgroundColor: "#651FFF",
  // },
  // earnButton: {
    // backgroundColor: "#651FFF",
  // },
  // iconContainer: {
    // position: "absolute",
    // top: 20,
    // right: 20,
    // zIndex: 1,
  // },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    height: 1000,
    // marginBottom: 250,
    // marginTop: 0,
  },
});

export default ProfileScreen;
