import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';
import { useStorageData } from '../../hooks/storageData';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [loginItensData, setLoginItensData] = useState<LoginListDataProps>([]);

  const { setData, getData } = useStorageData();

  async function loadData() {
    try {
      const dataStored =  await getData();
  
      if (dataStored) {
        const currentData = JSON.parse(dataStored);
        setLoginItensData(currentData);
        setSearchListData(currentData);
      }
      
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  function handleFilterLoginData(search: string) {
    if (search && loginItensData.length > 0) {
      const searchResult = loginItensData.filter(item => item.title === search);

      if (searchResult.length > 0) {
        setSearchListData(searchResult);
      }
    }
  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}