import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode } from "react";
import { useContext } from "react";

interface StorageDataProviderProps {
  children: ReactNode;
}

interface IStorageContextData {
  getData: () => Promise<string>;
  setData: (newData: DataProps) => void;
  updateData: (newData: DataProps[]) => void;
  removeData: () => void;
}

interface DataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

const StorageDataContext = createContext({} as IStorageContextData);

function useStorageData() {
  const context = useContext(StorageDataContext);

  return context;
}

function StorageDataProvider({ children }: StorageDataProviderProps) {

  const passManagerKey = '@passmanager:logins';

  async function getData() {
    const data = await AsyncStorage.getItem(passManagerKey);
    return data ? data : '';
  }

  async function setData(newData: DataProps) {
    const data = await getData();
    const currentData = data ? JSON.parse(data) : [];
    const dataFormatted = [
      ...currentData,
      newData
    ];

    await AsyncStorage.setItem(passManagerKey, JSON.stringify(dataFormatted));
  }

  async function updateData(newData: DataProps[]) {
    await AsyncStorage.setItem(passManagerKey, JSON.stringify(newData));
  }

  async function removeData() {
    await AsyncStorage.removeItem(passManagerKey);
  }

  return (
    <StorageDataContext.Provider value={{
      getData,
      setData,
      removeData,
      updateData
    }}>
      {children}
    </StorageDataContext.Provider>
  );
}

export { StorageDataProvider, useStorageData }