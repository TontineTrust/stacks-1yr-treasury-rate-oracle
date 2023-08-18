import { fetchResponseFromSmartContract } from './daily-rate-oracle.js'
import { errorAlert } from './error-handling.js'
import { fetchResponseFromScraperAPI } from './rate-data-source.js'

/**
 * Handles the logic to get the stored rates and timestamps from the smart contract, and formats them accordingly in case of failure logs an error and falls back to using the rate API data source
 */
export async function returnDailyRateAndDate() {
  try {
    const smartContractResponse = await fetchResponseFromSmartContract()
    return smartContractResponse
  } catch (smartContractError) {
    errorAlert(
      `Failed to fetch from Smart Contract, reverting to scraper: ${smartContractError}`
    )
    try {
      const scraperAPIResponse = await fetchResponseFromScraperAPI()
      return scraperAPIResponse
    } catch (scraperAPIError) {
      errorAlert(`Failed to fetch from scraper API: ${scraperAPIError}`)
      throw noResponse(error)
    }
  }
}
