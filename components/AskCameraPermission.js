import { Camera } from 'expo-camera'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { setCameraPermission } from '../reducers/cameraPermissionReducer'

export default AskCameraPermission = ({ permissionAlert }) => {
    const dispatch = useDispatch()
    const [cameraPermSnackbarVisible, setCameraPermSnackbarVisible] = useState(false)

    const getCameraPermission = async (permissionAlert = true) => {
        if (permissionAlert) {
            const { status } = await Camera.requestCameraPermissionsAsync()
            dispatch(setCameraPermission(status))
            setCameraPermSnackbarVisible(status === 'denied')
        }
    }

    useEffect(() => {
        getCameraPermission(permissionAlert)
    }, [])

    return (
        <View style={styles.column}>
            <Text variant="titleMedium">No access to camera</Text>
            <Button mode="contained" icon="camera" onPress={getCameraPermission} style={{ marginTop: 20 }}>
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

const styles = StyleSheet.create({
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 20,
    },
})
