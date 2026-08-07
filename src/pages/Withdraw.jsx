import withdraw from "../data/withdraw";

import WithdrawHeader from "../components/withdraw/WithdrawHeader";
import WithdrawBalance from "../components/withdraw/WithdrawBalance";
import WithdrawForm from "../components/withdraw/WithdrawForm";
import WithdrawGuide from "../components/withdraw/WithdrawGuide";
import WithdrawHistory from "../components/withdraw/WithdrawHistory";

export default function Withdraw() {

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

      <WithdrawHeader />

      <WithdrawBalance

        available={withdraw.available}

        minimum={withdraw.minimum}

      />

      <WithdrawForm />

      <WithdrawGuide />

      <WithdrawHistory
        history={withdraw.history}
      />

    </div>

  );

}