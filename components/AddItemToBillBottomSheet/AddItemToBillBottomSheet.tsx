import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BottomSheetCustom from "../BottomSheet/BottomSheetCustom";
import BottomSheet from "@gorhom/bottom-sheet";
import { Item } from "@/types/types";

interface Props {
  sheetRef: React.RefObject<BottomSheet>;
  handleClose: () => void;
  item: Item | null;
}

const AddItemToBillBottomSheet = ({
  handleClose,
  sheetRef,

  item,
}: Props) => {
  return (
    <BottomSheetCustom sheetRef={sheetRef} handleClose={handleClose}>
      <View className="p-4">
        <View className="mb-4">
          {/* Item Name */}
          <Text className="text-lg font-semibold">{item?.name}</Text>
        </View>
        <View className="items-center mb-4">
          <Text className="text-lg font-semibold">Add Item</Text>
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <Text>Price:</Text>
          <Text>KES:{item?.price}</Text>
        </View>
        <View className="flex-row items-center justify-center mb-6 space-x-4">
          <TouchableOpacity className="bg-gray-700 p-3 rounded-lg">
            <Text className="text-lg font-bold text-white">-</Text>
          </TouchableOpacity>
          <Text className="text-base font-semibold">1</Text>
          <TouchableOpacity className="bg-gray-700 p-3 rounded-lg">
            <Text className="text-lg font-bold text-white">+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="bg-purple-600 py-3 rounded-lg">
          <Text className="text-center text-white font-bold text-sm">
            Add to Bill
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetCustom>
  );
};

export default AddItemToBillBottomSheet;
