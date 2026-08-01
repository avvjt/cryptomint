import MarketCards from "../components/markets/MarketCards";
import CategoryTabs from "../components/markets/CategoryTabs";
import SearchBar from "../components/markets/SearchBar";
import MarketTable from "../components/markets/MarketTable";

export default function Markets() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-7xl px-4 py-6">

        <MarketCards />

        <CategoryTabs />

        <SearchBar />

        <MarketTable />

      </div>

    </div>
  );
}