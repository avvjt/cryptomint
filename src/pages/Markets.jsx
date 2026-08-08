import MarketCards from "../components/markets/MarketCards";
import CategoryTabs from "../components/markets/CategoryTabs";
import SearchBar from "../components/markets/SearchBar";
import MarketTable from "../components/markets/MarketTable";
import MarketsHeader from "../components/markets/MarketsHeader";

export default function Markets() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-[1700px] px-5 py-8">
        <MarketsHeader />

        {/* Highlights */}
        <MarketCards />

        {/* Categories + Search */}
        <div
          className="
          mt-12

          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
          "
        >
          <CategoryTabs />

          <SearchBar />
        </div>

        {/* Table */}
        <MarketTable />

      </div>

    </div>
  );
}