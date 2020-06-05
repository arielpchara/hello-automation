const { createTasmotaAccessory } = require('../../lib/tasmota')
const { EventEmitter } = require('events')

const bed = (mqttClient) => {
  let state
  const event = new EventEmitter()
  mqttClient.subscribe(`stat/bed/POWER`)
  mqttClient.on('message', (topic, payload) => {
    if( topic === `stat/bed/POWER`) {
      state = payload.toString()
      event.emit('POWER', state === 'ON')
    }
  })
  return createTasmotaAccessory({
    name: 'Main',
    Manufacturer: 'Sonoff',
    model: 'Sonoff Mini',
    onPower: (value) => {
      console.log(`OK: ${value}`)
      mqttClient.publish(`cmnd/bed/POWER`, value ? 'ON' : 'OFF')
    },
    getPower: () => state === 'ON',
    event
  })
}

module.exports = {
  bed
}