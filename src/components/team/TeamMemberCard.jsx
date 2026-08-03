export default function TeamMemberCard({

member,

}){

return(

<div className="rounded-2xl bg-zinc-900 p-5">

<div className="flex justify-between">

<div>

<h2 className="font-bold">

{member.name}

</h2>

<p className="text-zinc-500">

Level {member.level}

</p>

</div>

<div>

<p>

{member.deposit}

USDT

</p>

<p className="text-green-500">

+{member.today}

USDT

</p>

</div>

</div>

</div>

);

}