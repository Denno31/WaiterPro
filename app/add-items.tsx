import { getItemSources } from "@/api/api";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

// Dark theme colors
const darkColors = {
  primary: "#8E44AD", // Purple accent for highlighted elements
  secondary: "#2980B9", // Blue accent for selected categories
  background: "#2C3E50", // Dark background color
  buttonText: "#ECF0F1", // Light gray for button text
  border: "#34495E", // Slightly lighter border color
  buttonHover: "#9B59B6", // Lighter purple for button hover
};

type ItemGroup = {
  itemGroup: string;
  id: number;
};

type ItemSourceWithGroups = {
  itemSource: string;
  id: number;
  groups: ItemGroup[];
};

export default function AddItemsToBill() {
  const [itemSourceWithGroups, setItemSourceWithGroups] = useState<
    ItemSourceWithGroups[]
  >([]);

  const [selectedItemSource, setSelectedItemSource] =
    useState<ItemSourceWithGroups | null>(itemSourceWithGroups[0]);

  const handleSelectItemSource = (itemSource: ItemSourceWithGroups) => {
    setSelectedItemSource(itemSource);
  };

  useEffect(() => {
    const fetchItemSources = async () => {
      try {
        const itemSourcesWithGroups = await getItemSources(1001);
        setItemSourceWithGroups(
          itemSourcesWithGroups
            .concat(itemSourceWithGroups)
            .concat(itemSourceWithGroups)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemSources();
  }, []);

  return (
    <SafeAreaView
      className="bg-gray-900 h-full"
      edges={["left", "right", "bottom"]}
    >
      <FlatList
        data={[1]}
        renderItem={({ item }) => <Text className="text-white">Item</Text>}
        ListHeaderComponent={() => {
          return (
            <View className="p-4">
              <View>
                <Text className="text-white text-lg font-semibold">
                  Select Item Source
                </Text>
              </View>
              {/* flat list with itemsources */}
              <FlatList
                horizontal
                data={itemSourceWithGroups}
                renderItem={({ item }) => (
                  <TouchableOpacity className="px-2 py-4 rounded-lg shadow-md mb-4 bg-gray-800 border border-background mt-6 mr-2">
                    <Text className="text-xs font-semibold text-buttonText">
                      {item.itemSource}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              {/* flat list with item groups */}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
