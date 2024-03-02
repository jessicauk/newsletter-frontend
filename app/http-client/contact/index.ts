import { MESSAGE_ERROR, API_CONTACT } from "../../utils/const";

const API_URL = process?.env.NEXT_PUBLIC_API_URL ?? "";
export async function createContact(data: { email: string; name: string }) {
  try {
    const response = await fetch(`${API_URL}/api/${API_CONTACT}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(MESSAGE_ERROR);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getAllContacts() {
  try {
    const response = await fetch(`${API_URL}/api/${API_CONTACT}`);
    if (!response.ok) {
      throw new Error(MESSAGE_ERROR);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error();
  }
}
