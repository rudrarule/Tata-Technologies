const sql = require("../../config/database.config");
var oracledb = require("oracledb");
const config = require("../../config/database.connection");
const { isOracle } = require("../../config/constant");
const { poolPromise } = require("../../config/mssqlDB.config");

const NewUser = function (user) {
  this.user_name = user.user_name;
  this.password = user.password;
  this.role = user.role;
  this.active = user.active;
  this.activated = user.activated;
};

let conn;
let result;

async function getAll() {
  if (isOracle) {
    const sqlQ = "SELECT * FROM USERMANAGMENTTABLE";
    const users = await sql.query(sqlQ);
    return users;
  } else {
    const pool = await poolPromise;
    const rs = await pool.request().query(
      `SELECT [user_name]
      ,[password]
      ,[Role]
      ,[Active]
      ,[Activated]
      ,[DeActivated]
  FROM [dbo].[UserManagmentTable]`
    );
    return rs.recordsets[0];
  }
}

async function signInUser(user) {
  try {
    if (isOracle) {
      conn = await oracledb.getConnection(config);
      result = await conn.execute(
        'select user_name as "user_name", password as "password", role as "Role", active as "Active", activated as "Activated", deactivated as "Deactivated" from USERMANAGMENTTABLE where user_name = :user_name and password = :password',
        { user_name: user.user_name, password: user.password },
        { outFormat: oracledb.OBJECT }
      );
      const userResult = result.rows[0];
      return userResult;
    } else {
      const pool = await poolPromise;
      const rs = await pool.request().query(
        `SELECT TOP 1 [user_name]
          ,[password]
          ,[Role]
          ,[Active]
          ,[Activated]
          ,[DeActivated]
      FROM [dbo].[UserManagmentTable] WHERE user_name=${user.user_name} and password='${user.password}' `
      );
      return rs.recordset[0];
    }
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error("Error closing database connection", err);
      }
    }
  }
}

module.exports = {
  NewUser,
  signInUser,
  getAll,
};
