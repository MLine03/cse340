import pool from "../database/connection.js"

const accountModel = {}

accountModel.getAccountById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM account WHERE account_id = $1",
    [id]
  )
  return result.rows[0]
}

accountModel.updateAccount = async (data) => {
  const result = await pool.query(
    `UPDATE account
     SET account_firstname=$1, account_lastname=$2, account_email=$3
     WHERE account_id=$4`,
    [data.account_firstname, data.account_lastname, data.account_email, data.account_id]
  )
  return result.rowCount
}

accountModel.updatePassword = async (id, password) => {
  const result = await pool.query(
    "UPDATE account SET account_password=$1 WHERE account_id=$2",
    [password, id]
  )
  return result.rowCount
}

export default accountModel