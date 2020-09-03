const { createTasmotaAccessory } = require('../lib/tasmota')
const { EventEmitter } = require('events')

const jantar = (mqttClient) => {
  let state
  const event = new EventEmitter()
  mqttClient.subscribe(`stat/jantar/POWER`)
  mqttClient.on('message', (topic, payload) => {
    if( topic === `stat/jantar/POWER`) {
      state = payload.toString()
      event.emit('POWER', state === 'ON')
    }
  })
  return createTasmotaAccessory({
    name: 'Sala Jantar',
    Manufacturer: 'Shelly',
    model: 'Shelly One',
    onPower: (value) => {
      mqttClient.publish(`cmnd/jantar/POWER`, value ? 'ON' : 'OFF')
    },
    getPower: () => state === 'ON',
    event
  })
}

module.exports = {
  jantar
}