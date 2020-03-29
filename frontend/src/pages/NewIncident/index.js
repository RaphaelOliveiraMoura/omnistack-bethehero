import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

import logoImage from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(event) {
    event.preventDefault();

    try {
      const data = {
        title,
        description,
        value
      };

      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <Container>
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />

          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            <span>Voltar para home</span>
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
