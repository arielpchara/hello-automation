const { createTasmotaAccessory } = require('../../lib/tasmota')
const { EventEmitter } = require('events')

const light = (mqttClient) => {
  let state
  const event = new EventEmitter()
  mqttClient.subscribe(`stat/quarto/POWER`)
  mqttClient.on('message', (topic, payload) => {
    if( topic === `stat/quarto/POWER`) {
      state = payload.toString()
      event.emit('POWER', state === 'ON')
    }
  })
  return createTasmotaAccessory({
    name: 'Main',
    Manufacturer: 'Sonoff',
    model: 'Mini',
    onPower: (value) => {
      console.log(`OK: ${value}`)
      mqttClient.publish(`cmnd/quarto/POWER`, value ? 'ON' : 'OFF')
    },
    getPower: () => state === 'ON',
    event
  })
}

module.exports = {
  light
}