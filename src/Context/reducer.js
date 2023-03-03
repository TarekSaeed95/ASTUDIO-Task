import  * as actions  from "./action"
function reducer(state, action) {
  switch (action.type) {
    case actions.GET_DATA:
      return {
        ...state,
        allData: action.payload.data,
        filteredData: action.payload.data,
        total: action.payload.total,
        loading: false,
        isFetching: false,
      };
    case actions.FILTER_DATA:
      return {
        ...state,
        filteredData: action.payload,
        isSearching: false,
      };
    case actions.SET_FILTER:
      return {
        ...state,
        filters: { key: action.payload.key, value: action.payload.value },
        isFetching: true,
      };
    case actions.CLEAR_FILTER:
      return {
        ...state,
        filters: {},
        searchInput: "",
        isFetching: true,
      };
    case actions.RESET_DATA:
      return {
        ...state,
        filteredData: [],
        allData: [],
      };
    case actions.SET_LIMITATION:
      return {
        ...state,
        limit: action.payload,
        isLimitChanged: true,
        isFetching: true,
      };
    case actions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        isFetching: true,
        isCurrentPageChanged: true,
        isLimitChanged: false,
      };

    case actions.SET_SKIP:
      return {
        ...state,
        skip: action.payload,
        isFetching: true,
        isCurrentPageChanged: false,
      };
    case actions.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
        isSearching: true,
      };
    case actions.SET_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case actions.SET_LOADING:
      return { ...state, loading: true };
    default:
      break;
  }
}
export default reducer;
