import { createSlice } from '@reduxjs/toolkit'
import { Camera } from 'expo-camera'

const cameraPermissionReducer = createSlice({
    name: 'cameraPermission',
    initialState: null,
    reducers: {
        setPermission: (state, action) => action.payload,
    },
})

export const setCameraPermission = () => {
    return async (dispatch) => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        dispatch(cameraPermissionReducer.actions.setPermission(status))
    }
}

export default cameraPermissionReducer.reducer
