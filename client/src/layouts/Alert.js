import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { removeAlert } from 'redux/actions/alertActions';
import { isEmpty } from '../utils/isEmpty';

const Alert = ({ history }) => {

    const dispatch = useDispatch();
    const alerts = useSelector(state => state.alertReducer)

    const submit = (productPath) => {
        dispatch(removeAlert());
        history.push(productPath);
    }

    let isAlert = '';

    if (!isEmpty(alerts)) {

        isAlert = (
            <div className={`alert-style alert alert-${alerts.alertType}`}>
                {

                    alerts.msgData && alerts.msgData.map((alert, key) => {
                        return <p key={key}>{alert.msg}</p>
                    })

                }

                {
                    alerts.alertType === 'success' &&
                    alerts.redirectPath &&
                    alerts.redirectValue && (

                        <Button
                            className='alert-btn'
                            color="primary"
                            size="sm"
                            onClick={() => submit(alerts.redirectPath)}
                        >
                            {alerts.redirectValue}
                        </Button>

                    )
                }

            </div>

        )
    }

    return (
        <Fragment>{isAlert}</Fragment>
    );
}

export default Alert;
