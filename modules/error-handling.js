
export function noResponse(error) {
  return { message: `No response from Smart Contract & Rate API`, error: error }
}
export function errorAlert(error) {
  console.log(error)
}
