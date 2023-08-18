import axios from 'axios'
import { quoteAPI, quoteAPIKey } from './consts.js'

/**
 * Structures the data from the source into a JSON response
 */
export async function fetchResponseFromScraperAPI() {
  try {
    const { data } = await axios.get(`${quoteAPI}?api_key=${quoteAPIKey}`)
    const rates = Object.fromEntries(
      data.dataset.column_names.map((key, index) => [
        key,
        data.dataset.data[0][index],
      ])
    )
    return {
      rate: rates['1 YR'],
      timestamp: rates.Date,
      source: `NASDAQ Link 1Yr Rate API: Column='1 YR'`,
    }
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}

