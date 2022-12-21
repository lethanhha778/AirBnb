import React from 'react'
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import './style.scss'
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
