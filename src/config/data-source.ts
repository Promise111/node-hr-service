import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { Employee } from '../employees/entities/employee.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'legacy_hr_api',
  entities: [Employee],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.NODE_ENV === 'development', // Auto-sync in dev, use migrations in prod
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

