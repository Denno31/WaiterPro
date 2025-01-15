import React from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";

// Sample bill data
interface Bill {
  id: number;
  waiter: string;
  timetable: string;
  totalAmount: number;
  date: string;
}

const billsData: Bill[] = [
  {
    id: 12345,
    waiter: "John Doe",
    timetable: "12:30 PM",
    totalAmount: 30.0,
    date: "2025-01-14",
  },
  {
    id: 12346,
    waiter: "Jane Smith",
    timetable: "1:00 PM",
    totalAmount: 45.5,
    date: "2025-01-14",
  },
  {
    id: 12347,
    waiter: "Alice Johnson",
    timetable: "2:30 PM",
    totalAmount: 22.75,
    date: "2025-01-14",
  },
];

export default function BillsPage() {
  const handleBillDetails = (bill: Bill) => {
    Alert.alert(
      "Bill Details",
      `Bill No: ${bill.id}\nWaiter: ${bill.waiter}\nTimetable: ${
        bill.timetable
      }\nAmount: $${bill.totalAmount.toFixed(2)}\nDate: ${bill.date}`
    );
  };

  const renderBill = ({ item }: { item: Bill }) => (
    <TouchableOpacity
      onPress={() => handleBillDetails(item)}
      className="p-4 rounded-lg shadow-md mb-4 bg-border border border-background"
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-buttonText">
          {`Bill No: ${item.id}`}
        </Text>
        <Text className="text-lg font-semibold text-secondary">
          {`$${item.totalAmount.toFixed(2)}`}
        </Text>
      </View>
      <Text className="text-sm text-buttonText">{`Waiter: ${item.waiter}`}</Text>
      <Text className="text-sm text-buttonText">{`Timetable: ${item.timetable}`}</Text>
      <Text className="text-sm text-buttonText">{`Date: ${item.date}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-background">
      <Text className="text-2xl font-bold text-center mb-6 text-primary">
        Bills List
      </Text>

      {/* List of Bills */}
      <FlatList
        data={billsData}
        renderItem={renderBill}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
