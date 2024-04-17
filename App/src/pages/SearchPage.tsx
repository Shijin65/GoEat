import { UseSearchRestaurant } from "@/Apis/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
export type SearchState = {
  searchQuery: string;
};
const SearchPage = () => {
  const { city } = useParams();
  const [searchstate, setsearchstate] = useState<SearchState>({
    searchQuery: "",
  });
  const { results, isLoading } = UseSearchRestaurant(city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setsearchstate((prevstate) => ({
      ...prevstate,
      searchQuery: searchFormData.searchquery,
    }));
  };

  const resetSearch=()=>{
    setsearchstate((prevstate) => ({
      ...prevstate,
      searchQuery: "",
    }));
  }
    
  if (isLoading) {
    <span>Loading</span>;
  }
  if (!results?.data || !city) {
    return <span>No Result Found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine_list">cuisine section</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
        searchQuery={searchstate.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant"
          onReset={resetSearch}
        />
        <SearchResultInfo city={city} total={results.pagination.total} />
        {results?.data.map((restaturant) => (
          <SearchResultCard restaturant={restaturant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
