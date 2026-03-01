import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import { Footer } from '~~/components/footer'
import { Header } from '~~/components/header'
import { BlockieAvatar } from '~~/components/scaffold-eth'
import { useNativeCurrencyPrice } from '~~/hooks/scaffold-eth'
import { useGlobalState } from '~~/services/store/store'
import { wagmiConfig } from '~~/services/web3/wagmiConfig'
import { appChains } from '~~/services/web3/wagmiConnectors'
import '~~/styles/globals.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const canonicalAppUrl = 'https://modespray.vercel.app/app'
const legacyHosts = new Set(['modespray.xyz', 'www.modespray.xyz', 'app.modespray.xyz'])

type ScaffoldEthAppProps = AppProps & {
  enableWalletControls?: boolean
}

const ScaffoldEthApp = ({ Component, pageProps, enableWalletControls = true }: ScaffoldEthAppProps) => {
  const price = useNativeCurrencyPrice()
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice)
  const [showLegacyBanner, setShowLegacyBanner] = useState(false)

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price)
    }
  }, [setNativeCurrencyPrice, price])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowLegacyBanner(legacyHosts.has(window.location.hostname))
    }
  }, [])

  return (
    <>
      <div
        className="flex flex-col min-h-screen font-ibm-sans bg-repeat"
        style={{ backgroundImage: `url('${basePath}/grid-molecule.png')` }}
      >
        {showLegacyBanner ? (
          <div className="px-4 py-2 text-xs text-center border-b bg-mode/10 border-mode/40 text-neutral-content">
            New official link:{' '}
            <a href={canonicalAppUrl} className="font-semibold underline underline-offset-4">
              modespray.vercel.app/app
            </a>
            . We are no longer maintaining `modespray.xyz`.
          </div>
        ) : null}
        <Header enableWalletControls={enableWalletControls} />
        <main className="relative flex flex-col flex-1">
          <Component {...pageProps} />
        </main>
      </div>
      <Toaster />
      <Footer />
    </>
  )
}

const ScaffoldEthAppWithProviders = (props: AppProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      {isClient ? (
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={darkTheme()}
          modalSize="compact"
          initialChain={appChains.chains[1]}
        >
          <ScaffoldEthApp {...props} />
        </RainbowKitProvider>
      ) : (
        <ScaffoldEthApp {...props} enableWalletControls={false} />
      )}
    </WagmiConfig>
  )
}

export default ScaffoldEthAppWithProviders
