import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CameraView } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { fetchProduct } from '../services/product'
import AskCameraPermission from './AskCameraPermission'

export default ScanScreen = () => {
    const cameraPermission = useSelector((state) => state.cameraPermission)

    const [scanned, setScanned] = useState(false)

    const isFocused = useIsFocused()
    const navigation = useNavigation()

    useEffect(() => {
        const dismissResultModal = navigation.addListener('focus', () => {
            setScanned(false)
        })

        dismissResultModal
    }, [navigation])

    if (cameraPermission === 'denied' || cameraPermission === null) {
        return <AskCameraPermission />
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            setScanned(true)
            response = await fetchProduct((barcode = data), {})

            navigation.navigate('ResultModal', { product: response })
        } catch (error) {
            if (error.response.status === 404) {
                Alert.alert('Error', error.response.data.error)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {(isFocused || scanned) && (
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['upc_a'],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            <Snackbar
                visible={scanned}
                onDismiss={() => setScanned(false)}
                action={{
                    label: 'Dismiss',
                    onPress: () => {},
                }}
            >
                Barcode scanned successfully
            </Snackbar>
        </View>
    )
}
