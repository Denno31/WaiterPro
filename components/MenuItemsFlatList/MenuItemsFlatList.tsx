import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Item } from "@/types/types";

interface Props {
  items: Item[];
  handleItemPress: (item: Item) => void;
}

const MenuItemsFlatList = ({ items, handleItemPress }: Props) => {
  return (
    <FlatList
      data={items}
      numColumns={2} // Grid with 2 columns
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          className="flex-1 m-2 p-4 bg-gray-800 rounded-xl shadow-lg items-center"
        >
          <MaterialCommunityIcons
            name="glass-cocktail"
            size={36}
            color="#E2E2D5"
          />
          <Text
            className="text-buttonText text-sm font-semibold mt-2"
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text className="text-gray-500 text-xs">KES: {item.price}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default MenuItemsFlatList;
