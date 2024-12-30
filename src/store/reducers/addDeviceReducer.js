import { ADD_DEVICE_FLOW_INITIATED, ADD_DEVICE_FLOW_CLOSED, SELECT_DEVICE_TO_CONFIG } from "../actions/addDeviceAction";

const initialAddDeviceState = {
    isAddDeviceFlowEnables: false,
    selectedRoom: {},
    selectedDevice: {}
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
        default:
            return {...state}
    }
}