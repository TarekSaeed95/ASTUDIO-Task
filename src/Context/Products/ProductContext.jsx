import { useReducer, createContext, useContext, useEffect } from "react";
import * as actions from "../action";
import axios from "axios";
import reducer from "../reducer";
import { useFetch, useFilter } from "../../component/global/helpers";
const productGetter = axios.create({
  baseURL: "https://dummyjson.com/products",
});
const ProductContext = createContext();

export function ProductProvider({ children }) {
  const initialState = {
    loading: false,
    allData: [],
    filteredData: [],
    total: 100,
    limit: 5,
    skip: 0,
    searchInput: "",
    pages: 20,
    currentPage: 1,
    isLimitChanged: false,
    isFetching: false,
    isSearching: false,
    isCurrentPageChanged: false,
    keys: [
      "id",
      "title",
      "price",
      "discountPercentage",
      "rating",
      "stock",
      "brand",
      "category",
    ],
    filters: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = async () => {
    dispatch({
      type: actions.SET_LOADING,
    });
    dispatch({
      type: actions.RESET_DATA,
    });
    let url;
    if (Object.values(state.filters).includes("category")) {
      url = `/category/${state.filters.value}?limit=${state.limit}&skip=${state.skip}&select=${state.keys}`;
    } else if (Object.values(state.filters).length > 0) {
      url = `/search?q=${state.filters.value}&limit=${state.limit}&skip=${state.skip}&select=${state.keys}`;
    } else {
      url = `?limit=${state.limit}&skip=${state.skip}&select=${state.keys}`;
    }
    const data = await useFetch(productGetter, url);
    dispatch({
      type: actions.GET_DATA,
      payload: { data: data.products, total: data.total },
    });
  };
  const filterData = () => {
    const searchedData = useFilter(state, state.allData);
    dispatch({
      type: actions.FILTER_DATA,
      payload: searchedData,
    });
  };
  const setLimit = (limit) => {
    dispatch({
      type: actions.SET_LIMITATION,
      payload: limit,
    });
  };
  const setSkip = (skip) => {
    dispatch({
      type: actions.SET_SKIP,
      payload: skip,
    });
  };
  const setCurrentPage = (page) => {
    setSearchInput("");
    dispatch({
      type: actions.SET_CURRENT_PAGE,
      payload: page,
    });
  };
  const setSearchInput = (searchInput) => {
    dispatch({
      type: actions.SET_SEARCH_INPUT,
      payload: searchInput,
    });
  };
  const setPages = () => {
    dispatch({
      type: actions.SET_PAGES,
      payload: Math.ceil(state.total / state.limit),
    });
  };
  const setFilter = (key, value) => {
    setSearchInput("");
    if (key) {
      dispatch({
        type: actions.SET_FILTER,
        payload: { key, value },
      });
      setCurrentPage(1);
    }
    if (value == "") {
      clearFilter();
    }
  };
  const clearFilter = () => {
    if (state.searchInput || Object.values(state.filters).length) {
      dispatch({
        type: actions.CLEAR_FILTER,
      });
    }
  };
  useEffect(() => {
    if (state.isLimitChanged) {
      setCurrentPage(1);
    }
    if (state.isFetching) {
      fetchData();
    } else if (state.isSearching) {
      filterData();
    }
  }, [state.limit, state.skip, state.filters, state.searchInput]);
  useEffect(() => {
    if (state.isCurrentPageChanged) {
      setSkip((state.currentPage - 1) * state.limit);
    }
  }, [state.currentPage, state.filters, state.limit]);
  useEffect(() => {
    setPages();
  }, [state.filteredData]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchData,
        setLimit,
        setSkip,
        setSearchInput,
        filterData,
        setFilter,
        setCurrentPage,
        clearFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export default ProductContext;

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
      `useProducts must be used within a ProductContextProvider.`
    );
  }
  return context;
};
