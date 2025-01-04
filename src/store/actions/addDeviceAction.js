export const ADD_DEVICE_FLOW_INITIATED = 'ADD_DEVICE_FLOW_INITIATED'
export const ADD_DEVICE_FLOW_CLOSED = 'ADD_DEVICE_FLOW_CLOSED'
export const SELECT_DEVICE_TO_CONFIG = 'SELECT_DEVICE_TO_CONFIG'
export const GET_DEVICE_TYPE_REQUEST = 'GET_DEVICE_TYPE_REQUEST'
export const GET_DEVICE_TYPE_SUCCESS = 'GET_DEVICE_TYPE_SUCCESS'
export const GET_DEVICE_TYPE_FAIL = 'GET_DEVICE_TYPE_FAIL'
export const SELECT_WIFI_TO_CONNECT = 'SELECT_WIFI_TO_CONNECT'
export const SELECT_DEVICE_TYPE = 'SELECT_DEVICE_TYPE'
export const SET_WIFI_PASSWORD = 'SET_WIFI_PASSWORD'
export const SET_DEVICE_NAME = 'SET_DEVICE_NAME'
export const SET_APPLIANCE_NAME = 'SET_APPLIANCE_NAME'


export const initiateAddDeviceFlow = (selectedRoom) => ({ type: ADD_DEVICE_FLOW_INITIATED, payload: {selectedRoom} });
export const closeAddDeviceFlow = () => ({ type: ADD_DEVICE_FLOW_CLOSED, payload: {} });
export const selectDeviceToConfig = (device) => ({ type: SELECT_DEVICE_TO_CONFIG, payload: {device}})
export const selectWifiToConnect = (name) => ({ type: SELECT_WIFI_TO_CONNECT, payload:{name} })
export const selectDeviceType = (deviceType) => ({ type: SELECT_DEVICE_TYPE, payload:deviceType })
export const setWifiToConnectPassword = (password) => ({ type: SET_WIFI_PASSWORD, payload: password })
export const setDeviceName = (name) => ({ type: SET_DEVICE_NAME, payload: name })
export const setApplianceNames = (names) => ({ type: SET_APPLIANCE_NAME, payload: names })


export const getDeviceTypeRequest = () => ({ type: GET_DEVICE_TYPE_REQUEST, payload: {} })
export const getDeviceTypeSuccess = (deviceTypes) => ({ type: GET_DEVICE_TYPE_SUCCESS, payload: deviceTypes })
export const getDeviceTypeFail = (error) => ({ type: GET_DEVICE_TYPE_FAIL, payload: error })