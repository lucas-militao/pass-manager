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

interface Props {
  title: string;
  email: string;
  password: string;
}

export function LoginDataItem({
  title,
  email,
  password,
}: Props) {
  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container>
      {passIsVisible
        ? <Password>{password}</Password>
        : (
          <LoginData>
            <Title>{title}</Title>
            <Email>{email}</Email>
          </LoginData>
        )
      }

      <ButtonsContainer>
        <ShowPasswordButton 
          onPress={handleTogglePassIsVisible}
        >
          <Icon name={passIsVisible ? "eye-off" : "eye"} />
        </ShowPasswordButton >

        <DeleteLoginDataItemButton>
          <Icon name="trash"/>
        </DeleteLoginDataItemButton>
      </ButtonsContainer>

    </Container>
  );
}