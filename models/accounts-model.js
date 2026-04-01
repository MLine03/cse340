import pool from "./db.js";

const AccountModel = {
  getAccount: async (userId) => {
    const sql = "SELECT * FROM account WHERE account_id = $1";
    const result = await pool.query(sql, [userId]);
    return result.rows[0];
  },

  updateAccount: async ({ account_id, first_name, last_name, email }) => {
    const sql = `
      UPDATE account
      SET first_name=$1, last_name=$2, email=$3
      WHERE account_id=$4
    `;
    await pool.query(sql, [first_name, last_name, email, account_id]);
  }
};

export default AccountModel;