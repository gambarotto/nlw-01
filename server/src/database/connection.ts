import knex from 'knex/';
import path from 'path';
//import knexfile from '../../knexfile';

const connection = knex({
    client: 'pg',
    connection: {
      user: "postgres",
      password: "docker",
      database: "pointcollection"
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true
});

export default connection;
