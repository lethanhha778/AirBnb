import { DISPLAY_LOADING, HIDDEN_LOADING, TABLE_DISPLAY_LOADING, TABLE_HIDDEN_LOADING } from "../type/LoadingType"



const stateDefault = {
  isLoading: false,
  tableLoading: false,
}

const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true
      return { ...state }
    }
    case HIDDEN_LOADING: {
      state.isLoading = false
      return { ...state }
    }
    case TABLE_DISPLAY_LOADING: {
      state.tableLoading = true
      return { ...state }
    }
    case TABLE_HIDDEN_LOADING: {
      state.tableLoading = false
      return { ...state }
    }
    default: return { ...state }
  }
}
export default LoadingReducer