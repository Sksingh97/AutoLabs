export const ADD_DEVICE_FLOW_INITIATED = 'ADD_DEVICE_FLOW_INITIATED'
export const ADD_DEVICE_FLOW_CLOSED = 'ADD_DEVICE_FLOW_CLOSED'
export const SELECT_DEVICE_TO_CONFIG = 'SELECT_DEVICE_TO_CONFIG'


export const initiateAddDeviceFlow = (selectedRoom) => ({ type: ADD_DEVICE_FLOW_INITIATED, payload: {selectedRoom} });
export const closeAddDeviceFlow = () => ({ type: ADD_DEVICE_FLOW_CLOSED, payload: {} });
export const selectDeviceToConfig = (device) => ({ type: SELECT_DEVICE_TO_CONFIG, payload: {device}})