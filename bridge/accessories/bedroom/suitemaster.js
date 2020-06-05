const { createTasmotaAccessory } = require('../../lib/tasmota')
const { EventEmitter } = require('events')

const light = (mqttClient) => {
  let state
  const event = new EventEmitter()
  mqttClient.subscribe(`stat/suitemaster/POWER`)
  mqttClient.on('message', (topic, payload) => {
    if( topic === `stat/suitemaster/POWER`) {
      state = payload.toString()
      event.emit('POWER', state === 'ON')
    }
  })
  return createTasmotaAccessory({
    name: 'Main',
    Manufacturer: 'Shelly',
    model: 'ShellyOne',
    onPower: (value) => {
      console.log(`OK: ${value}`)
      mqttClient.publish(`cmnd/suitemaster/POWER`, value ? 'ON' : 'OFF')
    },
    getPower: () => state === 'ON',
    event
  })
}

module.exports = {
  light
}