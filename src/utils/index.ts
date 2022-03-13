import Web3 from 'web3'
import BigNumber from 'bignumber.js'

export { default as formatAddress } from './formatAddress'

export const isAddress = (address) => {
  return Web3.utils.isAddress(address) ? address : undefined;
}

export const bnToDec = (bn: BigNumber, decimals = 18): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}
