import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const navItems = [
  {
    title: "Create Bill",
    route: "/create-bill",
  },
  {
    title: "View Bills",
    route: "/view-bills",
  },
  {
    title: "Settings",
    route: "/settings",
  },
  {
    title: "Logout",
    route: "/logout",
  },
];

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Welcome to WaiterPro</Text>
      </View>
      <View style={{ width: "100%", marginTop: 20, gap: 10 }}>
        {navItems.map((item) => (
          <View style={{ width: "100%" }} key={item.title}>
            <TouchableOpacity style={styles.button}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgb(229 231 235)",
    width: "100%",
    padding: 8,
  },
});
