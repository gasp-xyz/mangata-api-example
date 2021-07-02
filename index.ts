import {getApi, initApi} from './utils/api'
import { Keyring } from '@polkadot/api'
import {getCurrentNonce, signTx} from "./utils/tx";

export const main = async () => {
  console.log('main loop start')
  await initApi()
  const api = await getApi()

  const keyring = new Keyring({ type: 'sr25519' })
  const alice = keyring.addFromUri('//Alice')

  const aliceBalance = await api.query.assets.balances(['1', alice.address])
  console.log('Alice XXX balance ' + aliceBalance.toString())

  const asset1PoolBalance = await api.query.xyk.pools(['1', '2'])
  const asset2PoolBalance = await api.query.xyk.pools(['2', '1'])
  console.log('Pool has \n' + asset1PoolBalance + ' of XXX\n' + asset2PoolBalance + ' of YYY')


  const nonce = await getCurrentNonce(alice.address)
  await signTx(
    api.tx.xyk.sellAsset(
      '1',      // sold asset id
      '2',      // bought asset id
      '100',    // amount to sell
      // '0'       // min amount out - not yet required in production node as of 7.2.2021
    ),
    alice,
    nonce
  )
  console.log('Sold 100 XXX tokens')
}


main()
