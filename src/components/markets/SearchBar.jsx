import { Search } from "lucide-react";

export default function SearchBar(){

return(

<div
className="
my-8
flex
justify-end
"
>

<div
className="
flex
items-center
rounded-xl
bg-zinc-900
px-4
py-3
"
>

<Search
size={18}
/>

<input

placeholder="Search"

className="
ml-3
bg-transparent
outline-none
"

/>

</div>

</div>

)

}