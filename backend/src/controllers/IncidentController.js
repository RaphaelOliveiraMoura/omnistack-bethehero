import connection from '../database/connection';

class IncidentController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    const [count] = await connection('incidents').count();

    return response
      .set({ 'X-Total-Count': [Object.values(count)] })
      .json(incidents);
  }

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  }

  async delete(request, response) {
    const incident_id = request.params.id;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', incident_id)
      .select('ong_id')
      .first();

    if (!incident) {
      return response.status(400).json({ error: 'Invalid incident id' });
    }

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents')
      .where('id', incident_id)
      .delete();

    return response.status(204).send();
  }
}

export default new IncidentController();
