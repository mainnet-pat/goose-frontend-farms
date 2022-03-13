import { useWallet } from '@binance-chain/bsc-use-wallet'
import useENSName from './useENSName'

const useProfile = (): any | null => {
  const { account } = useWallet()

  const name = useENSName(account)?.ENSName;

  return name ?
    {
      username: name,
      image: `https://metadata.bch.domains/smartbch-amber/avatar/${name}`,
      profileLink: `https://app.bch.domains/name/${name}`,
      noProfileLink: `https://app.bch.domains/name/address/${account}`
    } : null;

}

export default useProfile
