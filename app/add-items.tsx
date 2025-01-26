import { getItemSources, getMenuItems } from "@/api/api";
import AddItemToBillBottomSheet from "@/components/AddItemToBillBottomSheet/AddItemToBillBottomSheet";
import BottomSheetCustom from "@/components/BottomSheet/BottomSheetCustom";
import MenuItemsFlatList from "@/components/MenuItemsFlatList/MenuItemsFlatList";
import { Item, ItemGroup, ItemSourceWithGroups } from "@/types/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const darkColors = {
  primary: "#8E44AD",
  secondary: "#2980B9",
  background: "#2C3E50",
  buttonText: "#ECF0F1",
  border: "#34495E",
};

export default function AddItemsToBill() {
  const sheetRef = useRef<BottomSheet>(null);
  const [itemSourceWithGroups, setItemSourceWithGroups] = useState<
    ItemSourceWithGroups[]
  >([]);

  const [selectedItemSource, setSelectedItemSource] =
    useState<ItemSourceWithGroups | null>(null);

  const [selectedItemGroup, setSelectedItemGroup] = useState<ItemGroup | null>(
    null
  );

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSelectItemSource = (itemSource: ItemSourceWithGroups) => {
    setSelectedItemSource(itemSource);
    console.log(itemSource.groups[0]);
    setSelectedItemGroup(itemSource.groups[0]); // Select the first group
  };

  const handleSelectItemGroup = (itemGroup: ItemGroup) => {
    setSelectedItemGroup(itemGroup);
    fetchItems(itemGroup.itemGroup);
  };

  const fetchItems = async (group: string) => {
    const fetchedItems = await getMenuItems(group);
    setItems(fetchedItems);
  };

  const handleItemPress = (item: Item) => {
    // set active item
    setSelectedItem(item);
    setIsBottomSheetOpen(true);

    // open bottom sheet
  };

  const handleOpenSheet = () => {
    sheetRef.current?.expand();
  };

  useEffect(() => {
    if (isBottomSheetOpen) {
      handleOpenSheet();
    }
  }, [isBottomSheetOpen]);

  useEffect(() => {
    if (selectedItemGroup) {
      fetchItems(selectedItemGroup.itemGroup);
    }
  }, [selectedItemGroup]);

  useEffect(() => {
    const fetchItemSources = async () => {
      try {
        const itemSourcesWithGroups = await getItemSources(1001);
        setItemSourceWithGroups(itemSourcesWithGroups);
        setSelectedItemSource(itemSourcesWithGroups[0] || null);
        setSelectedItemGroup(itemSourcesWithGroups[0]?.groups[0] || null);
        if (itemSourcesWithGroups[0]?.groups[0]) {
          fetchItems(itemSourcesWithGroups[0].groups[0].itemGroup);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemSources();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        console.log("left");
        setIsBottomSheetOpen(false);
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <SafeAreaView
      className="bg-gray-900 h-full"
      edges={["left", "right", "bottom"]}
    >
      <GestureHandlerRootView>
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
                    "bg-secondary-flow": selectedItemGroup?.id === item.id,
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
              <View className="bg-primary bg-opacity-20 rounded-full px-3 py-1">
                <Text className="text-buttonText text-xs font-semibold">
                  {selectedItemGroup?.itemGroup}
                </Text>
              </View>
              <View className="bg-secondary-flow bg-opacity-80 rounded-full px-3 py-1">
                <Text className="text-buttonText text-xs font-semibold">
                  {selectedItemSource?.itemSource}
                </Text>
              </View>
            </View>
          </View>
          <MenuItemsFlatList items={items} handleItemPress={handleItemPress} />
        </View>

        <AddItemToBillBottomSheet
          handleClose={() => {
            setIsBottomSheetOpen(false);
          }}
          sheetRef={sheetRef}
          item={selectedItem}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
