export default{
  changeCity (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {}
  },
  getSearchParams (state, searchParams) {
    state.searchParams = searchParams
    try {
      localStorage.searchParams = searchParams
    } catch (e) {}
  }
}
