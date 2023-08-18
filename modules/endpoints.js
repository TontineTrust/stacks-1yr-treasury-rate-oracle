import { returnDailyRateAndDate } from './rest-api-response.js'
import { fetchResponseFromScraperAPI } from './rate-data-source.js'
import { host, port } from './consts.js'
import cors from 'cors'

/**
 * Sets up the end points for the API
 */
export function endPoints(app) {
  app.use(cors())
  getHomeRoute(app)
  getScraperRateRoute(app)
  getStoredAnnuityData(app)
  forceAnnuityDataUpdate(app)
  app.listen(port, host, () => {
    console.log(`API server listening on ${host}:${port}`)
  })
}

/**
 * Sets up the home route which returns the rate and timestamp from the smart contract
 */
function getHomeRoute(app) {
  app.get('/', async (req, res) => {
    res.json(await returnDailyRateAndDate())
  })
}

/**
 * Sets up the route which scrapes the daily rate from the source and returns it
 */
function getScraperRateRoute(app) {
  app.get('/fetch-rate', async (req, res) => {
    res.json({ rate: await fetchResponseFromScraperAPI() })
  })
}

