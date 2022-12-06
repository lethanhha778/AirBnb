

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
    }
}