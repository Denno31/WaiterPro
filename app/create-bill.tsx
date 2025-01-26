import { createBill, getTables } from "@/api/api";
import Button from "@/components/Button";
import { AuthContext } from "@/context/Auth";
import { Table } from "@/types/types";
import { AntDesign } from "@expo/vector-icons";
import classNames from "classnames";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateBill() {
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [billData, setBillData] = useState<any>({
    salePoint: "Grand Oasis",
    tableNo: "",
    waiterName: user?.name,
  });
  const [loading, setLoading] = useState(false);

  const handleClickTable = (table: Table) => {
    setBillData({ ...billData, tableNo: table.name });
    setSelectedTable(table.id);
  };

  const handleSelectOption = (option: string) => {
    if (option === "Take Away") {
      setBillData({ ...billData, tableNo: "TAKE AWAY" });
    }
    setSelectedTable(null);
    setSelectedOption(option);
  };

  const handleProceed = async () => {
    setLoading(true);
    if (selectedOption === "Take Away") {
      const res = await createBill(billData);
      console.log(res);
      Alert.alert("Proceeding", "You selected Take Away.");
      // Navigate to item selection screen
    } else if (selectedTable) {
      const res = await createBill(billData);
      console.log(res);
      Alert.alert(
        "Proceeding",
        `You selected ${tables.find((t) => t.id === selectedTable)?.name}.`
      );
      // Navigate to item selection screen
    } else {
      Alert.alert("Error", "Please select a table or choose Take Away.");
    }
    setLoading(false);
  };
  useEffect(() => {
    const getTablesData = async () => {
      const result = await getTables();
      setTables(result);
    };
    getTablesData();
  }, []);

  const renderTable = ({ item }: { item: Table }) => (
    <TouchableOpacity
      onPress={() => handleClickTable(item)}
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
          handlePress={() => handleSelectOption("Take Away")}
          text="Take Away"
          buttonClasses={classNames("bg-primary mb-4", {
            "bg-secondary-flow": selectedOption === "Take Away",
            "bg-gray-800": selectedOption !== "Take Away",
          })}
          textClasses="text-white"
        />
        {/* use button Component */}
        <Button
          handlePress={() => handleSelectOption("Dine In")}
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
        loading={loading}
      />

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
