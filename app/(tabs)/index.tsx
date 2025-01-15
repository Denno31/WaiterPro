import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample quick stats and navigation buttons
const quickStats = {
  activeBills: 5,
  totalSalesToday: 150.75,
  pendingOrders: 3,
};

const menuItems = [
  { id: 1, name: "Add Items to Bill", navigateTo: "AddItemsToBill" },
  { id: 2, name: "View Bills", navigateTo: "BillsPage" },
  { id: 3, name: "Create New Order", navigateTo: "CreateOrder" },
  { id: 4, name: "Reports", navigateTo: "ReportsPage" },
];

export default function HomePage({ navigation }: any) {
  const renderMenuItem = ({
    item,
  }: {
    item: { name: string; navigateTo: string };
  }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.navigateTo)}
      className="p-4 bg-blue-500 rounded-lg shadow-md mb-4"
    >
      <Text className="text-lg font-semibold text-white text-center">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      {/* Welcome message */}
      <Text className="text-2xl font-bold text-center mb-6">
        Welcome to the Dashboard
      </Text>

      {/* Quick Stats */}
      <View className="mb-6 flex-row justify-between">
        <View className="bg-white p-4 rounded-lg shadow-md w-1/3">
          <Text className="text-xl font-semibold text-center">
            Active Bills
          </Text>
          <Text className="text-2xl font-bold text-center text-blue-500">
            {quickStats.activeBills}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-md w-1/3">
          <Text className="text-xl font-semibold text-center">Sales Today</Text>
          <Text className="text-2xl font-bold text-center text-green-500">
            ${quickStats.totalSalesToday.toFixed(2)}
          </Text>
        </View>
        <View className="bg-white p-4 rounded-lg shadow-md w-1/3">
          <Text className="text-xl font-semibold text-center">
            Pending Orders
          </Text>
          <Text className="text-2xl font-bold text-center text-red-500">
            {quickStats.pendingOrders}
          </Text>
        </View>
      </View>

      {/* Menu items for navigation */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
