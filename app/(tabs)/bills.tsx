import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { fetchBills } from "@/api/api";

interface Bill {
  billNumber: number;
  tableNo: string;
  waiterName: string;
  billDate: string;
  amount: number;
  time: string;
  salePoint: string;
}

export default function Bills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBills = async () => {
    setRefreshing(true); // Show the refreshing spinner
    try {
      const data = await fetchBills();
      setBills(data || []);
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setRefreshing(false); // Hide the refreshing spinner
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const renderItem = ({ item }: { item: Bill }) => (
    <View style={styles.billContainer}>
      <View style={styles.billInfo}>
        <Text style={styles.billNumber}>Bill #{item.billNumber}</Text>
        <Text style={styles.billDetails}>
          Table #{item.tableNo} · Waiter: {item.waiterName} · Date:{" "}
          {item.billDate} · Time: {item.time} · Sale Point: {item.salePoint}
        </Text>
      </View>
      <View style={styles.billAmount}>
        <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>View Bills</Text>
      <FlatList
        data={bills}
        renderItem={renderItem}
        keyExtractor={(item) => item.billNumber.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadBills} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginTop: 50,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
  },
  billContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  billInfo: {
    flex: 3,
    marginRight: 16,
  },
  billNumber: {
    fontSize: 16,
    fontWeight: "500",
  },
  billDetails: {
    color: "#9c6a49",
    marginTop: 4,
    fontSize: 14,
  },
  billAmount: {
    flex: 1,
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
});
