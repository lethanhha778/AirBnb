import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dataIMG } from '../../components/CardRoom/dataImg'
import { detailRoom } from '../../redux/actions/BookingRoomAction'

import './style.scss'

export default function DetailRoom() {
  let { id } = useParams()
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailRoom(id))
  }, [id])
  const { room } = useSelector(state => state.BookingReducer)
  console.log(room);

  return (
    <div className='container-detail'>
      {/* <h3>{room.tenPhong}</h3> */}
      {/* {renderRoom()} */}
    </div>
  )
}
