import { useEffect, useState } from "react"

// minimal alternative implementation of sushiswap's useSingleCallResult
// original uses ethers contracts, we use web3

// eslint-disable-next-line
export function useSingleCallResult(
  contract: any,
  methodName: string,
  inputs?: any[],
  options?: any,
): any {
  const [result, setResult] = useState({result: undefined})
  useEffect(() => {
    const call = async () => {
      try {
        if (contract?._address) {
          const callResult = await contract?.methods[methodName](...inputs).call()
          setResult({result: [callResult]})
        }
// eslint-disable-next-line
      } catch (e) {
        if (!(inputs === undefined || inputs?.[0] === undefined))
          console.error(e)
      }
    }

    call();
  }, [contract, methodName, inputs])

  return result;
}
