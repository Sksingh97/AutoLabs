import { BleManager } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';


class BleService {
  constructor() {
    this.bleManager = new BleManager();
    this.isScanning = false;
    this.connectedDevice = null;
  }

  /**
   * Check if BLE is supported on the device
   * @returns {Promise<boolean>} - True if BLE is supported
   */
  async isBleSupported() {
    try {
      return await this.bleManager.state() !== 'unsupported';
    } catch (error) {
      console.error('Error checking BLE support:', error);
      return false;
    }
  }

  /**
   * Check if Bluetooth is enabled
   * @returns {Promise<boolean>} - True if Bluetooth is enabled
   */
  async isBluetoothEnabled() {
    try {
      const state = await this.bleManager.state();
      return state === 'PoweredOn';
    } catch (error) {
      console.error('Error checking Bluetooth state:', error);
      return false;
    }
  }

  /**
   * Request Bluetooth permissions
   * @returns {Promise<boolean>} - True if permissions are granted
   */
  async requestPermissions() {
    if (Platform.OS === 'android') {
      // For Android 12+ (S and above)
      if (Platform.Version >= 31) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);
        
        return (
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === 'granted' &&
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === 'granted' &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === 'granted'
        );
      } 
      // For Android 6.0 to 11
      else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } 
    // For iOS
    else {
      const status = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
      return status === RESULTS.GRANTED;
    }
  }

  /**
   * Enable Bluetooth if it's not enabled
   * @returns {Promise<boolean>} - True if Bluetooth is enabled or successfully enabled
   */
  async enableBluetooth() {
    // Check if Bluetooth is already enabled
    if (await this.isBluetoothEnabled()) {
      return true;
    }

    if (Platform.OS === 'ios') {
      // iOS doesn't allow programmatic enabling of Bluetooth
      Alert.alert(
        'Bluetooth Required',
        'Please enable Bluetooth to scan for devices.',
        [{ text: 'OK' }]
      );
      return false;
    } else {
      // Android
      try {
        // This will prompt the user to enable Bluetooth
        await this.bleManager.enable();
        return true;
      } catch (error) {
        console.error('Failed to enable Bluetooth:', error);
        return false;
      }
    }
  }

  /**
   * Start scanning for BLE devices
   * @param {Object} options - Scanning options
   * @param {Array<string>} options.serviceUUIDs - Specific service UUIDs to scan for
   * @param {number} options.scanTimeout - Scan timeout in milliseconds
   * @param {Function} options.onDeviceFound - Callback for when device is found
   * @returns {Promise<void>}
   */
  async startScanning({ serviceUUIDs = [], scanTimeout = 10000, onDeviceFound = () => {} }) {
    if (this.isScanning) {
      console.log('Already scanning, stopping previous scan...');
      this.stopScanning();
    }

    try {
      // Ensure Bluetooth is enabled and permissions are granted
      const hasPermissions = await this.requestPermissions();
      const isEnabled = await this.enableBluetooth();

      if (!hasPermissions || !isEnabled) {
        console.error('Cannot scan: Bluetooth permissions denied or Bluetooth disabled');
        return;
      }

      this.isScanning = true;

      // Set timeout to stop scanning after specified time
      if (scanTimeout > 0) {
        setTimeout(() => {
          if (this.isScanning) {
            this.stopScanning();
          }
        }, scanTimeout);
      }

      // Start scanning
      this.bleManager.startDeviceScan(
        serviceUUIDs.length > 0 ? serviceUUIDs : null,
        null,
        (error, device) => {
          if (error) {
            console.error('Scan error:', error);
            this.stopScanning();
            return;
          }

          if (device) {
            onDeviceFound(device);
          }
        }
      );
    } catch (error) {
      console.error('Error starting BLE scan:', error);
      this.isScanning = false;
    }
  }

  /**
   * Stop scanning for BLE devices
   */
  stopScanning() {
    if (this.isScanning) {
      this.bleManager.stopDeviceScan();
      this.isScanning = false;
      console.log('BLE scanning stopped');
    }
  }

  /**
   * Scan for a specific BLE device by name pattern
   * @param {RegExp} namePattern - Regular expression to match device name
   * @param {number} timeout - Scan timeout in milliseconds
   * @returns {Promise<Array>} - Array of matching devices
   */
  async scanForSpecificDevices(namePattern, timeout = 10000) {
    return new Promise(async (resolve) => {
      const devices = new Map();
      
      await this.startScanning({
        scanTimeout: timeout,
        onDeviceFound: (device) => {
          const deviceName = device.name || device.localName || '';
          if (deviceName && namePattern.test(deviceName)) {
            devices.set(device.id, device);
          }
        }
      });
      
      // After timeout, resolve with the devices found
      setTimeout(() => {
        this.stopScanning();
        resolve(Array.from(devices.values()));
      }, timeout);
    });
  }

  /**
   * Connect to a BLE device
   * @param {string} deviceId - The ID of the device to connect to
   * @returns {Promise<Object>} - The connected device
   */
  async connectToDevice(deviceId) {
    try {
      const device = await this.bleManager.connectToDevice(deviceId);
      this.connectedDevice = device;
      
      // Discover all services and characteristics
      await device.discoverAllServicesAndCharacteristics();
      
      console.log(`Connected to device: ${device.name || device.id}`);
      return device;
    } catch (error) {
      console.error(`Error connecting to device ${deviceId}:`, error);
      throw error;
    }
  }

  /**
   * Disconnect from currently connected device
   * @returns {Promise<void>}
   */
  async disconnectDevice() {
    if (this.connectedDevice) {
      try {
        await this.connectedDevice.cancelConnection();
        console.log(`Disconnected from device: ${this.connectedDevice.name || this.connectedDevice.id}`);
        this.connectedDevice = null;
      } catch (error) {
        console.error('Error disconnecting device:', error);
        throw error;
      }
    }
  }

  /**
   * Write a message to a BLE characteristic
   * @param {string} serviceUUID - Service UUID
   * @param {string} characteristicUUID - Characteristic UUID
   * @param {string | ArrayBuffer} message - The message to send
   * @param {boolean} withResponse - Whether to expect a response
   * @returns {Promise<Characteristic>} - The written characteristic
   */
  async writeToCharacteristic(serviceUUID, characteristicUUID, message, withResponse = true) {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      // Convert string message to base64 if it's a string
      let valueToWrite;
      if (typeof message === 'string') {
        valueToWrite = btoa(message);
      } else {
        // Handle ArrayBuffer or other binary formats
        valueToWrite = message;
      }

      // Write to the device
      const characteristic = await this.connectedDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        valueToWrite
      );
      
      console.log(`Message written to ${serviceUUID}:${characteristicUUID}`);
      return characteristic;
    } catch (error) {
      console.error('Error writing to characteristic:', error);
      throw error;
    }
  }

  /**
   * Read value from a BLE characteristic
   * @param {string} serviceUUID - Service UUID
   * @param {string} characteristicUUID - Characteristic UUID
   * @returns {Promise<string>} - The read value
   */
  async readCharacteristic(serviceUUID, characteristicUUID) {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      const characteristic = await this.connectedDevice.readCharacteristicForService(
        serviceUUID,
        characteristicUUID
      );
      
      return characteristic.value;
    } catch (error) {
      console.error('Error reading characteristic:', error);
      throw error;
    }
  }

  /**
   * Subscribe to characteristic notifications
   * @param {string} serviceUUID - Service UUID
   * @param {string} characteristicUUID - Characteristic UUID
   * @param {Function} listener - Callback function for notifications
   * @returns {Promise<Function>} - Unsubscribe function
   */
  async subscribeToCharacteristic(serviceUUID, characteristicUUID, listener) {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      // Enable notifications
      await this.connectedDevice.monitorCharacteristicForService(
        serviceUUID,
        characteristicUUID,
        (error, characteristic) => {
          if (error) {
            console.error('Notification error:', error);
            return;
          }
          
          listener(characteristic.value);
        }
      );
      
      console.log(`Subscribed to ${serviceUUID}:${characteristicUUID}`);
      
      // Return function to unsubscribe
      return () => {
        this.connectedDevice.cancelTransaction('monitor');
        console.log(`Unsubscribed from ${serviceUUID}:${characteristicUUID}`);
      };
    } catch (error) {
      console.error('Error subscribing to characteristic:', error);
      throw error;
    }
  }

  /**
   * Check if a device is currently connected
   * @param {string} [deviceId] - Optional device ID to check specific device
   * @returns {Promise<boolean>} - True if device is connected
   */
  async isDeviceConnected(deviceId = null) {
    try {
      // If we're checking a specific device
      if (deviceId) {
        const device = await this.bleManager.devices([deviceId]);
        if (device && device.length > 0) {
          return device[0].isConnected();
        }
        return false;
      }
      
      // Check if we have any connected device
      if (this.connectedDevice) {
        return await this.connectedDevice.isConnected();
      }
      
      return false;
    } catch (error) {
      console.error('Error checking device connection:', error);
      return false;
    }
  }

  /**
   * Clean up BLE manager resources
   */
  destroy() {
    if (this.connectedDevice) {
      this.disconnectDevice();
    }
    
    this.stopScanning();
    this.bleManager.destroy();
  }
}

export default BleService;
