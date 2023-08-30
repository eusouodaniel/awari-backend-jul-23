import connection from '../config/db/mysql.js';

class CheckEmailUtil {
  async checkEmail(email) {
    const response = await connection.query(`
      select count(email) as count, id from users where email = '${email}' group by id
    `);
    if (response[0].length > 0) {
      return { count: response[0][0].count, id: response[0][0].id };
    }
    return false;
  }
}

export default new CheckEmailUtil();