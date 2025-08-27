import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const sqlServerConfig = {
    user: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: process.env.SQLSERVER_DATABASE,
    server: process.env.SQLSERVER_SERVER,
    port: parseInt(process.env.SQLSERVER_PORT || '37000', 10),
    options: {
        encrypt: true,
        trustServerCertificate: true,
        serverName: process.env.SQLSERVER_SERVER,
    },
};

let pool: sql.ConnectionPool | null = null;

export async function connectToSqlServer() {
    try {
        if (!pool) {
            pool = await sql.connect(sqlServerConfig);
            console.log('SQL Server conectado.');
        }
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao SQL Server:', error);
        throw error;
    }
}

export async function disconnectSqlServer() {
    if (pool) {
        await pool.close();
        console.log('SQL Server desconectado.');
        pool = null;
    }
}
