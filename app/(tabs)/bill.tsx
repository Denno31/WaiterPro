import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-vector-icons/FontAwesome";

interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl?: string; // Optional image for item
}

interface Bill {
  id: number;
  items: Item[];
  total: number;
}

const sampleBill: Bill = {
  id: 12345,
  items: [
    { id: 1, name: "Mojito", price: 10 },
    { id: 2, name: "Pina Colada", price: 12 },
    { id: 3, name: "Caesar Salad", price: 8 },
  ],
  total: 30,
};

export default function BillPage() {
  const handlePrintBill = () => {
    // Logic to print the bill (you would typically use a printing library here)
    Alert.alert("Printing", "The bill is being printed...");
  };

  const handleSendOrder = () => {
    // Logic to send the order (you might want to trigger an API request here)
    Alert.alert("Order Sent", "The order has been sent.");
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View className="flex-row justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md">
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text className="text-lg font-semibold">${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-center mb-6">
        Bill No. {sampleBill.id}
      </Text>

      {/* List of items in the bill */}
      <FlatList
        data={sampleBill.items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        className="mb-6"
      />

      {/* Total */}
      <View className="p-4 bg-white rounded-lg shadow-md mb-6">
        <Text className="text-xl font-semibold text-right">
          Total: ${sampleBill.total.toFixed(2)}
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={handlePrintBill}
          className="flex-1 p-4 mr-2 rounded-lg bg-blue-500"
        >
          <Text className="text-lg font-bold text-center text-white">
            Print Bill
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSendOrder}
          className="flex-1 p-4 ml-2 rounded-lg bg-green-500"
        >
          <Text className="text-lg font-bold text-center text-white">
            Send Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
