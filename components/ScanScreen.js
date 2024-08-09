import { useNavigation } from '@react-navigation/native'
import { Camera, CameraView } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text } from 'react-native-paper'

import { fetchProduct } from '../services/product'

export default ScanScreen = () => {
    const [cameraPermission, setCameraPermission] = useState(null)
    const [cameraPermSnackbarVisible, setCameraPermSnackbarVisible] = useState(
        cameraPermission === 'denied'
    )
    const [scanned, setScanned] = useState(false)

    const navigation = useNavigation()

    const getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setCameraPermission(status)
        setCameraPermSnackbarVisible(status === 'denied')
    }

    useEffect(() => {
        getCameraPermission()
    }, [])

    useEffect(() => {
        const dismissResultModal = navigation.addListener('focus', () => {
            setScanned(false)
        })

        dismissResultModal
    }, [navigation])

    if (cameraPermission === null) {
        return (
            <View style={styles.row}>
                <Text variant="titleMedium">Requesting for camera permission</Text>
            </View>
        )
    }

    if (cameraPermission === 'denied') {
        return (
            <View style={styles.column}>
                <Text variant="titleMedium">No access to camera</Text>
                <Button
                    mode="contained"
                    icon="camera"
                    onPress={getCameraPermission}
                    style={{ marginTop: 20 }}
                >
                    Allow Camera Access
                </Button>
                <Snackbar
                    visible={cameraPermSnackbarVisible}
                    onDismiss={() => setCameraPermSnackbarVisible(false)}
                    action={{
                        label: 'Dismiss',
                        onPress: () => {},
                    }}
                >
                    Make sure the setting app allows this app to use camera
                </Snackbar>
            </View>
        )
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            setScanned(true)
            response = await fetchProduct((barcode = data), {})

            navigation.navigate('ResultModal', { product: response })
        } catch (error) {
            alert(error, data)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['upc_a'],
                }}
                style={StyleSheet.absoluteFillObject}
            />
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

const styles = StyleSheet.create({
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
})
