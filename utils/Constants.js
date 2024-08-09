// Food types
export const GENERAL_FOOD = 'general_food'
export const RED_MEAT = 'red_meat'
export const CHEESE = 'cheese'
export const FATS_NUTS_SEEDS = 'fats_oils_nuts_seeds'
export const BEVERAGES = 'beverages'
export const WATER = 'water'

// Component names
export const ENERGY = 'energy'
export const ENERGY_FROM_SATURATES = 'energy_from_saturates'
export const SATURATED_FAT = 'saturated_fat'
export const SATURATES_OVER_TOTAL_FAT = 'saturates_over_total_fat'
export const SUGARS = 'sugars'
export const NN_SWEETENERS = 'non_nutritive_sweeteners'
export const SODIUM = 'sodium'
export const PROTEIN = 'protein'
export const FIBER = 'fiber'
export const FRUIT_PERCENTAGE = 'fruit_vegetables_legumes_percentage'

// Negative component thresholds
export const ENERGY_THRESHOLD = [0, 335, 1005, 2010, 3350]
export const SATURATED_FAT_THRESHOLD = [0, 1, 3, 6, 10]
export const SUGARS_THRESHOLD = [0, 3.4, 10, 20, 51]
export const SODIUM_THRESHOLD = [0, 0.2, 0.6, 1.2, 4]

export const ENERGY_FROM_SATURATES_THRESHOLD = [0, 120, 360, 720, 1200]
export const SATURATES_OVER_TOTAL_FAT_THRESHOLD = [0, 10, 22, 40, 64]

export const ENERGY_BEVERAGES_THRESHOLD = [0, 30, 150, 270, 390]
export const SUGARS_BEVERAGES_THRESHOLD = [0, 0.5, 3.5, 7, 11]

// Positive component thresholds
export const PROTEIN_THRESHOLD = [0, 4.8, 17]
export const FIBER_THRESHOLD = [0, 4.1, 7.4]
export const FRUIT_THRESHOLD = [40, 80, 100]

export const PROTEIN_BEVERAGES_THRESHOLD = [0, 1.5, 3.0]
export const FRUITS_BEVERAGES_THRESHOLD = [40, 80, 100]

export const NEGATIVE_COLORS = ['green', 'lightgreen', 'orange', 'red'] // Colors for negative components
export const POSITIVE_COLORS = ['lightgreen', 'green'] // Colors for positive components
