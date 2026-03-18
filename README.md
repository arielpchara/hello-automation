# Hello Automation 🏠

A domestic IoT automation project integrating smart home devices with Siri via HomeKit. Built with Node.js, React, and MQTT.

## Overview

This project creates a complete smart home automation ecosystem with:
- **IoT Integration**: Cheap IoT devices running [Tasmota firmware](https://tasmota.github.io/docs/)
- **Siri Control**: HomeKit Bridge using [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS)
- **Real-time Monitoring**: System metrics dashboard
- **Communication**: MQTT broker for device coordination
- **Dashboard UI**: React-based web interface for control and monitoring

## Project Structure

```
hello-automation/
├── app/              # React web dashboard
│                     # - Device control interface
│                     # - Real-time system monitoring
│                     # - Gauge charts and metrics display
├── bridge/           # HomeKit Bridge (Siri integration)
│                     # - HAP-NodeJS accessories
│                     # - MQTT to HomeKit mapping
│                     # - Device state synchronization
├── monitor/          # System metrics server
│                     # - CPU/Memory/Temperature monitoring
│                     # - Express.js API server
│                     # - MQTT publisher for metrics
├── src/              # Shared utilities
│                     # - MQTT stream helpers
│                     # - Constants and configuration
└── package.json      # Monorepo root configuration
```

## Prerequisites

- **Node.js**: v12 or higher
- **npm**: v6 or higher
- **MQTT Broker**: Running and accessible (e.g., Mosquitto)
  - Default: `mqtt://192.168.0.113/mqtt` (configurable)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hello-automation
   ```

2. **Install dependencies for all services**
   ```bash
   # Install app dependencies
   cd app && npm install && cd ..
   
   # Install bridge dependencies
   cd bridge && npm install && cd ..
   
   # Install monitor dependencies
   cd monitor && npm install && cd ..
   ```

## Running the Services

### Option 1: Individual Terminal Windows

**Terminal 1 - Dashboard (React)**
```bash
cd app
npm start
# Opens http://localhost:3000
```

**Terminal 2 - Bridge (HomeKit)**
```bash
cd bridge
npm run dev
# Requires MQTT broker IP via command line:
# node index.js --broker mqtt://192.168.0.113/mqtt
```

**Terminal 3 - Monitor (Metrics)**
```bash
cd monitor
npm start
# Runs on http://localhost:8088 (or custom $PORT)
# Publishes metrics every 1.5s to MQTT
```

### Option 2: Process Manager (Recommended for Production)

Use PM2 or similar to manage all services:
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 logs
```

## Configuration

### Bridge (HomeKit)
```bash
cd bridge
# Pass MQTT broker address as argument
node index.js --broker mqtt://192.168.0.113:1883
npm run dev -- --broker mqtt://YOUR_BROKER_IP
```

### Monitor (Metrics Server)
```bash
# Set custom port
PORT=9000 npm start

# Default: PORT=8088
```

## Services

### 📱 App (React Dashboard)
- **Port**: 3000 (development)
- **Build for production**: `npm run build`
- **Technologies**: React, TypeScript, Socket.IO, styled-components
- **Features**:
  - Real-time device control
  - System metrics visualization
  - Responsive UI design

### 🏠 Bridge (HomeKit Integration)
- **Main**: `bridge/index.js`
- **Dependencies**: HAP-NodeJS, MQTT, node-persist
- **Features**:
  - HomeKit accessory publishing
  - MQTT event subscription
  - Device state persistence
- **Development**: `npm run dev` (with nodemon auto-reload)

### 📊 Monitor (System Metrics)
- **Port**: 8088 (configurable via `$PORT`)
- **Publishes to MQTT**:
  - `board/load` - CPU load metrics
  - `board/mem` - Memory usage
  - `board/temp` - CPU temperature
- **Update interval**: 1.5 seconds
- **Technologies**: Express, systeminformation, MQTT

## MQTT Topics

The project uses the following MQTT topic structure:
- `board/load` - Current CPU load percentage
- `board/mem` - Memory usage statistics
- `board/temp` - CPU temperature readings
- Custom device topics via accessories

## Security

All dependencies are regularly audited for vulnerabilities. Latest version uses:
- `systeminformation` v5.31.4+ (with command injection fixes)
- `hap-nodejs` v0.11.2+ (with SSRF fixes)
- `socket.io` v4.8.3+ (with DoS mitigations)
- `express` v4.17.1+

Run `npm audit` in each directory to check for vulnerabilities.

## Development

### Tech Stack
- **Backend**: Node.js, Express
- **Frontend**: React, TypeScript
- **Real-time**: Socket.IO
- **Messaging**: MQTT
- **HomeKit**: HAP-NodeJS
- **System Info**: systeminformation

### Scripts by Package

**App**
- `npm start` - Development server
- `npm build` - Production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

**Bridge**
- `npm start` - Start HAP Bridge
- `npm run dev` - Development with auto-reload

**Monitor**
- `npm start` - Start metrics server

## Troubleshooting

### MQTT Connection Issues
- Verify MQTT broker is running and accessible
- Check broker IP address: `mqtt://192.168.0.113/mqtt`
- Ensure network connectivity between services

### HomeKit Not Showing Devices
- Verify bridge is running and connected to MQTT
- Check HomeKit pin code (printed at startup)
- Ensure all accessories are properly configured in `bridge/accessories/`

### Missing Metrics
- Verify monitor service is running on port 8088
- Check MQTT connection in monitor service logs
- Confirm system has systeminformation access

## References

- [Tasmota Documentation](https://tasmota.github.io/docs/) - IoT Device Firmware
- [Shelly Smart Home Devices](https://shelly.cloud/) - Hardware
- [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS) - HomeKit Protocol
- [MQTT Protocol](https://mqtt.org/) - Messaging Standard
- [Create React App](https://create-react-app.dev/) - Frontend Framework

## License

ISC

## Notes

This is an experimental/hobby project that evolves continuously. Code organization and structure may change as new features are added. Contributions and improvements are welcome!