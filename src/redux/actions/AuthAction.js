import AuthService from "../../service/AuthService";

export const LOGIN_ACTION = (payload) => ({ type: "LOGIN", payload })
export const LOGIN_START = () => ({ type: "LOGIN_START" })
export const CHECK_LOGIN = () => ({ type: "CHECK_LOGIN" })

export const LOGIN_FAILED = (payload) => ({ type: "LOGIN_FAILED", payload })
export const LOGIN_SUCCESS = (payload) => ({ type: "LOGIN_SUCCESS", payload })

export const LOGIN = (payload) => {
  return dispatch => {
    dispatch(LOGIN_START());

    AuthService.login(payload)
      .then(res => {
        console.log(res)
        dispatch(LOGIN_SUCCESS(res.data));
      })
      .catch(err => {
        dispatch(LOGIN_FAILED(err?.response?.data?.content || ''));
      });
  };
};