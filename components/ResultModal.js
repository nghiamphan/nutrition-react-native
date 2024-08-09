import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

import * as C from '../utils/Constants'
import ColoredLine from './ColoredLine'

export default ResultModal = ({ route }) => {
    const {
        name,
        brand,
        image,
        ingredients,
        nutriscore_scaled_100,
        additives,
        additives_risk,
        organic,
        final_score,
        food_type,
        energy,
        energy_from_saturates,
        saturated_fat,
        saturates_over_total_fat,
        sugars,
        non_nutritive_sweeteners,
        sodium,
        protein,
        fiber,
        fruit_vegetables_legumes_percentage,
    } = route.params.product

    let finalSscoreColor
    switch (true) {
        case final_score >= 75:
            finalSscoreColor = C.NEGATIVE_COLORS[0]
            break
        case final_score >= 50:
            finalSscoreColor = C.NEGATIVE_COLORS[1]
            break
        case final_score >= 25:
            finalSscoreColor = C.NEGATIVE_COLORS[2]
            break
        default:
            finalSscoreColor = C.NEGATIVE_COLORS[3]
    }

    positiveComponentsToDisplay = []
    negativeComponentsToDisplay = []

    // Calories
    if (food_type == C.FATS_NUTS_SEEDS) {
        const caloriesParams = {
            name: 'Calories from saturates',
            value: energy_from_saturates,
            thresholdList: C.ENERGY_FROM_SATURATES_THRESHOLD,
        }

        if (energy_from_saturates <= C.ENERGY_FROM_SATURATES_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(caloriesParams)
        } else {
            negativeComponentsToDisplay.push(caloriesParams)
        }
    } else if (food_type == C.BEVERAGES) {
        const caloriesParams = {
            name: 'Calories',
            value: energy,
            thresholdList: C.ENERGY_BEVERAGES_THRESHOLD,
        }

        if (energy <= C.ENERGY_BEVERAGES_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(caloriesParams)
        } else {
            negativeComponentsToDisplay.push(caloriesParams)
        }
    } else {
        const caloriesParams = {
            name: 'Calories',
            value: energy,
            thresholdList: C.ENERGY_THRESHOLD,
        }

        if (energy <= C.ENERGY_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(caloriesParams)
        } else {
            negativeComponentsToDisplay.push(caloriesParams)
        }
    }

    // Saturated Fat or Saturates over Total Fat
    if (food_type == C.FATS_NUTS_SEEDS) {
        const fatParams = {
            name: 'Saturates over total fat (%)',
            value: saturates_over_total_fat,
            thresholdList: C.SATURATES_OVER_TOTAL_FAT_THRESHOLD,
        }

        if (saturated_fat <= C.SATURATES_OVER_TOTAL_FAT_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(fatParams)
        } else {
            negativeComponentsToDisplay.push(fatParams)
        }
    } else {
        const fatParams = {
            name: 'Saturated Fat (g)',
            value: saturated_fat,
            thresholdList: C.SATURATED_FAT_THRESHOLD,
        }

        if (saturated_fat <= C.SATURATED_FAT_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(fatParams)
        } else {
            negativeComponentsToDisplay.push(fatParams)
        }
    }

    // Sugars
    if (food_type == C.BEVERAGES) {
        const sugarsParams = {
            name: 'Sugars (g)',
            value: sugars,
            thresholdList: C.SUGARS_BEVERAGES_THRESHOLD,
        }

        if (sugars <= C.SUGARS_BEVERAGES_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(sugarsParams)
        } else {
            negativeComponentsToDisplay.push(sugarsParams)
        }
    } else {
        const sugarsParams = {
            name: 'Sugars (g)',
            value: sugars,
            thresholdList: C.SUGARS_THRESHOLD,
        }

        if (sugars <= C.SUGARS_THRESHOLD[2]) {
            positiveComponentsToDisplay.push(sugarsParams)
        } else {
            negativeComponentsToDisplay.push(sugarsParams)
        }
    }

    // Sodium
    const sodiumParams = {
        name: 'Sodium (g)',
        value: sodium,
        thresholdList: C.SODIUM_THRESHOLD,
    }

    if (sodium <= C.SODIUM_THRESHOLD[2]) {
        positiveComponentsToDisplay.push(sodiumParams)
    } else {
        negativeComponentsToDisplay.push(sodiumParams)
    }

    // Protein
    if (food_type == C.BEVERAGES) {
        const proteinParams = {
            name: 'Protein (g)',
            value: protein,
            thresholdList: C.PROTEIN_BEVERAGES_THRESHOLD,
        }

        if (protein > 0) {
            positiveComponentsToDisplay.push(proteinParams)
        }
    } else {
        const proteinParams = {
            name: 'Protein (g)',
            value: protein,
            thresholdList: C.PROTEIN_THRESHOLD,
        }

        if (protein > 0) {
            positiveComponentsToDisplay.push(proteinParams)
        }
    }

    // Fiber
    const fiberParams = {
        name: 'Fiber (g)',
        value: fiber,
        thresholdList: C.FIBER_THRESHOLD,
    }
    if (fiber > 0) {
        positiveComponentsToDisplay.push(fiberParams)
    }

    // Fruit, Vegetables, Legumes percentage
    if (food_type == C.BEVERAGES) {
        const fruitParams = {
            name: 'Fruit, Vegetables, Legumes (%)',
            value: fruit_vegetables_legumes_percentage,
            thresholdList: C.FRUITS_BEVERAGES_THRESHOLD,
        }

        if (fruit_vegetables_legumes_percentage >= C.FRUITS_BEVERAGES_THRESHOLD[0]) {
            positiveComponentsToDisplay.push(fruitParams)
        }
    } else {
        const fruitParams = {
            name: 'Fruit, Vegetables, Legumes (%)',
            value: fruit_vegetables_legumes_percentage,
            thresholdList: C.FRUIT_THRESHOLD,
        }

        if (fruit_vegetables_legumes_percentage >= C.FRUIT_THRESHOLD[0]) {
            positiveComponentsToDisplay.push(fruitParams)
        }
    }

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', margin: 10, marginBottom: 0 }}>
                <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />

                <View>
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
                        {name}
                    </Text>
                    <Text variant="labelLarge" style={{ color: 'gray' }}>
                        {brand}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Icon source="checkbox-blank-circle" color={finalSscoreColor} size={20} />
                        <Text variant="headlineSmall" style={{ marginLeft: 10 }}>
                            {final_score}/100
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ margin: 20 }}>
                <View style={styles.horizontalSpaceBetween}>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                        Negatives
                    </Text>
                    <Text variant="labelMedium" style={{ color: 'gray' }}>
                        per 100g
                    </Text>
                </View>

                {/* <Text>Additives</Text>
                <Text>{additives}</Text> */}

                <View>
                    {negativeComponentsToDisplay.map((component, index) => (
                        <NutritionComponent
                            key={index}
                            name={component.name}
                            value={component.value}
                            thresholdList={component.thresholdList}
                        />
                    ))}
                </View>

                <View style={[styles.horizontalSpaceBetween, { marginTop: 20 }]}>
                    <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                        Positives
                    </Text>
                    <Text variant="labelMedium" style={{ color: 'gray' }}>
                        per 100g
                    </Text>
                </View>

                <View style={styles.vertical}>
                    {positiveComponentsToDisplay.map((component, index) => (
                        <NutritionComponent
                            key={index}
                            name={component.name}
                            value={component.value}
                            thresholdList={component.thresholdList}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

const NutritionComponent = ({ name, value, thresholdList }) => {
    if (thresholdList.length === 2) {
        colors = C.POSITIVE_COLORS
    } else {
        colors = C.NEGATIVE_COLORS
    }

    return (
        <View>
            <View style={[styles.horizontalSpaceBetween, { marginBottom: 5 }]}>
                <Text variant="titleMedium">{name}</Text>
                <Text variant="titleMedium" style={{ color: 'gray' }}>
                    {value}
                </Text>
            </View>
            <ColoredLine value={value} valuesToDisplay={thresholdList} colors={colors} />
        </View>
    )
}

const styles = StyleSheet.create({
    horizontalSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginEnd: 10,
    },
    image: {
        width: 150,
        height: undefined,
        aspectRatio: 1,
    },
})
