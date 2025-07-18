"use client";

import React from "react";
import { BuyWidget } from "thirdweb/react";
import { client } from "../client";
import { polygon } from "thirdweb/chains";
import { AutoConnect } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export default function Buy() {
    const wallets = [inAppWallet(), createWallet("io.metamask")];

    return (
        <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <div className="py-20 w-full max-w-md mx-auto">
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-3xl font-bold text-center mb-8">Buy Funds</h1>
                    <p className="text-center text-gray-600 mb-8">
                        Purchase tokens to get started
                    </p>
                    <AutoConnect client={client} timeout={10000} wallets={wallets} accountAbstraction={{
                        chain: polygon,
                        sponsorGas: true,
                    }} />
                    <BuyWidget
                        client={client}
                        title="Get Funds"
                        tokenAddress="0x0000000000000000000000000000000000000000"
                        chain={polygon}
                        amount={"0.002"}

                    />
                </div>
            </div>
        </main>
    );
}
