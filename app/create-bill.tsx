import Button from "@/components/Button";
import classNames from "classnames";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Table {
  id: number;
  name: string;
}

const tables: Table[] = [
  { id: 1, name: "Table 1" },
  { id: 2, name: "Table 2" },
  { id: 3, name: "Table 3" },
  { id: 4, name: "Table 4" },
];

export default function CreateBill() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleProceed = () => {
    if (selectedOption === "Take Away") {
      Alert.alert("Proceeding", "You selected Take Away.");
      // Navigate to item selection screen
    } else if (selectedTable) {
      Alert.alert(
        "Proceeding",
        `You selected ${tables.find((t) => t.id === selectedTable)?.name}.`
      );
      // Navigate to item selection screen
    } else {
      Alert.alert("Error", "Please select a table or choose Take Away.");
    }
  };

  const renderTable = ({ item }: { item: Table }) => (
    <TouchableOpacity
      onPress={() => setSelectedTable(item.id)}
      className={`p-4 rounded-lg mb-4 ${
        selectedTable === item.id ? "bg-secondary-200" : "bg-gray-800"
      }`}
    >
      <Text className="text-lg font-semibold text-center text-white">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900 p-4">
      <Text className="text-2xl font-bold text-center text-white mb-6">
        Create a New Bill
      </Text>
      <View className="mb-6">
        <Button
          handlePress={() => setSelectedOption("Take Away")}
          text="Take Away"
          buttonClasses={classNames("bg-primary mb-4", {
            "bg-secondary-flow": selectedOption === "Take Away",
            "bg-gray-800": selectedOption !== "Take Away",
          })}
          textClasses="text-white"
        />
        {/* use button Component */}
        <Button
          handlePress={() => setSelectedOption("Dine In")}
          buttonClasses={classNames("bg-primary mb-4", {
            "bg-secondary-flow": selectedOption === "Dine In",
            "bg-gray-800": selectedOption !== "Dine In",
          })}
          text="Dine In"
          textClasses="text-lg font-semibold text-center text-white"
        />
      </View>

      {selectedOption === "Dine In" && (
        <FlatList
          data={tables}
          renderItem={renderTable}
          keyExtractor={(item) => item.id.toString()}
          className="mb-6"
        />
      )}

      <Button
        text="Proceed"
        handlePress={handleProceed}
        buttonClasses="bg-primary"
        textClasses="text-lg font-bold text-center text-white"
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
