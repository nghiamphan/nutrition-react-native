import { useNavigation } from '@react-navigation/native'
import { Camera, CameraView } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { Button, IconButton, Snackbar, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { TAKE_PHOTO_SCREEN } from '../reducers/navigationTabReducer'
import { postPhoto } from '../services/product'

export default TakePhotoScreen = () => {
    const currentTab = useSelector((state) => state.navigationTab.currentTab)
    const [cameraPermission, setCameraPermission] = useState(null)
    const [cameraPermSnackbarVisible, setCameraPermSnackbarVisible] = useState(
        cameraPermission === 'denied'
    )
    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)

    const navigation = useNavigation()

    const getCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setCameraPermission(status)
        setCameraPermSnackbarVisible(status === 'denied')
    }

    useEffect(() => {
        getCameraPermission()
    }, [])

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

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const photoData = await cameraRef.current.takePictureAsync()
                setPhoto(photoData)
            } catch (error) {
                alert(error)
            }
        }
    }

    const submitPhoto = async () => {
        if (photo) {
            try {
                const response = await postPhoto(photo)

                navigation.navigate('ResultModal', { product: response })
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {currentTab === TAKE_PHOTO_SCREEN && <CameraView ref={cameraRef} style={styles.camera} />}

            <View style={styles.bottomContainer}>
                <Image source={{ uri: photo ? photo.uri : null }} style={styles.previewImage} />

                <IconButton
                    icon="circle-outline"
                    size={75}
                    onPress={takePhoto}
                    style={styles.cameraButton}
                />

                <Button
                    mode="contained"
                    onPress={submitPhoto}
                    disabled={!photo}
                    style={styles.submitButton}
                >
                    Submit
                </Button>
            </View>
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
    camera: {
        width: '100%',
        height: '85%',
    },
    bottomContainer: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    previewImage: {
        width: undefined,
        height: '90%',
        aspectRatio: 1,
    },
    cameraButton: {
        alignItems: 'center',
    },
    submitButton: {
        alignItems: 'flex-end',
    },
})
