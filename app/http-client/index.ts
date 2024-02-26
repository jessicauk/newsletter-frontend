import { API_RECIPIENT } from "../utils/const";
const API_URL = process?.env.NEXT_PUBLIC_API_URL ?? "";

export async function getAllRecipients() {
  try {
    const response = await fetch(`${API_URL}${API_RECIPIENT}`);
    if (!response.ok) {
      throw new Error("Request not working");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
