import React from 'react'
import { Space, Spin } from 'antd';
import { useSelector } from 'react-redux';
import './style.scss'
import { Fragment } from 'react';
export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    return (
        <Fragment>
            {isLoading ? <div className="loading "
            >
                <Spin tip="Loading" size="large">
                </Spin>
            </div> : ''}
        </Fragment>

    )
}
