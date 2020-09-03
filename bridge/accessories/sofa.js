const { createTasmotaAccessory } = require('../lib/tasmota')
const { EventEmitter } = require('events')

const sofa = (mqttClient) => {
  let state
  const event = new EventEmitter()
  mqttClient.subscribe(`stat/sofa/POWER`)
  mqttClient.on('message', (topic, payload) => {
    if( topic === `stat/sofa/POWER`) {
      state = payload.toString()
      event.emit('POWER', state === 'ON')
    }
  })
  return createTasmotaAccessory({
    name: 'TV Sofa',
    Manufacturer: 'Sonoff',
    model: 'Sonoff Basic',
    onPower: (value) => {
      mqttClient.publish(`cmnd/sofa/POWER`, value ? 'ON' : 'OFF')
    },
    getPower: () => state === 'ON',
    event
  })
}

module.exports = {
  sofa
}