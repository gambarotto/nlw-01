import path from 'path';
import connection from './src/database/connection';

const knexfile:any = {
  development: {
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
  }
};

module.exports = knexfile;
