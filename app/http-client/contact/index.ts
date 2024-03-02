import { MESSAGE_ERROR, API_CONTACT } from "../../utils/const";

const API_URL = process?.env.NEXT_RAILWAY_API_URL ?? "";
export async function createContact(data: { email: string; name: string }) {
  try {
    console.log("URL", API_URL)
    console.log("URL2", `${API_URL}${API_CONTACT}`)
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
    console.log("result", result)
    return result;
  } catch (error) {
    console.log("Error", error)
    return error;
  }
}
