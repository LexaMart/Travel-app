import { CHANGE_LANGUAGE, SHOW_SEARCH } from './actions';

const defaultState = {
  searchState: true,
  language: localStorage.getItem('lang') ?? 0 ,
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      localStorage.setItem('lang', action.value);
      return {
        ...state,
        language: action.value
      }
    case SHOW_SEARCH:
      return {
        ...state,
        searchState: action.value
      }
      default:
        return state
  }
}