import { AuthContext } from "@/context/Auth";
import { Link } from "expo-router";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample quick stats and navigation buttons
const quickStats = {
  activeBills: 5,
  totalSalesToday: 150.75,
  pendingOrders: 3,
};

const menuItems = [
  { id: 1, name: "Add Items to Bill", navigateTo: "/add-items" },
  { id: 2, name: "View Bills", navigateTo: "BillsPage" },
  { id: 3, name: "Create New Order", navigateTo: "/create-bill" },
  { id: 4, name: "Reports", navigateTo: "ReportsPage" },
  { id: 5, name: "Login", navigateTo: "/login" },
];

export default function HomePage({ navigation }: any) {
  const { logout } = useContext(AuthContext);
  const renderMenuItem = ({
    item,
  }: {
    item: { name: string; navigateTo: string };
  }) => (
    <TouchableOpacity className="p-4 bg-blue-500 rounded-lg shadow-md mb-4">
      <Link
        href={item.navigateTo as any}
        className="text-lg font-semibold text-white text-center"
      >
        {item.name}
      </Link>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      {/* Welcome message */}
      <Text className="text-2xl font-bold text-center mb-6">
        Welcome to the Dashboard
      </Text>
      <TouchableOpacity
        onPress={logout}
        className="p-4 bg-blue-500 rounded-lg shadow-md mb-4"
      >
        <Text className="text-lg font-semibold text-white text-center">
          Logout
        </Text>
      </TouchableOpacity>
      {/* Menu items for navigation */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
