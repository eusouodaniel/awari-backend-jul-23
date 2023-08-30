import connection from "../../config/db/mysql.js";
import CheckEmailUtil from "../../util/check-email.util.js";

class UserService {
  async searchUsers() {
    try {
      const users = await connection.query(`select 
        id,
        name,
        surname,
        email,
        document_number,
        address_street,
        address_number,
        address_complement,
        address_locality,
        address_city,
        address_region,
        address_country,
        address_postalCode 
      from users`);
      return users[0];
    } catch(error) {
      console.log(error);
      throw new Error();
    }
  }

  async create(payload) {
    try {
      const checkEmail = await CheckEmailUtil.checkEmail(payload.email);
      if (!checkEmail || checkEmail.count === 0) { 
        await connection.query(`insert into users (
          name, 
          surname, 
          email, 
          password
        ) values (
          '${payload.name}', 
          '${payload.surname}', 
          '${payload.email}',
          '${payload.password}'
        )`);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async update(payload,id) {
    try {
      const checkEmail = await CheckEmailUtil.checkEmail(payload.email);
      if (!checkEmail || checkEmail.count === 0 || 
        (checkEmail.count === 1 && checkEmail.id === Number(id))) {
        await connection.query(`update users set
        name='${payload.name}', 
        surname='${payload.surname}',
        email='${payload.email}'
        where id=${id}`);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async delete(id) {
    try {
      await connection.query(`delete from users where id = ${id}`);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default new UserService();