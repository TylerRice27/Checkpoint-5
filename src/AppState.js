import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profile: {},
  posts: [],
  ads: [],
  nextPage: '',
  nextProfilePage: '',
  previousPage: '',
  currentPage: 1,
  previousProfilePage: '',
  currentProfilePage: 1,
  query: ''
})
