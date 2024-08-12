import { createSlice } from '@reduxjs/toolkit'

export const SCAN_SCREEN = 'ScanScreen'
export const TAKE_PHOTO_SCREEN = 'TakePhotoScreen'

const navigationTabReducer = createSlice({
    name: 'navigationTab',
    initialState: {
        currentTab: SCAN_SCREEN,
    },
    reducers: {
        setTab: (state, action) => {
            state.currentTab = action.payload
        },
    },
})

export const changeTab = (tab) => {
    return (dispatch) => {
        dispatch(setTab(tab))
    }
}

export const { setTab } = navigationTabReducer.actions
export default navigationTabReducer.reducer
