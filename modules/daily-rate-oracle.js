import axios from 'axios'
import {
  hexToCV,
  stringAsciiCV,
  makeContractCall,
  broadcastTransaction,
} from '@stacks/transactions'
import { StacksMainnet, StacksTestnet } from '@stacks/network'
import {
  contractAddress,
  contractName,
  sender,
  senderKey,
  blockchainURL,
  mainnetTransactionHistoryURL,
  testnetTransactionHistoryURL,
  STACKS_NETWORKS,
} from './consts.js'

/**

Initializes the Stacks network based on the provided environment network.
@param {string} envNetwork - The environment network to initialize (expected values: 'test' or 'main').
@returns - An object containing the initialized network and transaction URL.
@throws {Error} - If the provided envNetwork is not 'test' or 'main'.
@example
const networkData = initializeStacksNetwork('test');
networkData.network; // StacksTestnet instance
networkData.transactionURL; // testnetTransactionHistoryURL
*/
function initializeStacksNetwork(envNetwork) {
  if (envNetwork === STACKS_NETWORKS.main) {
    return {
      network: new StacksMainnet(),
      transactionURL: mainnetTransactionHistoryURL,
    }
  } else if (envNetwork === STACKS_NETWORKS.test) {
    return {
      network: new StacksTestnet(),
      transactionURL: testnetTransactionHistoryURL,
    }
  } else {
    throw new Error(
      `Expected 'test' or 'main' for enviroment, got: ${envNetwork}`
    )
  }
}

const { network, transactionURL } = initializeStacksNetwork(
  process.env.STACKS_NET
)

/**
 * Sends a get request to the blockchain network to access the read only function of the smart contract that returns the stored 1 year rates of return, defaults to scraper if it fails
 */
export async function getRate() {
  try {
    const payload = {
      sender: sender,
      arguments: [],
    }
    const response = await axios.post(
      `${blockchainURL}${contractAddress}/${contractName}/get-rate`,
      payload
    )
    const result = response.data

    return parseFloat(hexToCV(result.result).data)
  } catch (error) {
    console.error(
      'Error while fetching rate from scraper:',
      error.message,
      ', defaulting to scraped rate'
    )
    throw error
  }
}

/**
 * Fetches rates from the scraper, then sends a transaction to the smart rate that calls the set-rate function that updates the stored internal rate value. Needs time to validate blocks before the value is ACTUALLY changed on the blockchain(~10 min)
 */
export async function setRate(rate) {
  const setRate = {
    contractAddress: contractAddress,
    contractName: contractName,
    functionName: 'set-rate',
    functionArgs: [stringAsciiCV(rate)],
    senderKey: senderKey,
    validateWithAbi: true,
    network: network,
    postConditionMode: 1,
  }
  try {
    const txn = await makeContractCall(setRate)
    await broadcastTransaction(txn, network)
    console.log(`Rate update request sent with value ${rate}`)
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}

/**
 * Accesses the transactions logs for the smart contract, then fetches the latest one and returns the timestamp of the block confirmation
 */
export async function getLastContractUpdateDate() {
  try {
    const response = await axios.get(transactionURL)
    return response.data.results[0].burn_block_time_iso
  } catch (error) {
    console.error(
      `No valid timestamp or failed to connect to Stacks API, error: ${error}`
    )
    throw error
  }
}

/**
 * Fetches rate and timestamp from smart contract and updates accordingly
 */
export async function fetchResponseFromSmartContract() {
  const rate = await getRate()
  const timestamp = await getLastContractUpdateDate()
  return {
    rate,
    timestamp,
    source: 'Smart Contract',
  }
}
