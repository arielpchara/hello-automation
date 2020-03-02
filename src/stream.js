const {connect} = require('mqtt')
const socket = require('socket.io')

const {MQTT_ADDRESS, SOCKET_PORT} = require('./constants')

const mqtt = connect(MQTT_ADDRESS)
const io = socket(SOCKET_PORT)


io.on('connection', conn => {
  mqtt.subscribe('cmnd/querto/POWER', () => {
    
  })
  client.on('message', function (topic, message) {
    conn.emit('news', { hello: 'world' });
  })
  conn.on('', function (data) {
    console.log(data);
    
  });
})
