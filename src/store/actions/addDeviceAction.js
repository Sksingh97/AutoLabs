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
export const CREATE_DEVICE_REQUEST = 'CREATE_DEVICE_REQUEST'
export const CREATE_DEVICE_SUCCESS = 'CREATE_DEVICE_SUCCESS'
export const CREATE_DEVICE_FAIL = 'CREATE_DEVICE_FAIL'
export const SEND_DEVICE_CONFIG_REQUEST = 'SEND_DEVICE_CONFIG_REQUEST'
export const SEND_DEVICE_CONFIG_SUCCESS = 'SEND_DEVICE_CONFIG_SUCCESS'
export const SEND_DEVICE_CONFIG_FAIL = 'SEND_DEVICE_CONFIG_FAIL'
export const UPDATE_STEP = 'UPDATE_STEP'


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

export const createDeviceRequest = (data, step) => ({ type: CREATE_DEVICE_REQUEST, payload: {data, nextStep:step} })
export const createDeviceSuccess = (device, step) => ({ type: CREATE_DEVICE_SUCCESS, payload: {device,step} })
export const createDeviceFail = (error) => ({ type: CREATE_DEVICE_FAIL, payload: error })

export const sendDeviceConfigRequest = (data) => ({ type: SEND_DEVICE_CONFIG_REQUEST, payload: {data} })
export const sendDeviceConfigSuccess = () => ({ type: SEND_DEVICE_CONFIG_SUCCESS, payload: {} })
export const sendDeviceConfigFail = (error) => ({ type: SEND_DEVICE_CONFIG_FAIL, payload: error })

export const updateStep = (step) => ({ type: UPDATE_STEP, payload: {step} })