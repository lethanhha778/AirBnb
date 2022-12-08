
<<<<<<< HEAD
import locationService from "../../service/LocationService";
import { ADD_LOCATION, DEL_LOCATION, GET_DETAIL_LOCATION, GET_LIST_LOCATION, SET_ALERT, UPDATE_LOCATION, UP_IMAGE_LOCATION } from "../type/LocationType";

//admin
export const listLocationAction = () => {
    return (dispatch2) => {
        let promise = locationService.listLocation();
        promise.then((result) => {
            let action2 = {
                type: GET_LIST_LOCATION,
                arrLocation: result.data.content,
            }
            dispatch2(action2)
        });
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        });
    }
}

export const getLocationAction = (id = '') => {
    return (dispatch2) => {
        let promise = locationService.detailLocation(id);
        promise.then((result) => {
            let action2 = {
                type: GET_DETAIL_LOCATION,
                location: result.data.content,
            }
            dispatch2(action2)
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const removeLocationAction = (id = '') => {
    return (dispatch2) => {
        let promise = locationService.removeLocation(id);
        promise.then((result) => {
            let action2 = {
                type: DEL_LOCATION,
                arletContent: result.data.message,
                locationId: id
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const addLocationAction = (location = {}) => {
    return (dispatch2) => {
        let promise = locationService.addLocation(location);
        promise.then((result) => {
            let action2 = {
                type: ADD_LOCATION,
                arletContent: "Thêm vị trí thành công",
                addLocation: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const updateLocationAction = (location = {}, id = '') => {
    return (dispatch2) => {
        let promise = locationService.updateLocation(location, id);
        promise.then((result) => {
            let action2 = {
                type: UPDATE_LOCATION,
                arletContent: "Cập nhập vị trí thành công",
                updateLocation: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const upImageLocationAction = (file = [], id = '') => {
    return (dispatch2) => {
        let promise = locationService.upImageLocation(file, id);
        promise.then((result) => {
            let action2 = {
                type: UP_IMAGE_LOCATION,
                arletContent: "Cập nhập ảnh thành công",
                upImageLocation: result.data.content,
            }
            dispatch2(action2);
        })
        promise.catch((error) => {
            let action2 = {
                type: SET_ALERT,
                arletContent: error.response?.data.content,
            }
            dispatch2(action2);
        })
    }
}

export const setAlertLocationAction = (arletContent = '') => {
    return (dispatch2) => {
        let action2 = {
            type: SET_ALERT,
            arletContent: arletContent,
        }
        dispatch2(action2);
=======

import locationService from "../../service/LocationService"
import { GET_ALL_LOCATION, GET_LIST_LOCATION } from "../type/LocationType"
import { hiddenLoadingAction, loadingAction } from "./LoadingAction"

// lấy ds vị trí ô search
export const getListLocation = () => {
    return (dispatch) => {
        dispatch(loadingAction)
        let promise = locationService.getLocationList()
        promise.then((res) => {
            console.log(res.data.content);
            const action = {
                type: GET_LIST_LOCATION,
                arrayLocation: res.data.content
            }
            dispatch(action)
            dispatch(hiddenLoadingAction)
        })
        promise.catch((err) => {
            console.log(err)
        })
    }
}
// lấy toàn bộ ds show ra theo phân trang tìm kiếm
export const getAllLocation = ()=>{
    return(dispatch)=>{
        let promise = locationService.getAllLocation()
        promise.then((res) => { 
            console.log(res.data.content);
            const action = {
                type: GET_ALL_LOCATION,
                allLocation: res.data.content
            }
            dispatch(action)
         })
        promise.catch((err) => { 
            console.log(err)
         })
>>>>>>> main
    }
}