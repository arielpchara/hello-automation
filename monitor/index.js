const si = require('systeminformation')
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 8088);

io.on('connection', function (socket) {
  setInterval(() => {
    si.currentLoad().then(socket.emit.bind(socket, 'load'))
    si.mem().then(socket.emit.bind(socket, 'mem'))
  }, 500)
});

app.get('/mem', (req, res) => {
  si.mem().then(res.json.bind(res)).catch(res.status(500).json.bind(res))
})

app.get('/cpu', (req, res) => {
  si.cpu().then(res.json.bind(res)).catch(res.status(500).json.bind(res))
})

app.get('/interfaces', (req, res) => {
  si.networkInterfaces().then(res.json.bind(res)).catch(res.status(500).json.bind(res))
})

app.get('/', (req, res) => {
  si.currentLoad().then(res.json.bind(res)).catch(res.status(500).json.bind(res))
})

app.listen( process.env.PORT || 8888 )