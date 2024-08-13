import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CameraView } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { postPhoto } from '../services/product'
import AskCameraPermission from './AskCameraPermission'

export default TakePhotoScreen = () => {
    const cameraPermission = useSelector((state) => state.cameraPermission)
    const nutritionProfile = useSelector((state) => state.nutritionProfile)

    const cameraRef = useRef(null)

    const [photo, setPhoto] = useState(null)
    const [resultShown, setResultShown] = useState(false)

    const isFocused = useIsFocused()
    const navigation = useNavigation()

    useEffect(() => {
        const dismissResultModal = navigation.addListener('focus', () => {
            setResultShown(false)
        })

        dismissResultModal
    }, [navigation])

    if (cameraPermission === 'denied') {
        return <AskCameraPermission permissionAlert={false} />
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
                setResultShown(true)
                const response = await postPhoto(photo, nutritionProfile)

                navigation.navigate('ResultModal', { product: response })
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {(isFocused || resultShown) && <CameraView ref={cameraRef} style={styles.camera} />}

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
