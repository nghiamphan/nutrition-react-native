import { List } from '@ui-kitten/components'
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
                <Image source={{ uri: image ? image : null }} style={styles.image} resizeMode="contain" />

                <View>
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold', width: '75%' }}>
                        {name}
                    </Text>
                    <Text variant="labelLarge" style={{ color: 'gray', width: '99%' }}>
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
                {(additives.length > 0 || negativeComponentsToDisplay.length > 0) && (
                    <View style={styles.horizontalSpaceBetween}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                            Negatives
                        </Text>
                        <Text variant="labelMedium" style={{ color: 'gray' }}>
                            per 100g
                        </Text>
                    </View>
                )}

                {additives.length > 0 && <Additives additives={additives} />}

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

                {positiveComponentsToDisplay.length > 0 && (
                    <View style={[styles.horizontalSpaceBetween, { marginTop: 20 }]}>
                        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                            Positives
                        </Text>
                        <Text variant="labelMedium" style={{ color: 'gray' }}>
                            per 100g
                        </Text>
                    </View>
                )}

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

/**
 * @param {List[Object]} additives - List of additives which contains the e-number, name, type and risk level.
 */
const Additives = ({ additives }) => {
    // Sort additives by risk level from high to low
    const sortedAdditives = additives.sort((a, b) => b.risk - a.risk)

    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    return (
        <View>
            <Text variant="titleMedium">Additives</Text>
            {sortedAdditives.map((additive, index) => (
                <View key={index} style={styles.horizontalSpaceBetween}>
                    <View>
                        <Text variant="bodyMedium">{capitalizeWords(additive.name)}</Text>
                        <Text variant="labelSmall" style={{ color: 'gray' }}>
                            {capitalizeWords(additive.type)}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text variant="labelMedium" style={{ color: 'gray', marginRight: 5 }}>
                            {C.ADDITIVES_DESCRIPTORS[additive.risk]}
                        </Text>
                        <Icon
                            source="checkbox-blank-circle"
                            color={C.ADDITIVES_COLORS[additive.risk]}
                            size={10}
                        />
                    </View>
                </View>
            ))}
        </View>
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
            <View style={[styles.horizontalSpaceBetween, { marginBottom: 2 }]}>
                <Text variant="titleMedium">{name}</Text>
                <Text variant="titleMedium" style={{ color: 'gray' }}>
                    {Number.isInteger(parseFloat(value)) ? value : parseFloat(value).toFixed(1)}
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
        alignItems: 'center',
        marginTop: 10,
        marginEnd: 10,
    },
    image: {
        width: 120,
        height: undefined,
        aspectRatio: 1,
        marginRight: 10,
    },
})
