import supertest from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';

const api = supertest(app);

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ong', async () => {
    const ong = {
      name: 'ong name',
      email: 'ong@email.com',
      whatsapp: '31998204295',
      city: 'city name',
      uf: 'UF'
    };

    const response = await api.post('/ongs').send(ong);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
