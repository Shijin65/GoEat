import { UseSearchRestaurant } from "@/Apis/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const SearchPage = () => {
  const { city } = useParams();

  const [searchstate, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);
console.log(searchstate.sortOption)
  const setsortOption = (sortOption: string) => {
    setSearchState((prevstate) => ({
      ...prevstate,
      sortOption,
      page: 1,
    }));
  };
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const { results, isLoading } = UseSearchRestaurant(searchstate, city);

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevstate) => ({
      ...prevstate,
      searchQuery: "",
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] ">
        <span className="flex items-center gap-2 text-lg text-blue-500 tracking-tighter ">
          <ClipLoader color="#368dd6" size={25} />
          <h3 className="animate-pulse">Loading...</h3>
        </span>
      </div>
    );
  }
  if (!results?.data || !city) {
    return <span>No Result Found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine_list">
        <CuisineFilter
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevState) => !prevState)}
          selectedCuisines={searchstate.selectedCuisines}
          onChange={setSelectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchstate.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant"
          onReset={resetSearch}
        />
        <div className="flex flex-1 flex-col gap-3 md:flex-row justify-between">
          <SearchResultInfo city={city} total={results.pagination.total} />
          <SortOptionDropdown sortOption={searchstate.sortOption} onchange={(value)=>setsortOption(value)}/>
        </div>
        {results?.data.map((restaturant,index) => (
          <SearchResultCard key={index} restaturant={restaturant} />
        ))}

        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          OnPagechange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
