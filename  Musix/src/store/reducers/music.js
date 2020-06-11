import {
  SET_SEARCH_VIDEO,
  SET_LOADING,
  SET_ITEM_CLICKED,
  ADD_ITEM_HISTORY,
  SET_ITEMS_HISTORY,
  ADD_ITEM_FAVORITE,
} from '../actions/types';

const initialState = {
  searchVideos: [],
  loading: false,
  clickedItem: {
    item: null,
    type: '',
  },
  itemsHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS_HISTORY:
      return {
        ...state,
        itemsHistory: action.payload,
      };
    case SET_SEARCH_VIDEO:
      return {
        ...state,
        searchVideos: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ITEM_CLICKED:
      return {
        ...state,
        loading: false,
        clickedItem: action.payload,
      };
    case ADD_ITEM_HISTORY:
      state.itemsHistory = [...state.itemsHistory, action.payload];
      return {
        ...state,
      };
    case ADD_ITEM_FAVORITE:
      state.itemsHistory = state.itemsHistory.filter(value => {
        if (value.id === action.payload) {
          value.favorite = !value.favorite;
        }
        return value;
      });
      return {
        ...state,
      };
    default:
      return state;
  }
};
