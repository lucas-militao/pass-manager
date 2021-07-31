import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: #4E3975;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  margin: ${RFValue(64)}px auto ${RFValue(41)}px auto;
`;

export const Form = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.title};

  padding: 0 ${RFValue(27)}px;
  padding-top: ${RFValue(26)}px;

  border-top-left-radius: ${RFValue(50)}px;
  border-top-right-radius: ${RFValue(50)}px;
`;