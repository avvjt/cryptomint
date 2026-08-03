import TeamMemberCard from "./TeamMemberCard";

export default function TeamMemberList(){

const members=[

{

id:1,

name:"Rahul",

level:"A",

deposit:500,

today:5,

},

{

id:2,

name:"Amit",

level:"A",

deposit:1200,

today:18,

},

];

return(

<div className="space-y-4">

{members.map(member=>(

<TeamMemberCard

key={member.id}

member={member}

/>

))}

</div>

);

}