import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CameraView } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { Button, Dialog, IconButton, Portal, Provider, RadioButton } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { postPhotos } from '../services/product'
import * as C from '../utils/Constants'
import AskCameraPermission from './AskCameraPermission'

export default TakePhotoScreen = () => {
    const cameraPermission = useSelector((state) => state.cameraPermission)
    const nutritionProfile = useSelector((state) => state.nutritionProfile)

    const cameraRef = useRef(null)

    const [photos, setPhotos] = useState([])
    const [resultShown, setResultShown] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [selectedFoodType, setSelectedFoodType] = useState(C.GENERAL_FOOD)

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

    const onClickSubmit = () => {
        setDialogVisible(true)
    }

    const submitPhotos = async () => {
        setDialogVisible(false)
        if (photos.length > 0) {
            try {
                setResultShown(true)
                const response = await postPhotos(selectedFoodType, photos, nutritionProfile)

                navigation.navigate('ResultModal', { product: response })
            } catch (error) {
                Alert.alert('Error', error.message)
            }
        }
    }

    const ChooseFoodTypeDialog = () => {
        return (
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>Choose food type</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={(value) => setSelectedFoodType(value)}
                            value={selectedFoodType}
                        >
                            <RadioButton.Item label="General Food" value={C.GENERAL_FOOD} />
                            <RadioButton.Item label="Red Meat" value={C.RED_MEAT} />
                            <RadioButton.Item label="Cheese" value={C.CHEESE} />
                            <RadioButton.Item label="Fats, Oils, Nuts, Seeds" value={C.FATS_NUTS_SEEDS} />
                            <RadioButton.Item label="Beverages" value={C.BEVERAGES} />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)} textColor="red">
                            Cancel
                        </Button>
                        <Button onPress={submitPhotos}>Submit</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }

    return (
        <Provider>
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
                        onPress={onClickSubmit}
                        disabled={photos.length === 0}
                        style={styles.submitButton}
                    >
                        Submit
                    </Button>
                </View>

                <ChooseFoodTypeDialog />
            </View>
        </Provider>
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
