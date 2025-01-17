import { Bill } from "@/types/types";

const baseUrl = "http://192.168.68.109:3000";

export const fetchBills = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/bills`);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

export const getMenuItems = async (itemGroup: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/items/${itemGroup}`);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

export const createBill = async (bill: Bill) => {
  try {
    const response = await fetch(`${baseUrl}/api/bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bill),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getItemSources = async (salePointId: number) => {
  try {
    const response = await fetch(`${baseUrl}/api/item_sources/${salePointId}`);
    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    console.error(error);
  }
};
