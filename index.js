const express = require('express')
const os = require('os')

const app = express()


app.get('/', (req, res) => {
  res.json({
    i: os.networkInterfaces()
  })
})

app.get('/mem', (req, res) => {
  res.json(os.freemem() / 1024 / 1024)
})


app.listen( process.env.PORT || 8080 )