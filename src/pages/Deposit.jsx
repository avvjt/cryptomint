import deposit from "../data/deposit";

import DepositHeader from "../components/deposit/DepositHeader";
import NetworkSelector from "../components/deposit/NetworkSelector";
import DepositAddress from "../components/deposit/DepositAddress";
import UploadHash from "../components/deposit/UploadHash";
import DepositGuide from "../components/deposit/DepositGuide";
import DepositHistory from "../components/deposit/DepositHistory";

export default function Deposit() {

  return (

    <div
      className="
      mx-auto

      max-w-7xl

      space-y-6

      px-4
      py-6

      lg:px-8
      "
    >

      <DepositHeader />

      <NetworkSelector />

      <DepositAddress

        address={deposit.address}

        qr={deposit.qr}

      />

      <UploadHash />

      <DepositGuide

        minimum={deposit.minimumDeposit}

        confirmations={deposit.confirmations}

      />

      <DepositHistory

        history={deposit.history}

      />

    </div>

  );

}