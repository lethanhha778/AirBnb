import { BOOKING_ROOM, GET_ALL_ROOM, HIDEN_MODAL, SHOW_MODAL, } from "../type/BookingRoomType"
import { ADD_BOOKING, DEL_BOOKING, GET_DETAIL_BOOKING_AD, GET_LIST_BOOKING_AD, SET_ALERT, UPDATE_BOOKING } from "../type/BookingRoomType";

const initialState = {
    arrRoom: [],
    arrBooking: [],
    booking: {},
    arletContent: '',
    infoBookingRoom: {},
    modal: false,
}

export const BookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ROOM:
            state.arrRoom = action.arrRoom
            return { ...state }
        case BOOKING_ROOM:
            console.log(action.infoBooking);
            state.infoBookingRoom = action.infoBooking.infoRoom
            state.modal = action.infoBooking.modal
            return { ...state }
        case SHOW_MODAL:
            state.modal = true
            return { ...state }
        case HIDEN_MODAL:
            state.modal = false
            return { ...state }
        default:
            return state
    }
}

export const bookingAdminReducer = (state = initialState, action) => {

    //admin
    switch (action.type) {
        case GET_LIST_BOOKING_AD:
            state.arrBooking = action.arrBooking;
            return { ...state }

        case GET_DETAIL_BOOKING_AD:
            state.booking = action.booking;
            return { ...state }

        case DEL_BOOKING:
            state.arrBooking = state.arrBooking.filter(item => item.id !== action.bookingId);
            state.arletContent = action.arletContent;
            return { ...state }

        case ADD_BOOKING:
            state.arrBooking = [...state.arrBooking, action.addBooking];
            state.arletContent = action.arletContent;

            return { ...state }

        case UPDATE_BOOKING:
            let indexInfo = state.arrBooking.findIndex((booking) => booking.id === action.updateBooking.id);
            if (indexInfo > -1) {
                state.arrBooking[indexInfo] = action.updateBooking;
            }
            state.booking = action.updateBooking;
            state.arletContent = action.arletContent;
            return { ...state }

        case SET_ALERT:
            state.arletContent = action.arletContent;
            return { ...state }

        default:
            return state
    }
}
