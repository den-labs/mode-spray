import React from 'react'
import { FaucetButton, RainbowKitCustomConnectButton } from '~~/components/scaffold-eth'

export function WalletControls() {
  return (
    <>
      <RainbowKitCustomConnectButton />
      <FaucetButton />
    </>
  )
}
