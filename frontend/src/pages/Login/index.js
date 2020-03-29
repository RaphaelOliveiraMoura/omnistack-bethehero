import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Container } from './styles';

import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

import api from '../../services/api';

export default function Login() {
  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <Container>
      <section>
        <img src={logoImage} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            type="text"
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImage} alt="Heroes" />
    </Container>
  );
}
