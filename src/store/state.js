let city = '杭州'
let searchParams = {}
try {
  if (localStorage.city) {
    city = localStorage.city
  }

  if (localStorage.searchParamas) {
    searchParams = localStorage.searchParamas
  }
} catch (e) {}

export default {
  city,
  searchParams
}
