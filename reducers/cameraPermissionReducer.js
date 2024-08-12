import { createSlice } from '@reduxjs/toolkit'

const cameraPermissionReducer = createSlice({
    name: 'cameraPermission',
    initialState: null,
    reducers: {
        setPermission: (state, action) => action.payload,
    },
})

export const setCameraPermission = (permission) => {
    return async (dispatch) => {
        dispatch(cameraPermissionReducer.actions.setPermission(permission))
    }
}

export default cameraPermissionReducer.reducer
