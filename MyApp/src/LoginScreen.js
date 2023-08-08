import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigation();

  const handleLogin = async () => {
    fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
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
              navigator.navigate("Home");
            })
            .catch((error) => {
              console.error("Error storing user data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your Username"
        placeholderTextColor="black"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Enter your password"
        placeholderTextColor="black"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigator.navigate("Signup")}
        style={[styles.button, styles.signup]}
      >
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
