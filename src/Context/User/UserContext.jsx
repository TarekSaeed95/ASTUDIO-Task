import { useReducer, createContext, useEffect, useContext } from "react";
import axios from "axios";
import * as actions from "../action";
import reducer from '../reducer'

import { useFetch, useFilter } from "../../component/global/helpers";
const userGetter = axios.create({ baseURL: "https://dummyjson.com/users" });
const UserContext = createContext();
export function UserProvider({ children }) {
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
      "firstName",
      "lastName",
      "maidenName",
      "birthDate",
      "age",
      "gender",
      "email",
      "username",
      "bloodGroup",
      "eyeColor",
    ],
    filters: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  let url;
  const fetchData = async () => {
    dispatch({
      type: actions.SET_LOADING,
    });
    dispatch({
      type: actions.RESET_DATA,
    });
    if (Object.values(state.filters).length) {
      url = `/filter?key=${state.filters.key}&value=${state.filters.value}&limit=${state.limit}&skip=${state.skip}&select=${state.keys}`;
    } else {
      url = `?limit=${state.limit}&skip=${state.skip}&select=${state.keys}`;
    }
    const data = await useFetch(userGetter, url);
    dispatch({
      type: actions.GET_DATA,
      payload: { data: data.users, total: data.total },
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
      payload: +skip,
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
    <UserContext.Provider
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
    </UserContext.Provider>
  );
}
export default UserContext;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
