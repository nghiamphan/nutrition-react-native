import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { configureStore } from '@reduxjs/toolkit'
import { StatusBar } from 'expo-status-bar'

import { Provider } from 'react-redux'
import ResultModal from './components/ResultModal'
import ScanScreen from './components/ScanScreen'
import TakePhotoScreen from './components/TakePhotoScreen'
import navigationTabReducer, {
    changeTab,
    SCAN_SCREEN,
    TAKE_PHOTO_SCREEN,
} from './reducers/navigationTabReducer'

const store = configureStore({
    reducer: {
        navigationTab: navigationTabReducer,
    },
})

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                    title: 'Scan  Product Barcode',
                }}
                listeners={{
                    tabPress: (e) => {
                        store.dispatch(changeTab(SCAN_SCREEN))
                    },
                }}
            />
            <Tab.Screen
                name="Photo"
                component={TakePhotoScreen}
                options={{
                    title: 'Take Label Photo',
                }}
                listeners={{
                    tabPress: (e) => {
                        store.dispatch(changeTab(TAKE_PHOTO_SCREEN))
                    },
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
