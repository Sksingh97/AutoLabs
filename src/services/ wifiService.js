import WifiManager from 'react-native-wifi-reborn';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, Alert } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

class WifiService {
    constructor() {
        this.wifiManager = WifiManager;
    }

    /**
     * Checks if the required permission is granted.
     * @returns {Promise<boolean>} - True if permission is granted, false otherwise.
     */
    async checkPermission() {
        const permission =
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

        const result = await check(permission);
        return result === RESULTS.GRANTED;
    }

    /**
     * Requests the necessary permissions for Wi-Fi access.
     * @returns {Promise<boolean>} - True if permission is granted after request, false otherwise.
     */
    async requestPermission() {
        const permission =
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

        const result = await request(permission);
        return result === RESULTS.GRANTED;
    }

    /**
     * Checks if location services are enabled and prompts the user to enable them if not.
     * @returns {Promise<boolean>} - True if location services are enabled, false otherwise.
     */
    async ensureLocationEnabled() {
        if (Platform.OS === 'android') {
            try {
                const result = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
                    message: `
                        <h2>Enable Location</h2>
                        <p>Location services are required to scan and connect to Wi-Fi networks. Please enable them.</p>
                    `,
                    ok: 'Enable',
                    cancel: 'Cancel',
                }).then((status) => status.enabled);

                return result;
            } catch (error) {
                console.error('Error checking location services:', error);
                return false;
            }
        } else {
            // iOS doesn't support programmatic enabling of location services
            Alert.alert(
                'Location Services Disabled',
                'Please enable location services in settings.',
                [{ text: 'OK' }]
            );
            return false;
        }
    }

    /**
     * Scans for available Wi-Fi networks.
     * @returns {Promise<Array>} - List of available Wi-Fi networks.
     */
    async scanWifiNetworks() {
        try {
            const networks = await this.wifiManager.reScanAndLoadWifiList();
            if(Array.isArray(networks)){
                return networks
            }
            throw Error(networks)
        } catch (error) {
            console.error('Error scanning Wi-Fi networks:', error);
            return [];
        }
    }

    /**
     * Scans for a specific Wi-Fi network matching a given pattern.
     * @param {RegExp} pattern - The pattern to match the Wi-Fi name (SSID).
     * @returns {Promise<Object|null>} - Details of the matched Wi-Fi network or null if not found.
     */
    async scanForSpecificWifi() {
        // const regex = /^AUTO-LABS-/;
        const regex = /^Auto-Labs-/;
        try {
            const networks = await this.scanWifiNetworks();
            return networks.filter((network) => regex.test(network.SSID)) || [];
        } catch (error) {
            console.error('Error scanning for specific Wi-Fi:', error);
            return null;
        }
    }

    /**
     * Establishes a connection with the specified Wi-Fi network.
     * @param {string} ssid - The SSID of the Wi-Fi network.
     * @param {string} password - The password for the Wi-Fi network.
     * @returns {Promise<boolean>} - True if connection is successful, false otherwise.
     */
    async connectToWifi(ssid, password) {
        try {
            await this.wifiManager.connectToProtectedSSID(ssid, password, false, false);
            console.log(`Connected to Wi-Fi: ${ssid}`);
            return true;
        } catch (error) {
            console.error(`Error connecting to Wi-Fi: ${ssid}`, error);
            return false;
        }
    }

    /**
     * Disconnects from the current Wi-Fi network.
     * @returns {Promise<void>}
     */
    async disconnectFromWifi() {
        try {
            await this.wifiManager.disconnect();
            console.log('Disconnected from Wi-Fi.');
        } catch (error) {
            console.error('Error disconnecting from Wi-Fi:', error);
        }
    }
}

export default WifiService;
