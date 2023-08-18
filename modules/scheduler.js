import { setRate } from './daily-rate-oracle.js'
import { fetchResponseFromScraperAPI } from './rate-data-source.js'
import { errorAlert } from './error-handling.js'


/**
 * Calls the scraper to get a value for the 1 Year Rates, then sends a
 * transaction to the smart contract to update the value
 */
export function updateRate() {
  fetchResponseFromScraperAPI()
    .then((rate) => {
      setRate(rate.rate.toString())
    })
    .catch((error) => {
      errorAlert(error)
    })
}
