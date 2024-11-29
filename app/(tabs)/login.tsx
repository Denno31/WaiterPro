import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
export default function Login() {
    const [pin, setPin] = React.useState("");
    const handlePress = (value: number) => {
      if (pin.length < 4) {
        setPin(pin + value);
      }
    };
    return (
      <View style={{ flex: 1, padding: 16, width: "100%",alignItems:"center",justifyContent:"center" }}>
        <GestureHandlerRootView  style={styles.container}>
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Enter your PIN
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: "center", fontSize: 24 }}>
              {pin.length === 0 ? "____" : pin.length === 1 ? "*" : ""}
              {pin.length === 2 ? "**" : ""}
              {pin.length === 3 ? "***" : ""}
              {pin.length === 4 ? "****" : ""}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            {btns.map((value) =>
              value !== 0 ? (
                <View style={styles.buttonWrapper} key={value}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePress(value)}
                  >
                    <Text>{value}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.fullWidthButtonWrapper} key={value}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePress(value)}
                  >
                    <Text>{value}</Text>
                  </TouchableOpacity>
                </View>
              )
            )}
            <View style={styles.fullWidthButtonWrapper}>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "black" }}
              >
                <Text style={{ color: "#fff" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GestureHandlerRootView>
      </View>
    );
  }
  
  // styles
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      elevation: 5,
      borderRadius: 10,
      padding: 16,
     
    },
    button: {
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "rgb(229 231 235)",
      width: "100%",
      height: 60,
    },
    buttonWrapper: {
      width: "30%",
    },
    buttonContainer: {
      flexDirection: "row", // Arrange buttons in a row
      flexWrap: "wrap", // Allow wrapping to a new row when space is not enough
      padding: 16,
      justifyContent: "space-between",
      gap: 12
    },
    fullWidthButtonWrapper: {
      width: "100%", // Full width for the 0 button
    },
  });
  