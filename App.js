import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'

import ResultModal from './components/ResultModal'
import ScanScreen from './components/ScanScreen'

const Stack = createNativeStackNavigator()

export default App = () => {
    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Group>
                        <Stack.Screen
                            name="ScanScreen"
                            component={ScanScreen}
                            options={{
                                title: 'Scan  Product Barcode',
                            }}
                        />
                    </Stack.Group>

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
