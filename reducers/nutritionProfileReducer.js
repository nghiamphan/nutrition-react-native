import { createSlice } from '@reduxjs/toolkit'

export const ENERGY_PROFILE_FACTOR = 'energy_profile_factor'
export const SATURATION_PROFILE_FACTOR = 'saturation_profile_factor'
export const SUGARS_PROFILE_FACTOR = 'sugars_profile_factor'
export const SODIUM_PROFILE_FACTOR = 'sodium_profile_factor'
export const MAX_ADDITIVES_PENALTY = 'max_additives_penalty'
export const NON_ORGANIC_PENALTY = 'non_organic_penalty'

const initialState = {
    ENERGY_PROFILE_FACTOR: 1,
    SATURATION_PROFILE_FACTOR: 1,
    SUGARS_PROFILE_FACTOR: 1,
    SODIUM_PROFILE_FACTOR: 1,
    MAX_ADDITIVES_PENALTY: 50,
    NON_ORGANIC_PENALTY: 10,
}

const nutritionProfileReducer = createSlice({
    name: 'nutritionProfile',
    initialState: initialState,
    reducers: {
        setNutritionProfile: (state, action) => action.payload,
    },
})

export const setNutritionProfile = (nutritionProfile) => {
    return (dispatch) => {
        dispatch(nutritionProfileReducer.actions.setNutritionProfile(nutritionProfile))
    }
}

export default nutritionProfileReducer.reducer
