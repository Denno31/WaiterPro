import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import classNames from "classnames";
import { login } from "@/api/api";
import { AuthContext } from "@/context/Auth";
import { useRouter } from "expo-router";

const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 11];

export default function Login() {
  const router = useRouter();
  const { handleLogin, isLoggedIn } = useContext(AuthContext);
  const [pin, setPin] = useState("");

  const handlePress = async (value: number) => {
    if (value === 10) {
      console.log("Login");
      try {
        await handleLogin(pin);
        router.replace("/");
      } catch (error) {
        Alert.alert("Error", String(error));
      }

      return;
    }
    if (value === 11) {
      setPin(pin.slice(0, -1));
      return;
    }
    if (value > 9) return;
    if (pin.length < 8) {
      setPin(pin + value);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

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
              .padEnd(8, "_")
              .replace(/./g, (char, idx) => (idx < pin.length ? "*" : char))}
          </Text>
        </View>
        <FlatList
          numColumns={3}
          data={btns}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              className={classNames(
                "p-8 bg-gray-900 rounded-lg m-1 box-border",
                {
                  "bg-primary": item === 10,
                }
              )}
            >
              {item <= 9 ? (
                <Text className="text-white text-lg font-semibold text-center">
                  {item}
                </Text>
              ) : (
                <Text className="text-white text-lg font-semibold text-center box-border">
                  <MaterialIcons
                    size={12}
                    name={`${
                      item === 10 ? "center-focus-strong" : "backspace"
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
