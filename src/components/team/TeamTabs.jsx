export default function TeamTabs({

active,

setActive,

}){

const tabs=[

"A",

"B",

"C",

"Commission",

];

return(

<div className="flex gap-3">

{tabs.map(tab=>(

<button

key={tab}

onClick={()=>setActive(tab)}

className={`

rounded-full

px-5

py-2

${

active===tab

?

"bg-blue-600"

:

"bg-zinc-900"

}

`}

>

{tab}

</button>

))}

</div>

);

}