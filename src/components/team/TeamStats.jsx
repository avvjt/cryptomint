const stats = [

  {
    title:"Level A",
    value:3,
  },

  {
    title:"Level B",
    value:12,
  },

  {
    title:"Level C",
    value:8,
  },

  {
    title:"Today's Commission",
    value:"25 USDT",
  },

];

export default function TeamStats(){

return(

<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

{stats.map(stat=>(

<div
key={stat.title}
className="rounded-2xl bg-zinc-900 p-6"
>

<p className="text-zinc-500">

{stat.title}

</p>

<h2 className="mt-3 text-3xl font-bold">

{stat.value}

</h2>

</div>

))}

</div>

);

}