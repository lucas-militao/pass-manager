import React, { useState } from 'react';

import {
  Container,
  LoginData,
  Password,
  Title,
  Email,
  ButtonsContainer,
  ShowPasswordButton,
  DeleteLoginDataItemButton,
  Icon,
} from './styles';

interface LoginDataItemProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface Props {
  data: LoginDataItemProps;
  deleteItem: (id: string) => void;
}

export function LoginDataItem({
  data,
  deleteItem
}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container>
      {passIsVisible
        ? <Password>{data.password}</Password>
        : (
          <LoginData>
            <Title>{data.title}</Title>
            <Email>{data.email}</Email>
          </LoginData>
        )
      }

      <ButtonsContainer>
        <ShowPasswordButton 
          onPress={handleTogglePassIsVisible}
        >
          <Icon name={passIsVisible ? "eye-off" : "eye"} />
        </ShowPasswordButton >

        <DeleteLoginDataItemButton
          onPress={() => deleteItem(data.id)}
        >
          <Icon name="trash"/>
        </DeleteLoginDataItemButton>
      </ButtonsContainer>

    </Container>
  );
}