import { getItemSources } from "@/api/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const darkColors = {
  primary: "#8E44AD",
  secondary: "#2980B9",
  background: "#2C3E50",
  buttonText: "#ECF0F1",
  border: "#34495E",
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

type Item = {
  id: number;
  name: string;
};

export default function AddItemsToBill() {
  const [itemSourceWithGroups, setItemSourceWithGroups] = useState<
    ItemSourceWithGroups[]
  >([]);

  const [selectedItemSource, setSelectedItemSource] =
    useState<ItemSourceWithGroups | null>(null);

  const [selectedItemGroup, setSelectedItemGroup] = useState<ItemGroup | null>(
    null
  );

  const [items, setItems] = useState<Item[]>([]);

  const handleSelectItemSource = (itemSource: ItemSourceWithGroups) => {
    setSelectedItemSource(itemSource);
    setSelectedItemGroup(null); // Reset selected group when source changes
  };

  const handleSelectItemGroup = (itemGroup: ItemGroup) => {
    setSelectedItemGroup(itemGroup);
    fetchItems(itemGroup.id); // Fetch items for the selected group
  };

  const fetchItems = (groupId: number) => {
    // Simulate fetching items for the selected group
    const fetchedItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
      id: groupId * 100 + i,
      name: `Item ${i + 1} (Group ${groupId})`,
    }));
    setItems(fetchedItems);
  };

  useEffect(() => {
    const fetchItemSources = async () => {
      try {
        const itemSourcesWithGroups = await getItemSources(1001);
        setItemSourceWithGroups(itemSourcesWithGroups);
        setSelectedItemSource(itemSourcesWithGroups[0] || null);
        setSelectedItemGroup(itemSourcesWithGroups[0]?.groups[0] || null);
        if (itemSourcesWithGroups[0]?.groups[0]) {
          fetchItems(itemSourcesWithGroups[0].groups[0].id);
        }
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
      {/* Section for Item Sources */}
      <View className="p-4">
        <Text className="text-white text-lg font-semibold">
          Select Item Source
        </Text>
        <FlatList
          horizontal
          data={itemSourceWithGroups}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={classNames(
                "px-2 py-4 rounded-lg shadow-md mb-4 bg-gray-800 border border-background mt-6 mr-2",
                {
                  "bg-primary": selectedItemSource?.id === item.id,
                }
              )}
              onPress={() => handleSelectItemSource(item)}
            >
              <Text className="text-xs font-semibold text-buttonText">
                {item.itemSource}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Section for Item Groups */}
      <View className="p-4">
        <Text className="text-white text-lg font-semibold">
          Select Item Group
        </Text>
        <FlatList
          horizontal
          data={selectedItemSource?.groups || []}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectItemGroup(item)}
              className={classNames(
                "px-2 py-4 rounded-lg shadow-md mb-4 bg-gray-800 border border-background mt-6 mr-2",
                {
                  "bg-secondary": selectedItemGroup?.id === item.id,
                }
              )}
            >
              <Text className="text-xs font-semibold text-buttonText">
                {item.itemGroup}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Section for Items */}
      <View className="p-4 flex-1 bg-background">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-buttonText text-lg font-semibold">Menu</Text>
          <View className="flex-row space-x-2">
            <View className="bg-secondary-flow rounded-full px-3 py-1">
              <Text className="text-buttonText text-xs font-semibold">
                Source: Active Source
              </Text>
            </View>
            <View className="bg-primary rounded-full px-3 py-1">
              <Text className="text-buttonText text-xs font-semibold">
                Group: Active Group
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={[
            { id: 1, name: "Jajemelo" },
            { id: 2, name: "Githeri" },
            { id: 3, name: "Chapati" },
            { id: 4, name: "Ugali sukuma" },
            { id: 5, name: "Fish medium" },
            { id: 6, name: "Fish Large" },
            { id: 7, name: "Item 7" },
            { id: 8, name: "Item 8" },
            { id: 9, name: "Item 9" },
            { id: 10, name: "Item 10" },
            { id: 11, name: "Item 11" },
          ]}
          numColumns={2} // Grid with 2 columns
          renderItem={({ item }) => (
            <View className="flex-1 m-2 p-4 bg-gray-800 rounded-xl shadow-lg items-center">
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={36}
                color="#E2E2D5"
              />
              <Text className="text-buttonText text-sm font-semibold mt-2">
                {item.name}
              </Text>
              <Text className="text-gray-500 text-xs">ID: {item.id}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
