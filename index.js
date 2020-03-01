const express = require('express')
const os = require('os')

const app = express()


app.get('/', (req, res) => {
  res.json({
    i: os.networkInterfaces()
  })
})


app.listen( process.env.PORT || 8080 )