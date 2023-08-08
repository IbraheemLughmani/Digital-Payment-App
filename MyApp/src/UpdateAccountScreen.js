import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UpdateAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Account</Text>
      {/* Add your update account content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default UpdateAccountScreen;
