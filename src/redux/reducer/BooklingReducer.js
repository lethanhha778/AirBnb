import { ADD_BOOKING, DEL_BOOKING, GET_DETAIL_BOOKING, GET_LIST_BOOKING, SET_ALERT, UPDATE_BOOKING } from "../type/BookingRoomType";

const initialState = {
    arrBooking: [],
    booking: {},
    arletContent: '',
}

export const bookingReducer = (state = initialState, action) => {

    //admin
    switch (action.type) {
        case GET_LIST_BOOKING:
            state.arrBooking = action.arrBooking;
            return { ...state }

        case GET_DETAIL_BOOKING:
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
