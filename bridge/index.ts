import { init, uuid, Bridge, AccessoryEventTypes, VoidCallback, Categories } from 'hap-nodejs'
import { name } from './package.json'
import { connect } from 'mqtt'
import * as accessories from './accessories'

init()

const mqttClient = connect( process.env.MQTT_ADDR || 'mqtt://192.168.0.104:1883')

const bridge = new Bridge(name, uuid.generate(name))

bridge.on(AccessoryEventTypes.IDENTIFY, (paired: boolean, callback: VoidCallback) => {
  console.log("Node Bridge identify");
  callback();
});

const all = Object.values(accessories).map( accessory => accessory(mqttClient) )

bridge.addBridgedAccessories(all) 

bridge.publish({
  username: 'e2:aa:69:30:4b:36',
  pincode: '091-00-120',
  category: Categories.BRIDGE
}, true);