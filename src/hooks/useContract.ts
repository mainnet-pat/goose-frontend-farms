import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import { getMasterChefAddress, getCakeAddress, getLotteryAddress, getLotteryTicketAddress } from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import ENS_ABI from 'config/abi/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from 'config/abi/ens-public-resolver.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useCake = () => {
  return useERC20(getCakeAddress())
}

export const useRabbitMintingFarm = (address: string) => {
  const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
  return useContract(rabbitMintingFarmAbi, address)
}

export const usePancakeRabbits = (address: string) => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return useContract(pancakeRabbitsAbi, address)
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  const ENS_REGISTRAR_ADDRESS = {
    10000: '0x3596f09d70B454049Ce11390A3eeBfBf6a9e3945',
    10001: '0x32f1FBE59D771bdB7FB247FE97A635f50659202b',
  }

  const chainId = process.env.REACT_APP_CHAIN_ID;
  const address = ENS_REGISTRAR_ADDRESS[chainId];
  return useContract(ENS_ABI as any, address)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract(ENS_PUBLIC_RESOLVER_ABI as any, address)
}


export default useContract
