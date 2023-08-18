export const port = process.env.PORT || 3000
export const host = process.env.HOST || 'localhost'
export const contractAddress =
  process.env.CONTRACT_ADDRESS 
export const contractName = process.env.CONTRACT_NAME 
export const blockchainURL =
  process.env.BLOCKCHAIN_URL 
export const sender =
  process.env.SENDER
export const senderKey =
  process.env.SENDER_KEY
export const STACKS_NETWORKS = {
  main: 'main',
  test: 'test',
}
export const quoteAPIKey = process.env.NASDAQ_LINK_API_KEY
export const quoteAPI =
  'https://data.nasdaq.com/api/v3/datasets/USTREASURY/YIELD.json'
export const mainnetTransactionHistoryURL = `https://api.mainnet.hiro.so/extended/v1/address/${contractAddress}/transactions`
export const testnetTransactionHistoryURL = `https://api.testnet.hiro.so/extended/v1/address/${contractAddress}/transactions`
export const rebuildHookURL = process.env.REBUILD_HOOK_URL
export const sendgridAPIKey = process.env.ORACLE_SENDGRID_API_KEY
export const sendgridRecipientsList =
  process.env.ORACLE_SENDGRID_RECIPIENTS_LIST.split(',').map((email) =>
    email.trim()
  )
export const sendgridSenderMail = process.env.ORACLE_SENDGRID_SENDER_MAIL
