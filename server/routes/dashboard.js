const pool = require('../db')
const router = require('express').Router()
const authorize = require('../middleware/authorize')

//all todos and name
router.get('/', authorize, async(req,res) => {
    try {
        // const user = await pool.query('SELECT user_name FROM users where user_id = $1', [req.user.id])
        const user = await pool.query('SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id where u.user_id = $1', [req.user.id])
        res.json(user.rows)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send('Server Error')
    }
})

//create a todo
router.post('/todos', authorize, async(req,res) => {
    try {
        console.log(req.body)
        const {description} = req.body
        const todo = await pool.query('INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',[req.user.id, description])
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})
//update a todo
router.put('/todos/:id', authorize, async(req,res) => {
    try {
       const {id} = req.params
       const {description} = req.body 
       const todo = await pool.query('UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',[description, id, req.user.id])
       if(todo.rows.length === 0){
        return res.json('That todo is not yours')
       }
       res.json('todo was updated')
    } catch (error) {
        console.error(error.message)
    }
})
//delete a todo

router.delete('/todos/:id', authorize,async(req,res) => {
    try {
        const {id} = req.params
        const todo = await pool.query('DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *', [id,req.user.id])
        if(todo.rows.length == 0){
           return res.json('That is not your todo')
        }
        res.json('Deleted successfully')
    } catch (error) {
        console.error(error.message)
    }
})
module.exports = router;