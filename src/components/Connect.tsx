import { useEffect } from 'react';
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
 
export default function Connect() {
  const { connector: activeConnector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { switchNetworkAsync } = useSwitchNetwork()
  const { chain: wagmiChain } = useNetwork();

  const changeNetwork = async ()=>{
    const res = await switchNetworkAsync(137)
    alert("network changed")
    console.log(res)
  }

  useEffect(()=>{
    console.log(wagmiChain)
  },[wagmiChain])
  
  return (
    <>
      {isConnected && <div>Connected to {activeConnector?.name}</div>}
 
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            ' (connecting)'}
        </button>
      ))}
 
      {error && <div>{error.message}</div>}
      
      <button onClick={changeNetwork}>Change Network</button>
    </>
  )
}