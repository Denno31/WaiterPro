import { Bill } from "@/types/types";

const baseUrl = "http://192.168.68.104:3000";

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

export const login = async (password: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const error = await response.json(); // Extract error details if provided
      console.log("in login", error);
      throw new Error(
        `Error ${response.status}: ${error.message || "Unauthorized"}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};
