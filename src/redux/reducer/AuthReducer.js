import { ACCESS_TOKEN, USER_INFO } from "../../util/setting"
const initialState = {
  loggedIn: false,
  user: {},
  loading: false,
  error: ""
};
const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
    case 'LOGIN':
      return { ...state, loggedIn: true }
    case "LOGIN_START":
      return { ...state, loading: true }
    case "LOGIN_SUCCESS":
      localStorage.setItem(ACCESS_TOKEN, payload?.content?.token)
      localStorage.setItem(USER_INFO, JSON.stringify(payload?.content?.user || {}))

      return { ...state, loading: false, loggedIn: true, user: payload?.content?.user, error: "" }
    case "CHECK_LOGIN":
      const user_data = localStorage.getItem(USER_INFO) || '{}'
      const user_json = JSON.parse(user_data)
      if (Object.keys(user_json).length) {
        return { ...state, loggedIn: true, user: user_json }
      }
      return state

    case "LOGIN_FAILED":
      return { ...state, error: payload, loading: false }
    default:
      return state;
  }
}
export default reducer;