
const input = (mqttClient) => {
  const INPUT_TOPIC = 'shellies/shellyix3-A4CF12F46DE5/input/2';
  mqttClient.on('connect', () => {
    mqttClient.subscribe(INPUT_TOPIC, () => {
      mqttClient.on('message', (topic, payload) => {
        if( topic === INPUT_TOPIC) {
          const state = payload.toString() === '1'
          console.log(state)
          mqttClient.publish('cmnd/jantar/POWER', state ? 'ON' : 'OFF')
          mqttClient.publish('cmnd/sofa/POWER', state ? 'ON' : 'OFF')
          mqttClient.publish('cmnd/tvroom/POWER', state ? 'ON' : 'OFF')
        }
      })
    })
  })
}

module.exports = {
  input
}