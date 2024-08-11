import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'

import ResultModal from './components/ResultModal'
import ScanScreen from './components/ScanScreen'
import TakePhotoScreen from './components/TakePhotoScreen'

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
        <>
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
        </>
    )
}
