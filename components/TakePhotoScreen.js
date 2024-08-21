import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CameraView } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { postPhotos } from '../services/product'
import AskCameraPermission from './AskCameraPermission'

export default TakePhotoScreen = () => {
    const cameraPermission = useSelector((state) => state.cameraPermission)
    const nutritionProfile = useSelector((state) => state.nutritionProfile)

    const cameraRef = useRef(null)

    const [photos, setPhotos] = useState([])
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
                setPhotos((prevPhotos) => [...prevPhotos.slice(-1), photoData])
            } catch (error) {
                alert(error)
            }
        }
    }

    const submitPhotos = async () => {
        if (photos.length > 0) {
            try {
                setResultShown(true)
                const response = await postPhotos(photos, nutritionProfile)

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
                <Image
                    source={{ uri: photos.length > 0 ? photos[photos.length - 1].uri : null }}
                    style={styles.previewImage}
                />

                <IconButton
                    icon="circle-outline"
                    size={75}
                    onPress={takePhoto}
                    style={styles.cameraButton}
                />

                <Button
                    mode="contained"
                    onPress={submitPhotos}
                    disabled={photos.length === 0}
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
