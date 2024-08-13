import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { configureStore } from '@reduxjs/toolkit'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'

import NutritionProfileScreen from './components/NutritionProfileScreen'
import ResultModal from './components/ResultModal'
import ScanScreen from './components/ScanScreen'
import TakePhotoScreen from './components/TakePhotoScreen'
import cameraPermissionReducer from './reducers/cameraPermissionReducer'
import nutritionProfileReducer from './reducers/nutritionProfileReducer'

const store = configureStore({
    reducer: {
        cameraPermission: cameraPermissionReducer,
        nutritionProfile: nutritionProfileReducer,
    },
})

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Scan">
            <Tab.Screen
                name="Profile"
                component={NutritionProfileScreen}
                options={{
                    title: 'Preferences',
                }}
            />
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                    title: 'Scan  Product Barcode',
                }}
            />
            <Tab.Screen
                name="Photo"
                component={TakePhotoScreen}
                options={{
                    title: 'Take Label Photo',
                }}
            />
        </Tab.Navigator>
    )
}

export default App = () => {
    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen
                            name="ResultModal"
                            component={ResultModal}
                            options={{
                                title: 'Result',
                            }}
                        />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
