const express = require('express')
const { query } = require('../helpers/db.js')

const todoRouter = express.Router()

// get time
todoRouter.get("/time", async (req, res) => {
  try {
    const rows = await query('SELECT NOW() AS serverTime')
    res.status(200).json({ serverTime: rows[0].serverTime })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// get tasks
todoRouter.get("/", async (req, res) => {
  try {
    const rows = await query('SELECT id, description FROM task ORDER BY id ASC')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Insert new task
todoRouter.post("/new", async (req, res) => {
  try {
    const result = await query('INSERT INTO task (description) VALUES (?)', [req.body.description])
    res.status(200).json({ id: result.insertId, description: req.body.description })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete task
todoRouter.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id)
  try {
    await query('DELETE FROM task WHERE id = ?', [id])
    res.status(200).json({ id: id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = todoRouter