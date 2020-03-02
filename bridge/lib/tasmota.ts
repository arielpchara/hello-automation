import {
  Accessory,
  uuid,
  Service,
  Characteristic,
  AccessoryEventTypes,
  VoidCallback,
  CharacteristicEventTypes,
  CharacteristicValue,
  CharacteristicSetCallback,
  NodeCallback
} from "hap-nodejs";
import { EventEmitter } from "events";

const defaultOnIdentify = (params: TasmotaAccessoryParams) => () => {
  console.log(`Tasmota device identified as ${params.name}`)
}

const defaultOnPower = (params: TasmotaAccessoryParams) => (value: CharacteristicValue) => {
  console.log(`Tasmota ${params.name} POWER: ${value}`)
}

const defaultGetPower = (params: TasmotaAccessoryParams) => ():boolean => {
  console.log(`Getting ${params.name} POWER`)
  return false
}

interface TasmotaAccessoryParams {
  name: string
  Manufacturer: string
  model: string
  onIdentify?: () => void
  onPower?: (value: CharacteristicValue) => void,
  getPower?: () => boolean,
  event?: EventEmitter
}

export function createTasmotaAccessory(params: TasmotaAccessoryParams): Accessory {

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
    .getService(Service.AccessoryInformation)!
    .setCharacteristic(Characteristic.Manufacturer, Manufacturer)
    .setCharacteristic(Characteristic.Model, model)

  tasmotaAccessory.on(
    AccessoryEventTypes.IDENTIFY,
    (paired: boolean, callback: VoidCallback) => {
      onIdentify()
      callback();
    }
  )

  const power = tasmotaAccessory
    .addService(Service.Lightbulb, name)
    .getCharacteristic(Characteristic.On)!

  power.on(CharacteristicEventTypes.SET, (value: CharacteristicValue, callback: CharacteristicSetCallback) => {
      onPower(value)
      callback()
    })
  power.on(CharacteristicEventTypes.GET, (callback: NodeCallback<CharacteristicValue>) => {
      callback(null, getPower());
    })

  if(event) {
    event.on('POWER', power.updateValue)
  }

  return tasmotaAccessory;
}
