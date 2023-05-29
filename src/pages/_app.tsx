import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createConfig, configureChains, mainnet, useSwitchNetwork } from 'wagmi'
import { polygon, gnosis } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig } from 'wagmi'

const { chains, publicClient } = configureChains([mainnet, polygon, gnosis], [publicProvider()])
 
const config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi.sh',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "bf1201a49a0c5716aaffce8401280077", // this is a burner id 
        metadata: {
          name: 'wagmi',
          description: 'my wagmi app',
          url: 'https://wagmi.sh',
          icons: ['https://wagmi.sh/icon.png'],
        },
      },
    })
    
  ],
  publicClient,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config} >
      <Component {...pageProps} />
    </WagmiConfig>
    )
}
