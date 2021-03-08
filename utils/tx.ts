import { AddressOrPair, SubmittableExtrinsic } from '@polkadot/api/types'
import { getApi } from './api'

export const signTx = async (
  tx: SubmittableExtrinsic<'promise'>,
  address: AddressOrPair,
  nonce: number
) => {
  const unsub = await tx.signAndSend(address, { nonce }, (result: any) => {
    // handleTx(result, unsub)
  })
  //   setNonce(nonce + 1)
}

export async function getCurrentNonce(account?: string) {
  const api = getApi()
  if (account) {
    const { nonce } = await api.query.system.account(account)
    console.log('currentNonce', nonce.toNumber())
    //   setNonce(nonce.toNumber())
    return nonce.toNumber()
  }
  console.log('currentNonce', -1)
  return -1
}
