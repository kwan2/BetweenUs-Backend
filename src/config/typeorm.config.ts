import 'dotenv/config';

export default () => ({
  typeorm: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    entities: ['dist/**/**.entity{.ts,.js}'],
    synchronize: false,
  },
});
