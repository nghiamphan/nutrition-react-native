import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'

/**
 * Draw a line, which is divided into equal length segments with different colors. The line is used to visually compare a value with a range.
 * @param {number} value - The value to pinpoint on the line.
 * @param {{Array<number>}} valuesToDisplay - The values to display on the start of each segment. The last value is the end of the line.
 * @param {Array<string>} colors - The colors to use for the segments. Note that the number of colors should be one less than the number of values to display.
 */
export default ColoredLine = ({ value, valuesToDisplay, colors }) => {
    const [lineLength, setLineLength] = useState(0)

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout
        setLineLength(width)
    }

    const ICON_SIZE = 10

    const nSegments = valuesToDisplay.length - 1
    const segmentLength = lineLength / nSegments

    /*
    Calculate the position and color of the icon, which represents the value on the line.
    First, initiate the position and color at the end of the line to represent the case when value is greater than the last value to display.
    Then, iterate over the list of values to display and find the segment where the value belongs.
    */
    let iconPosition = lineLength - ICON_SIZE / 2
    let iconColor = colors[nSegments - 1]

    for (let i = 0; i < nSegments; i++) {
        if (value <= valuesToDisplay[i + 1]) {
            iconColor = colors[i]
            postionWithSegment =
                ((value - valuesToDisplay[i]) / (valuesToDisplay[i + 1] - valuesToDisplay[i])) *
                segmentLength
            iconPosition = segmentLength * i + postionWithSegment - ICON_SIZE / 2
            break
        }
    }

    return (
        <View onLayout={handleLayout} style={{ width: '95%' }}>
            <View style={{ width: ICON_SIZE, left: iconPosition }}>
                <Icon source="diamond" color={iconColor} size={ICON_SIZE} />
            </View>

            <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: nSegments }).map((_, i) => (
                    <View key={i} style={[styles.line, { backgroundColor: colors[i] }]} />
                ))}
            </View>

            <View style={{ flexDirection: 'row', left: -segmentLength / 2 }}>
                {valuesToDisplay.map((val, index) => (
                    <View key={index} style={{ alignItems: 'center', width: segmentLength }}>
                        <Text variant="bodySmall" style={{ color: 'gray' }}>
                            {val}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

styles = StyleSheet.create({
    line: {
        flex: 1,
        height: 5,
    },
})
