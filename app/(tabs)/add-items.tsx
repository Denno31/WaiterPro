import React, { useState } from "react";
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

// Dark theme colors
const darkColors = {
  primary: "#8E44AD", // Purple accent for highlighted elements
  secondary: "#2980B9", // Blue accent for selected categories
  background: "#2C3E50", // Dark background color
  buttonText: "#ECF0F1", // Light gray for button text
  border: "#34495E", // Slightly lighter border color
  buttonHover: "#9B59B6", // Lighter purple for button hover
};

interface Category {
  id: number;
  name: string;
  items: Item[];
}

interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl?: string; // Optional image for item
  quantity: number; // Add quantity field to item
}

interface ItemSource {
  id: number;
  name: string;
  categories: Category[];
}

const itemSources: ItemSource[] = [
  {
    id: 1,
    name: "Bar",
    categories: [
      {
        id: 1,
        name: "Cocktails",
        items: [
          { id: 1, name: "Mojito", price: 10, quantity: 1 },
          { id: 2, name: "Pina Colada", price: 12, quantity: 1 },
        ],
      },
      {
        id: 2,
        name: "Beers",
        items: [
          { id: 3, name: "Beer", price: 5, quantity: 1 },
          { id: 4, name: "IPA", price: 7, quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Restaurant",
    categories: [
      {
        id: 1,
        name: "Appetizers",
        items: [
          { id: 1, name: "Caesar Salad", price: 8, quantity: 1 },
          { id: 2, name: "Garlic Bread", price: 5, quantity: 1 },
        ],
      },
      {
        id: 2,
        name: "Main Course",
        items: [
          { id: 3, name: "Grilled Chicken", price: 15, quantity: 1 },
          { id: 4, name: "Steak", price: 18, quantity: 1 },
        ],
      },
    ],
  },
];

export default function AddItemsToBill() {
  const [selectedSource, setSelectedSource] = useState<ItemSource | null>(
    itemSources[0]
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    selectedSource?.categories[0]
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(
    selectedSource?.categories[0].items[0]
  );

  const handleItemSelect = (item: Item) => {
    setSelectedItem(item);
  };

  const incrementQuantity = () => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity + 1,
      });
    }
  };

  const decrementQuantity = () => {
    if (selectedItem && selectedItem.quantity > 1) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      });
    }
  };

  const handleProceed = () => {
    if (!selectedItem) {
      Alert.alert("Error", "Please select an item.");
    } else {
      Alert.alert(
        "Proceeding",
        `You selected ${selectedItem.name} with quantity: ${selectedItem.quantity}.`
      );
      // Proceed to adding the selected item to the bill
    }
  };

  const renderSource = ({ item }: { item: ItemSource }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedSource(item);
        setSelectedCategory(item.categories[0]);
        setSelectedItem(item.categories[0].items[0]);
      }}
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor:
          selectedSource?.id === item.id
            ? darkColors.primary
            : darkColors.background,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: darkColors.border,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          color: darkColors.buttonText,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor:
          selectedCategory?.id === item.id
            ? darkColors.secondary
            : darkColors.background,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: darkColors.border,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          color: darkColors.buttonText,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      onPress={() => handleItemSelect(item)}
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor:
          selectedItem?.id === item.id
            ? darkColors.primary
            : darkColors.background,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: darkColors.border,
      }}
    >
      <View style={{ backgroundColor: "white", padding: 16, borderRadius: 8 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            color: "#2C3E50",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#7F8C8D",
            color: darkColors.buttonText,
          }}
        >
          ${item.price.toFixed(2)}
        </Text>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: 100, height: 100, marginTop: 8 }}
          />
        )}
        {/* Quantity Selector */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            onPress={decrementQuantity}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: darkColors.primary,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, marginHorizontal: 16 }}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={incrementQuantity}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: darkColors.primary,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: darkColors.background, padding: 16 }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 24,
          color: darkColors.buttonText,
        }}
      >
        Add Items to Bill
      </Text>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Item Source Filter */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
              color: darkColors.buttonText,
            }}
          >
            Select Item Source
          </Text>
          <FlatList
            horizontal
            data={itemSources}
            renderItem={renderSource}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 24 }}
          />
        </View>

        {/* Category Filter */}
        {selectedSource && (
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
                color: darkColors.buttonText,
              }}
            >
              Select Category
            </Text>
            <FlatList
              horizontal
              data={selectedSource.categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 24 }}
            />
          </View>
        )}

        {/* Item List for the selected Category */}
        {selectedCategory && (
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
                color: darkColors.buttonText,
              }}
            >
              Select Item
            </Text>
            <FlatList
              data={selectedCategory.items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={{ marginBottom: 24 }}
            />
          </View>
        )}
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        onPress={handleProceed}
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: darkColors.primary,
          marginTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Add to Bill
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
