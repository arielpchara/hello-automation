const si = require('systeminformation')
const app = require('express')();
const server = require('http').Server(app);
const {connect} = require('mqtt')

server.listen(process.env.PORT || 8088);

const client = connect('http://192.168.0.113/mqtt')

client.on('connect', () => {
    setInterval(() => {
      si.currentLoad().then(JSON.stringify.bind(JSON)).then(client.publish.bind(client, 'board/load'))
      si.mem().then(JSON.stringify.bind(JSON)).then(client.publish.bind(client, 'board/mem'))
      si.cpuTemperature().then(JSON.stringify.bind(JSON)).then(client.publish.bind(client, 'board/temp'))
    }, 1500)
})

// io.on('connection', function (socket) {
//   setInterval(() => {
//     si.currentLoad().then(socket.emit.bind(socket, 'load'))
//     si.mem().then(socket.emit.bind(socket, 'mem'))
//   }, 500)
// });

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