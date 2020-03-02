const {
  Accessory,
  uuid,
  Service,
  Characteristic,
  AccessoryEventTypes,
  CharacteristicEventTypes
} = require("hap-nodejs")

const defaultOnIdentify = (params) => () => {
  console.log(`Tasmota device identified as ${params.name}`)
}

const defaultOnPower = (params) => (value) => {
  console.log(`Tasmota ${params.name} POWER: ${value}`)
}

const defaultGetPower = (params) => () => {
  console.log(`Getting ${params.name} POWER`)
  return false
}

function createTasmotaAccessory(params) {

  const {
    name,
    Manufacturer,
    model,
    onIdentify = defaultOnIdentify(params),
    onPower = defaultOnPower(params),
    getPower = defaultGetPower(params),
    event
  } = params

  const tasmotaUUID = uuid.generate("tasmota:accessories:" + name);
  const tasmotaAccessory = new Accessory(name, uuid.generate(tasmotaUUID));
  
  tasmotaAccessory
    .getService(Service.AccessoryInformation)
    .setCharacteristic(Characteristic.Manufacturer, Manufacturer)
    .setCharacteristic(Characteristic.Model, model)

  tasmotaAccessory.on(
    AccessoryEventTypes.IDENTIFY,
    (paired, callback) => {
      onIdentify()
      callback();
    }
  )

  const power = tasmotaAccessory
    .addService(Service.Lightbulb, name)
    .getCharacteristic(Characteristic.On)

  power.on(CharacteristicEventTypes.SET, (value, callback) => {
      onPower(value)
      callback()
    })
  power.on(CharacteristicEventTypes.GET, (callback) => {
      callback(null, getPower());
    })

  if(event) {
    event.on('POWER', power.updateValue)
  }

  return tasmotaAccessory;
}

module.exports = {
  createTasmotaAccessory
}