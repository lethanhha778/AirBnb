import { ACCESS_TOKEN, USER_INFO } from "../../util/setting"
import { openCustomNotificationWithIcon } from "../../util/func.js";

const initialState = {
  loggedIn: false,
  user: {},
  loading: false,
  error: ""
};
const reducer = (state = initialState, action) => {
  const { payload, type } = action
  const userInfo = payload?.content || {}

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

    case "UPLOAD_SUCCESS":
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
      return { ...state, user: userInfo }

    case "EDIT_SUCCESS":
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo))
      openCustomNotificationWithIcon(
        "success",
        "Edit Success",
        ""
      );
      return { ...state, user: userInfo }

    case "EDIT_FAILED":
      openCustomNotificationWithIcon(
        "error",
        "Edit Failed",
        ""
      );

      return state

    case "UPLOAD_FAILED":
      openCustomNotificationWithIcon(
        "error",
        "Edit Failed",
        ""
      );

      return state

    case "LOGOUT":
      localStorage.removeItem(USER_INFO)
      localStorage.removeItem(ACCESS_TOKEN)

      return {
        loggedIn: false,
        user: {},
        loading: false,
        error: ""
      }
    default:
      return state;
  }
}
export default reducer;