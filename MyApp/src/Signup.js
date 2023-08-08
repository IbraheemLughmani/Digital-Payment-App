import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";
import { URL } from "../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { URL } from "../App";
const SignUpScreen = () => {
  const navigator = useNavigation()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSignUp = () => {
    // Perform field validations
    if (!validateUsername() || !validateEmail() || !validatePassword() || !validateConfirmPassword()) {
      return; // Exit if any validation fails
    }

    // Create a user object with the entered data
    const user = {
      username: username,
      email: email,
      password: password,
    };

    // Send a POST request to your Flask API
    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the API
        console.log(data)
        if (data.success ===false ){
          setError(data.message)
        }else{
          navigator.navigate('Login')
        }
        
        // Optionally, perform any UI updates or navigate to another screen
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  const validateUsername = () => {
    // Perform username validation logic
    if (username.trim().length === 0) {
      setError("Username is required");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    // Perform email validation logic
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    // Perform password validation logic
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    // Perform confirm password validation logic
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Username"
        placeholderTextColor={'black'}
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={'black'}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'black'}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={'black'}
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

// const style1 = StyleSheet.create({
  // btn: {
    // backgroundColor: "#651FFF",
  // },
// });
