import pool from '../db/dbconnection.js';

export async function execute(query, binding) {
    let connection;
    let timeoutId;
    const timeoutDuration = 90000;

    try {
        // Get a connection from the pool
        connection = await new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(conn);
            });
        });

        const queryPromise = new Promise((resolve, reject) => {
            connection.query(query, binding, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });

        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                reject("Query timed out");
                connection?.release();
            }, timeoutDuration);
        });

        return await Promise.race([queryPromise, timeoutPromise]);
    } catch (error) {
        console.log(error);
        throw error; 
    } finally {
        clearTimeout(timeoutId);
        if (connection) connection.release(); // Release the connection back to the pool
    }
}
