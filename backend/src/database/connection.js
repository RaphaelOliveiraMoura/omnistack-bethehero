import knex from 'knex';

import configuration from '../../knexfile';

const databaseConfigurations =
  process.env.NODE_ENV === 'test'
    ? configuration.test
    : configuration.development;

const connection = knex(databaseConfigurations);

export default connection;
