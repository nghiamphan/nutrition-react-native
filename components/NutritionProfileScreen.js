import * as eva from '@eva-design/eva'
import { ApplicationProvider, IndexPath, Select, SelectItem } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    Keyboard,
    KeyboardAvoidingView,
    LogBox,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { setNutritionProfile } from '../reducers/nutritionProfileReducer'

const radioOptions = [
    { label: 'Very Lax', value: 0.25 },
    { label: 'Lax', value: 0.5 },
    { label: 'Default', value: 1 },
    { label: 'Strict', value: 1.5 },
    { label: 'Very Strict', value: 2 },
]

export default NutritionProfileScreen = () => {
    LogBox.ignoreLogs([
        'Warning: MeasureElement: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
    ])

    const nutritionProfile = useSelector((state) => state.nutritionProfile)

    const dispatch = useDispatch()

    const [snackbarVisible, setSnackbarVisible] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            'CALORIES RESTRICTION': nutritionProfile.ENERGY_PROFILE_FACTOR,
            'SATURATION FAT RESTRICTION': nutritionProfile.SATURATION_PROFILE_FACTOR,
            'SUGAR RESTRICTION': nutritionProfile.SUGARS_PROFILE_FACTOR,
            'SODIUM RESTRICTION': nutritionProfile.SODIUM_PROFILE_FACTOR,
            'MAX ADDITIVES PENALTY': nutritionProfile.MAX_ADDITIVES_PENALTY,
            'NON ORGANIC PENALTY': nutritionProfile.NON_ORGANIC_PENALTY,
        },
    })

    const onSave = (data) => {
        dispatch(setNutritionProfile(data))
        setSnackbarVisible(true)
    }

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <View style={styles.container}>
                            {[
                                'CALORIES RESTRICTION',
                                'SATURATION FAT RESTRICTION',
                                'SUGAR RESTRICTION',
                                'SODIUM RESTRICTION',
                            ].map((field) => (
                                <View key={field} style={styles.inputContainer}>
                                    <Text>{field}</Text>
                                    <Controller
                                        control={control}
                                        name={field}
                                        render={({ field: { onChange, value } }) => {
                                            const selectedOption = radioOptions.find(
                                                (option) => option.value === value
                                            )
                                            return (
                                                <Select
                                                    selectedIndex={
                                                        new IndexPath(
                                                            radioOptions.findIndex(
                                                                (option) => option.value === value
                                                            )
                                                        )
                                                    }
                                                    onSelect={(index) =>
                                                        onChange(radioOptions[index.row].value)
                                                    }
                                                    value={selectedOption ? selectedOption.label : ''}
                                                >
                                                    {radioOptions.map((option, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            title={option.label}
                                                            value={option.value}
                                                        />
                                                    ))}
                                                </Select>
                                            )
                                        }}
                                    />
                                    {errors[field] && (
                                        <Text style={styles.errorText}>This field is required</Text>
                                    )}
                                </View>
                            ))}

                            <View style={styles.inputContainer}>
                                <Text>MAX ADDITIVES PENALTY</Text>
                                <Controller
                                    control={control}
                                    name="MAX ADDITIVES PENALTY"
                                    rules={{
                                        required: 'This field is required',
                                        min: { value: 0, message: 'Must be at least 0' },
                                        max: { value: 100, message: 'Cannot be larger than 100' },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(text) => onChange(parseInt(text, 10))}
                                            value={value ? value.toString() : '0'}
                                            keyboardType="number-pad"
                                            returnKeyType="done"
                                        />
                                    )}
                                />
                                {errors['MAX ADDITIVES PENALTY'] && (
                                    <Text style={styles.errorText}>
                                        {errors['MAX ADDITIVES PENALTY'].message}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text>NON ORGANIC PENALTY</Text>
                                <Controller
                                    control={control}
                                    name="NON ORGANIC PENALTY"
                                    rules={{
                                        required: 'This field is required',
                                        min: { value: 0, message: 'Must be at least 0' },
                                        max: { value: 100, message: 'Cannot be larger than 100' },
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={(text) => onChange(parseInt(text, 10))}
                                            value={value ? value.toString() : '0'}
                                            keyboardType="number-pad"
                                            returnKeyType="done"
                                        />
                                    )}
                                />
                                {errors['NON ORGANIC PENALTY'] && (
                                    <Text style={styles.errorText}>
                                        {errors['NON ORGANIC PENALTY'].message}
                                    </Text>
                                )}
                            </View>

                            <Button
                                mode="contained"
                                disabled={Object.keys(errors).length > 0}
                                onPress={handleSubmit(onSave)}
                            >
                                Save
                            </Button>

                            <View style={styles.snackbarContainer}>
                                <Snackbar
                                    visible={snackbarVisible}
                                    onDismiss={() => setSnackbarVisible(false)}
                                    action={{
                                        label: 'Dismiss',
                                        onPress: () => {},
                                    }}
                                    duration={3000}
                                >
                                    Preferences saved successfully!
                                </Snackbar>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ApplicationProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingLeft: 8,
    },
    errorText: {
        color: 'red',
    },
    snackbarContainer: {
        position: 'absolute',
        top: '12%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
})
