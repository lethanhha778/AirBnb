import AuthService from "../../service/AuthService";

export const LOGIN_ACTION = (payload) => ({ type: "LOGIN", payload })
export const LOGIN_START = () => ({ type: "LOGIN_START" })
export const CHECK_LOGIN = () => ({ type: "CHECK_LOGIN" })

export const LOGIN_FAILED = (payload) => ({ type: "LOGIN_FAILED", payload })
export const LOGIN_SUCCESS = (payload) => ({ type: "LOGIN_SUCCESS", payload })

export const UPLOAD_START = () => ({ type: "UPLOAD_START" })
export const UPLOAD_FAILED = (payload) => ({ type: "UPLOAD_FAILED", payload })
export const UPLOAD_SUCCESS = (payload) => ({ type: "UPLOAD_SUCCESS", payload })

export const EDIT_START = () => ({ type: "EDIT_START" })
export const EDIT_FAILED = (payload) => ({ type: "EDIT_FAILED", payload })
export const EDIT_SUCCESS = (payload) => ({ type: "EDIT_SUCCESS", payload })


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

export const UPLOAD_AVATAR = (payload) => {
  return dispatch => {
    dispatch(UPLOAD_START());
    AuthService.uploadAvatar(payload)
      .then(res => {
        console.log(res)
        dispatch(UPLOAD_SUCCESS(res.data));
      })
      .catch(err => {
        dispatch(UPLOAD_FAILED(err?.response?.data?.content || ''));
      });
  };
};

export const EDIT_INFO = (payload) => {
  return dispatch => {
    dispatch(EDIT_START());
    AuthService.editProfile(payload)
      .then(res => {
        dispatch(EDIT_SUCCESS(res.data));
      })
      .catch(err => {
        dispatch(EDIT_FAILED(err?.response?.data?.content || ''));
      });
  };
};
