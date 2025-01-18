import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "x"];

export default function Login() {
  const [pin, setPin] = useState("");

  const handlePress = (value: number | string) => {
    if (value === "x") {
      setPin(pin.slice(0, -1));
      return;
    }
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-800 justify-center items-center">
      {/* Outer Container */}
      <View className="bg-gray-700 rounded-lg p-6 w-11/12 max-w-md shadow-lg">
        {/* PIN Prompt */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold text-center">
            Enter your PIN
          </Text>
        </View>

        {/* PIN Display */}
        <View className="mb-8">
          <Text className="text-white text-2xl text-center tracking-widest">
            {pin
              .padEnd(4, "_")
              .replace(/./g, (char, idx) => (idx < pin.length ? "*" : char))}
          </Text>
        </View>
        <FlatList
          numColumns={3}
          data={btns}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              className="p-8 bg-gray-900 rounded-lg m-1 "
            >
              {typeof item === "number" ? (
                <Text className="text-white text-lg font-semibold text-center">
                  {item}
                </Text>
              ) : (
                <Text className="text-white text-lg font-semibold text-center">
                  <MaterialIcons
                    size={12}
                    name={`${
                      item === "" ? "center-focus-strong" : "backspace"
                    }`}
                    color="white"
                  />
                </Text>
              )}
            </TouchableOpacity>
          )}
          columnWrapperStyle={{
            justifyContent: "center",
            flex: 1,
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
