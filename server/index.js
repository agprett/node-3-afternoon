const express = require('express')
const massive = require('massive')
const products_controller = require('./controllers/product_controller')
require('dotenv').config()

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

app.post('/api/products', products_controller.create)
app.get('/api/products', products_controller.getAll)
app.get('/api/products/:id', products_controller.getOne)
app.put('/api/products/:id', products_controller.update)
app.delete('/api/products/:id', products_controller.delete)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  console.log('DB connected')
  app.set('db', dbInstance)
  app.listen(SERVER_PORT, () => {
    console.log(`Docked at port ${SERVER_PORT}`)
  })
})
