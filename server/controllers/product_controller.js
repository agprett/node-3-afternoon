module.exports = {
  create: (req, res) => {
    const db = req.app.get('db')
    const {name, description, price, image_url} = req.body

    db.create_product([name, description, price, image_url]).then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Oops. Something gone wack, sorry dude.')
    })
  },
  
  getOne: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    
    db.read_product(id).then(product => {
      res.status(200).send(product)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Oops. Something gone wack, sorry dude.')
    })
  },
  
  getAll: (req, res) => {
    const db = req.app.get('db')
    
    db.read_products().then(products => {
      res.status(200).send(products)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Oops. Something gone wack, sorry dude.')
    })
  },
  
  update: (req, res) => {
    const db = req.app.get('db')
    const {query, params} = req

    db.update_product([query.desc, params.id]).then(() => {
      res.sendStatus(200)
    }) 
    .catch(err => {
      console.log(err)
      res.status(500).send('Oops. Something gone wack, sorry dude.')
    })
},
  
  delete: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    db.delete_product(id).then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Oops. Something gone wack, sorry dude.')
    })
  }
}