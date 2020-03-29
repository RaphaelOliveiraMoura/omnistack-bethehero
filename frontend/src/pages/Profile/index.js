import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import { Container } from './styles';

import logoImage from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {
  const history = useHistory();

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadIncidents() {
      const response = await api.get('/profile', {
        headers: { Authorization: ongId }
      });

      setIncidents(response.data);
    }

    loadIncidents();
  }, [ongId]);

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: { Authorization: ongId }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar incidente, tente novamente');
    }
  }

  return (
    <Container>
      <header>
        <img src={logoImage} alt="Be The Hero" />
        <span>Bem vindo(a), {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}
