const pool = require("../../db.js"); 

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM study_plan WHERE id = ?", [id])
  return rows[0] || null
}

async function save(plan) {
  const [result] = await pool.query(
    "INSERT INTO study_plan (plan_code, name_eng, name_th) VALUES (?, ?, ?)",
    [plan.plan_code, plan.name_eng, plan.name_th]
  );
  if (result.affectedRows === 0) return null
  return findById(result.insertId)
}

module.exports = { save };