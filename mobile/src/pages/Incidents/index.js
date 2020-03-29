import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  Image,
  HeaderText,
  HeaderTextBold,
  Title,
  Description,
  IncidentList,
  Incident,
  IncidentProperty,
  IncidentValue,
  DetailsButton,
  DetailsButtonText
} from './styles';

import logoImage from '../../assets/logo.png';

import api from '../../services/api';

export default function Incidents() {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading) return;

    if (total > 0 && incidents.length === total) return;

    setLoading(true);

    const response = await api.get('/incidents', { params: { page } });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);

    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate('Details', { incident });
  }

  return (
    <Container>
      <Header>
        <Image source={logoImage} />
        <HeaderText>
          Total de <HeaderTextBold>{total} casos</HeaderTextBold>
        </HeaderText>
      </Header>

      <Title>Bem vindo</Title>
      <Description>Escolha um dos casos abaixo e salve vidas</Description>

      <IncidentList
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        renderItem={({ item: incident }) => (
          <Incident>
            <IncidentProperty>ONG:</IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>{incident.description}</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </IncidentValue>

            <DetailsButton onPress={() => navigateToDetail(incident)}>
              <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </DetailsButton>
          </Incident>
        )}
      />
    </Container>
  );
}
