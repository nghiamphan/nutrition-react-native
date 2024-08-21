import axios from 'axios'
import Constants from 'expo-constants'

const BASE_URL = `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:8000/api/`

/**
 * Fetch product details by barcode.
 *
 * @param {string} barcode - The barcode of the product.
 * @param {Object} nutritionProfile - The nutrition profile of the product.
 * @returns {Promise<Object>} The response from the API.
 */
const fetchProduct = async (barcode, nutritionProfile) => {
    const url = `${BASE_URL}barcode/${barcode}/`

    const response = await axios.post(url, nutritionProfile)
    const data = response.data

    return data
}

/**
 * Submit 1 or 2 photos to the server.
 *
 * @param {string} foodType - The type of food to post.
 * @param {Array<Object>} photos - The list of photos to post.
 * @param {Object} nutritionProfile - The nutrition profile of the product.
 * @returns {Promise<Object>} The response from the API.
 */
const postPhotos = async (foodType, photos, nutritionProfile) => {
    const url = `${BASE_URL}image/`

    const formData = new FormData()
    formData.append('images', {
        uri: photos[0].uri,
        name: 'nutrition_label.jpg',
        type: 'image/jpeg',
    })

    if (photos.length > 1) {
        formData.append('images', {
            uri: photos[1].uri,
            name: 'ingredients.jpg',
            type: 'image/jpeg',
        })
    }

    formData.append('food_type', foodType)
    formData.append('nutritionProfile', JSON.stringify(nutritionProfile))

    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    const data = response.data
    return data
}

export { fetchProduct, postPhotos }
