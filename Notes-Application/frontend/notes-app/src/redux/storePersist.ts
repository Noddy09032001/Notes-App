import { clearLocalStorage } from "@/lib/BrowserUtils";

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e: any) {
    console.error(e.message);
    return false;
  }
  return true;
}

export const localStorageHealthCheck = async () => {
  for (var i = 0; i < localStorage.length; ++i) {
    try {
      const key = localStorage.key(i);
      if (key !== null) {
        const result = window.localStorage.getItem(key);
        if (!isJsonString(result)) {
          window.localStorage.removeItem(key);
        }
        if (result && Object.keys(key).length === 0) {
          window.localStorage.removeItem(key);
        }
      }
    } catch (error) {
      clearLocalStorage();
      // Handle the exception here
      console.error("window.localStorage Exception occurred:", error);
      // You can choose to ignore certain exceptions or take other appropriate actions
    }
  }
};

export const storePersist = {
  set: (key: any, state: any) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  },
  get: (key: any) => {
    const result = window.localStorage.getItem(key);
    if (!result) {
      return false;
    } else {
      if (!isJsonString(result)) {
        window.localStorage.removeItem(key);
        return false;
      } else return JSON.parse(result);
    }
  },
  remove: (key: any) => {
    window.localStorage.removeItem(key);
  },
  getAll: () => {
    return window.localStorage;
  },
  clear: () => {
    clearLocalStorage();
  },
};

export default storePersist;
