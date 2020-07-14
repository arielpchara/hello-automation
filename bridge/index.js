const {
  init,
  uuid,
  Bridge,
  AccessoryEventTypes,
  Categories
} = require("hap-nodejs");
const { name } = require("./package.json");
const { connect } = require("mqtt");
const accessories = require("./accessories");

const {argv} = require('yargs')

init();

const brokerURL = argv.broker

if(!brokerURL) {
  throw new Error('Invalid Broker Address')
}

console.log(`Connecting to MQTT (${brokerURL})`)

const mqttClient = connect(brokerURL);

const bridge = new Bridge(name, uuid.generate(name));

bridge.on(AccessoryEventTypes.IDENTIFY, (paired, callback) => {
  console.log("Node Bridge identify");
  callback();
});

console.log(accessories)

const all = Object.values(accessories).map(accessory => accessory(mqttClient));

bridge.addBridgedAccessories(all);

bridge.publish(
  {
    username: "e2:aa:69:30:4b:31",
    pincode: "091-00-121",
    category: Categories.BRIDGE
  },
  true
);