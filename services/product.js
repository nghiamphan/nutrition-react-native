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
 * Submit a photo to the server.
 *
 * @param {Object} photo - The photo to post.
 * @returns {Promise<Object>} The response from the API.
 */
const postPhoto = async (photo) => {
    const url = `${BASE_URL}image/`

    const formData = new FormData()
    formData.append('image', {
        uri: photo.uri,
        name: 'nutrition_label.jpg',
        type: 'image/jpeg',
    })

    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    const data = response.data
    return data
}

export { fetchProduct, postPhoto }
