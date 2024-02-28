import {
  API_RECIPIENT,
  API_SEND_EMAIL,
  API_UNSUBSCRIBE_RECIPIENT,
  MESSAGE_ERROR,
} from "../utils/const";

const API_URL = process?.env.NEXT_PUBLIC_API_URL ?? "";

export async function getAllRecipients() {
  try {
    const response = await fetch(`${API_URL}${API_RECIPIENT}`);
    if (!response.ok) {
      throw new Error(MESSAGE_ERROR);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function sendEmail(formData: FormData) {
  try {
    const response = await fetch(`${API_URL}${API_SEND_EMAIL}`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(MESSAGE_ERROR);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function unsubscribeRecipient(token: string) {
  try {
    const response = await fetch(`${API_URL}${API_UNSUBSCRIBE_RECIPIENT}/${token}`);
    if (!response.ok) {
      throw new Error(MESSAGE_ERROR);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecipientByToken(token: string) {
  try {
    const response = await fetch(`${API_URL}${API_RECIPIENT}/token/${token}`);
    if (!response.ok) {
      throw new Error(MESSAGE_ERROR);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createRecipient(data: string) {
  try {
    const response = await fetch(`${API_URL}${API_RECIPIENT}`, {
      method: "POST",
      body: data,
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
