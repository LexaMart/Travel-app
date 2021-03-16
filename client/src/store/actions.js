export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const SHOW_SEARCH = 'SHOW_SEARCH';

export const changeLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    value: language
  }
}

export const showSearch = (searchState) => {
  return {
    type: SHOW_SEARCH,
    value: searchState,
  }
}
