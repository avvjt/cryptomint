import React, { useState } from 'react';

const Security = () => {
  const guardianAddress = "0x469AFE803C54A36674C55231489Cf4b61da8c1bC";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(guardianAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        
        {/* Main heading - exactly as screenshot */}
        <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-16">
          3KeyMeasuresForAssetSecurity
        </h1>

        {/* Three measures grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Card 1: Guardian Fund */}
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-3">$100M Guardian Fund</h2>
            <div className="bg-black rounded-lg p-3 font-mono text-sm break-all border border-gray-800">
              <span className="text-gray-400">WalletAddress</span>
              <span className="text-cyan-400 ml-1">{guardianAddress}</span>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Full and instant coverage for platform issues
            </p>
          </div>

          {/* Card 2: Reserves */}
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-3">ReservesBacked1:1andBeyond</h2>
            <p className="text-gray-400 text-sm mt-2">
              Verified inrealtimeandaccessibleatalltimes
            </p>
            <div className="mt-6 w-full bg-gray-800 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full w-[102%]"></div>
            </div>
          </div>

          {/* Card 3: Futures Insurance Fund */}
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-3">FuturesInsuranceFund</h2>
            <p className="text-gray-400 text-sm">
              Protectionagainstmarketextremes
            </p>
          </div>
        </div>

        {/* Badges and CTA - exactly as screenshot */}
        <div className="flex flex-col items-center space-y-8">
          <div className="flex gap-6">
            <div className="bg-[#0F0F0F] px-8 py-2 rounded-full border border-gray-700">
              <span className="text-white font-bold tracking-wider">CERTIK</span>
            </div>
            <div className="bg-[#0F0F0F] px-8 py-2 rounded-full border border-gray-700">
              <span className="text-white font-bold tracking-wider">ELLIPTIC</span>
            </div>
          </div>

          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold py-3 px-8 rounded-full text-lg transition">
            GetStartedwithMEXC
          </button>
        </div>

        {/* Copy notification (toast) */}
        {copied && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50">
            ✅ Address copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default Security;