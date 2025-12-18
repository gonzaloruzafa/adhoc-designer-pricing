import { v4 as uuidv4 } from "uuid";

const DEVICE_ID_KEY = "adhoc_device_id";

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
}

export function generateShareSlug(): string {
  // Genera un slug corto de 8 caracteres
  return uuidv4().slice(0, 8);
}
