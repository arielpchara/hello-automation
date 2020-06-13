const { createTasmotaAccessory } = require('../lib/tasmota')
const { EventEmitter } = require('events')

const tvroom = (mqttClient) => {
  let state
  const event = new EventEmitter()
  mqttClient.subscribe(`stat/tvroom/POWER`)
  mqttClient.on('message', (topic, payload) => {
    if( topic === `stat/tvroom/POWER`) {
      state = payload.toString()
      event.emit('POWER', state === 'ON')
    }
  })
  return createTasmotaAccessory({
    name: 'TV Room',
    Manufacturer: 'Sonoff',
    model: 'Sonoff Mini',
    onPower: (value) => {
      console.log(`OK: ${value}`)
      mqttClient.publish(`cmnd/tvroom/POWER`, value ? 'ON' : 'OFF')
    },
    getPower: () => state === 'ON',
    event
  })
}

module.exports = {
  tvroom
}