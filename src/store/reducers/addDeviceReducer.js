import { ADD_DEVICE_FLOW_INITIATED, ADD_DEVICE_FLOW_CLOSED, SELECT_DEVICE_TO_CONFIG, 
    GET_DEVICE_TYPE_SUCCESS, GET_DEVICE_TYPE_FAIL, SELECT_WIFI_TO_CONNECT, SELECT_DEVICE_TYPE, 
    SET_WIFI_PASSWORD, SET_DEVICE_NAME, SET_APPLIANCE_NAME, CREATE_DEVICE_SUCCESS, CREATE_DEVICE_FAIL, 
    SEND_DEVICE_CONFIG_SUCCESS, SEND_DEVICE_CONFIG_FAIL, UPDATE_STEP } from "../actions/addDeviceAction";

const initialAddDeviceState = {
    isAddDeviceFlowEnables: false,
    selectedRoom: {},
    selectedDevice: {},
    deviceTypes: [],
    wifiToConnect: "",
    selectedDeviceType: {},
    wifiPassword:"",
    deviceName: "",
    applianceName: [],
    createdDevice:{},
    step:0,
    error: null
}
// const initialAddDeviceState = {
//     "applianceName": ["Fan", "Light", "Ac", "Side Lamp"], 
//     "createdDevice": {"device_id": 5, "appliance": [15, 16, 17, 18], "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjV9.8as4PtRvLv1VShSX5rSkc7dnwqBosxARNZDFWatpodk"}, 
//     "deviceName": "Main Board", 
    // "deviceTypes": [{"input": 0, "name": "alpha", "output": 1}, {"input": 0, "name": "beta", "output": 2}, {"input": 0, "name": "gamma", "output": 4}], 
//     "error": null, 
//     "isAddDeviceFlowEnables": false, 
//     "selectedDevice": {"id": 0, "mac": "86:f3:eb:0a:9f:9f", "ssid": "AUTO-LABS-000001"}, 
//     "selectedDeviceType": {"input": 0, "name": "gamma", "output": 4}, 
//     "selectedRoom": {"appliance": [], "id": 1, "name": "BedRoom"}, 
//     "step": 1, 
//     "wifiPassword": "INventor@**7", 
//     "wifiToConnect": "E7-F2"
// }

export const addDeviceReducer = (state = initialAddDeviceState, action) => {
    console.log("Add Device Reducer: %j ", action)
    const {type, payload} = action
    switch (type) {
        case ADD_DEVICE_FLOW_INITIATED:
            return {...state, isAddDeviceFlowEnables: true, selectedRoom: payload.selectedRoom};
        case ADD_DEVICE_FLOW_CLOSED:
            return {...state, isAddDeviceFlowEnables: false};
        case SELECT_DEVICE_TO_CONFIG:
            return {...state, selectedDevice: payload.device};
        case SELECT_WIFI_TO_CONNECT:
            return {...state, wifiToConnect: payload.name};
        case SELECT_DEVICE_TYPE:
            return {...state, selectedDeviceType: payload}
        case SET_WIFI_PASSWORD:
            return {...state, wifiPassword: payload}
        case SET_DEVICE_NAME:
            return {...state, deviceName: payload}
        case SET_APPLIANCE_NAME:
            return {...state, applianceName: payload}
        case GET_DEVICE_TYPE_SUCCESS:
            console.log("Device Types: %j", payload)
            return {...state, deviceTypes: payload}
        case CREATE_DEVICE_SUCCESS:
            return {...state, createdDevice: payload.device, step: payload.step}
        case SEND_DEVICE_CONFIG_SUCCESS:
            return {...state, step: state.step + 1}
        case UPDATE_STEP:
            return {...state, step: payload.step}
        case CREATE_DEVICE_FAIL:
        case GET_DEVICE_TYPE_FAIL:
        case SEND_DEVICE_CONFIG_FAIL:
            return {...state, error: payload}
        default:
            return {...state}
    }
}