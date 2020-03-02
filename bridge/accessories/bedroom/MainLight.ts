import { createTasmotaAccessory } from '../../lib/tasmota'
import { MqttClient } from 'mqtt'
import { EventEmitter } from 'events'

export const light = (mqttClient: MqttClient) => {
  let state: string
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