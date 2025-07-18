"use client";

import React from "react";
import { useActiveAccount, useConnect } from "thirdweb/react";
import { client } from "./client";
import { polygon } from "thirdweb/chains";
import {  inAppWallet } from "thirdweb/wallets";

export default function Login() {
  const account = useActiveAccount();
  const { connect, isConnecting, error } = useConnect({
    accountAbstraction: {
      chain: polygon,
      sponsorGas: true,
    },
    client: client,
  });
  
  console.log(account);

  const handleConnect = () => {
    connect(async () => {
      // Create wallet
      const wallet = inAppWallet();
      
      // Connect wallet
      await wallet.connect({
        client,
        chain: polygon,
        strategy: "google"
      });
      
      // Return the wallet
      return wallet;
    });
  };
 
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome</h1>
          <p className="text-center text-gray-600 mb-8">
            Connect your wallet with MetaMask
          </p>
          
          <div className="w-full max-w-sm">
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error.message || String(error)}</p>
            )}
            
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-3"
            >
              {isConnecting ? (
                "Connecting..."
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21.49 13.16c-.71-.47-1.65-.47-2.36 0l-1.89 1.26V7.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v6.92l-1.89-1.26c-.71-.47-1.65-.47-2.36 0-.71.47-.71 1.34 0 1.81l4.5 3c.71.47 1.65.47 2.36 0l4.5-3c.71-.47.71-1.34 0-1.81z"/>
                  </svg>
                  Connect
                </>
              )}
            </button>
            {account && (
              <div className="mt-4 text-center text-sm text-black">
                Connected: {account.address}
              </div>
            )}

            
          </div>
        </div>
      </div>
    </main>
  );
} 