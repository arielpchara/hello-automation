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

init();

const mqttClient = connect(
  process.env.MQTT_ADDR || "mqtt://192.168.0.111:1883"
);

const bridge = new Bridge(name, uuid.generate(name));

bridge.on(AccessoryEventTypes.IDENTIFY, (paired, callback) => {
  console.log("Node Bridge identify");
  callback();
});

const all = Object.values(accessories).map(accessory => accessory(mqttClient));

bridge.addBridgedAccessories(all);

bridge.publish(
  {
    username: "e2:aa:69:30:4b:39",
    pincode: "091-00-121",
    category: Categories.BRIDGE
  },
  true
);