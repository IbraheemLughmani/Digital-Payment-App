import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {/* Add your transaction history content here */}
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

export default TransactionHistoryScreen;
