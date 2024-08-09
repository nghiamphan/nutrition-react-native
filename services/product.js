import axios from 'axios'
import Constants from 'expo-constants'

/**
 * Fetch product details by barcode.
 *
 * @param {string} barcode - The barcode of the product.
 * @param {Object} nutritionProfile - The nutrition profile of the product.
 * @returns {Promise<Object>} The response from the API.
 */
const fetchProduct = async (barcode, nutritionProfile) => {
    const url = `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:8000/api/barcode/${barcode}/`

    const response = await axios.post(url, nutritionProfile)
    const data = response.data

    return data
}

export { fetchProduct }
