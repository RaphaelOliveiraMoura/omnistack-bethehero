import React from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import {
  Container,
  Header,
  Incident,
  IncidentProperty,
  IncidentValue,
  ContactBox,
  HeroTitle,
  HeroDescription,
  Actions,
  Action,
  ActionText
} from './styles';

import logoImage from '../../assets/logo.png';

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const formatedValue = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(incident.value);

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${formatedValue}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <Container>
      <Header>
        <Image source={logoImage} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={20} color="#e82041" />
        </TouchableOpacity>
      </Header>

      <Incident>
        <IncidentProperty style={{ marginTop: 0 }}>ONG:</IncidentProperty>
        <IncidentValue>
          {incident.name} de {incident.city}/{incident.uf}
        </IncidentValue>

        <IncidentProperty>CASO:</IncidentProperty>
        <IncidentValue>{incident.description}</IncidentValue>

        <IncidentProperty>VALOR:</IncidentProperty>
        <IncidentValue>{formatedValue}</IncidentValue>
      </Incident>

      <ContactBox>
        <HeroTitle>Salve o dia!</HeroTitle>
        <HeroTitle>Seja o héroi desse caso.</HeroTitle>

        <HeroDescription>Entre em contato:</HeroDescription>

        <Actions>
          <Action onPress={sendWhatsapp}>
            <ActionText>Whatsapp</ActionText>
          </Action>

          <Action onPress={sendMail}>
            <ActionText>E-mail</ActionText>
          </Action>
        </Actions>
      </ContactBox>
    </Container>
  );
}
