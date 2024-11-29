import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function bills() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>View Bills</Text>
      <View>
        {Array.from({ length: 10 }).map((_, index) => (
          <View style={{ flexDirection: "row", gap: 12, padding: 10 }}>
            <View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                  Bill #1233
                </Text>
                <View style={{ maxWidth: "90%" }}>
                  <Text style={{ color: "#9c6a49" }}>
                    Table #2 . Waiter: Alex . Date: 10/20/2024 Time: 12:30 .
                    Sale Point: Dine In
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text>$10</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
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
});
