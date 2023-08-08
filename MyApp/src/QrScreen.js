import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { colors } from "../../utils";
import { LinearGradient } from "expo-linear-gradient";
import AppTextInput from "../components/AppTextInput";
import { Menu, Divider, Provider } from "react-native-paper";


export default function QrScreen() {
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // data = '{"dest_type": "Inter Bank", "destination": "humamch2"}';
    setData(JSON.parse(data.replace(/'/g, '"')));
    console.log(data);
  };
  useEffect(() => {
    (async () => {
      // handleBarCodeScanned(
      //   '{"dest_type": "Inter Bank", "destination": "humamch2"}'
      // );
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
  const [amount, setAmount] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleTransaction = () => {
    // Logic for handling the transaction
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const handleDropdownChange = (itemValue) => setSelectedType(itemValue);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.accountName,
          {
            color: colors.light,
            textAlign: "center",
          },
        ]}
      >
        Recivers Data
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
            color: colors.light,
            textAlign: "center",
          }}
        >
          username
        </Text>
        <Text
          style={{
            color: colors.light,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {data.destination}
        </Text>
        <Text
          style={{
            color: colors.light,
            textAlign: "center",
          }}
        >
          Trasaction Type
        </Text>
        <Text
          style={{
            color: colors.light,
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {data.dest_type}
        </Text>
        <AppTextInput
          placeholder="Enter Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{
            alignSelf: "center",
          }}
        />
        <View style={{ alignSelf: "center" }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Text style={{ fontSize: 16 }}>
                  {selectedType ? selectedType : "Select Transaction Type"}
                </Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => handleDropdownChange("Option 1")}
              title="Option 1"
            />
            <Divider />
            <Menu.Item
              onPress={() => handleDropdownChange("Option 2")}
              title="Option 2"
            />
            <Divider />
            <Menu.Item
              onPress={() => handleDropdownChange("Option 3")}
              title="Option 3"
            />
          </Menu>
        </View>
      </View>

      <LinearGradient
        colors={[colors.cta, colors.purple]}
        start={{ x: 0, y: 0.09 }}
        end={{ x: 1.5, y: 1.5 }}
        angle={102}
        style={{
          borderRadius: 5,
          borderRadius: 5,
          width: 90,
          height: 40,
          justifyContent: "center",
          // paddingLeft: 25,
          color: colors.light,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity onPress={handleTransaction}>
          <Text style={{ color: colors.light }}>Send</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 10,
  },

  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
