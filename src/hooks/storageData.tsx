import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode } from "react";
import { useContext } from "react";

interface StorageDataProviderProps {
  children: ReactNode;
}

interface IStorageContextData {
  getData(): void;
  setData(newData: DataProps): void;
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
    return data ? JSON.parse(data) : [];
  }

  async function setData(newData: DataProps) {
    const currentData = await getData();
    const dataFormatted = [
      ...currentData,
      newData
    ];

    await AsyncStorage.setItem(passManagerKey, JSON.stringify(dataFormatted));
  }
  

  return (
    <StorageDataContext.Provider value={{
      getData,
      setData
    }}>
      {children}
    </StorageDataContext.Provider>
  );
}

export { StorageDataProvider, useStorageData }