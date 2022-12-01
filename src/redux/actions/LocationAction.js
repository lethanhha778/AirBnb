

import locationService from "../../service/LocationService"
import { GET_ALL_LOCATION, GET_LIST_LOCATION } from "../type/LocationType"


export const getListLocation = () => {
    return (dispatch) => {
        // import getLocationList từ locationService để lấy data 
        let promise = locationService.getLocationList()
        promise.then((res) => {
            console.log(res.data.content);
            const action = {
                type: GET_LIST_LOCATION,
                arrayLocation: res.data.content
            }
            dispatch(action)
        })
        promise.catch((err) => {
            console.log(err)
        })
    }
}

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