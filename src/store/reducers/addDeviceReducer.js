import { ADD_DEVICE_FLOW_INITIATED, ADD_DEVICE_FLOW_CLOSED, SELECT_DEVICE_TO_CONFIG, GET_DEVICE_TYPE_SUCCESS, GET_DEVICE_TYPE_FAIL, SELECT_WIFI_TO_CONNECT, SELECT_DEVICE_TYPE, SET_WIFI_PASSWORD, SET_DEVICE_NAME, SET_APPLIANCE_NAME } from "../actions/addDeviceAction";

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
    error: null
}


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
            return {...state, deviceTypes: payload}
        case GET_DEVICE_TYPE_FAIL:
            return {...state, error: payload}
        default:
            return {...state}
    }
}