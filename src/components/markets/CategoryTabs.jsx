const tabs = [

    "Crypto",

    "Stocks",

    "TradFi",

    "Crude Oil",

    "Fiat"

];

export default function CategoryTabs() {

    return (

        <div
            className="
mt-10
flex
gap-8
overflow-x-auto
text-2xl
font-semibold
"
        >

            {

                tabs.map(tab => (

                    <button
                        key={tab}
                    >

                        {tab}

                    </button>

                ))

            }

        </div>

    )

}