// I have this here just in case i ever figure out how to merge react-native-mmkv with Expo-Go since as of 2025-22-07 it doesn't seem to have compatibility


import { Platform } from 'react-native';

let storage;

if (Platform.OS === 'web') {
  // Use localStorage on web
  storage = {
    setItem: (key, value) => {
      localStorage.setItem(key, value);
    },
    getItem: (key) => {
      return localStorage.getItem(key);
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
    clear: () => {
      localStorage.clear();
    },
    setObject: (key, obj) => {
      localStorage.setItem(key, JSON.stringify(obj));
    },
    getObject: (key) => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  };
} else {
  // Use MMKV on native
  const { MMKV } = require('react-native-mmkv');
  const mmkv = new MMKV();

  storage = {
    setItem: (key, value) => {
      mmkv.set(key, value);
    },
    getItem: (key) => {
      return mmkv.getString(key);
    },
    removeItem: (key) => {
      mmkv.delete(key);
    },
    clear: () => {
      mmkv.clearAll();
    },
    setObject: (key, obj) => {
      mmkv.set(key, JSON.stringify(obj));
    },
    getObject: (key) => {
      const item = mmkv.getString(key);
      return item ? JSON.parse(item) : null;
    }
  };
}

export default storage;
