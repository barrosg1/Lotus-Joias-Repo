import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col } from 'reactstrap';
import { removeAlert } from 'redux/actions/alertActions';
import { isEmpty } from '../utils/isEmpty';



const Alert = ({ alerts, removeAlert }) => {

    const history = useHistory();

    const submit = (productPath) => {

        removeAlert();
        history.push(productPath);

    }

    let isAlert = '';

    if (!isEmpty(alerts)) {

        isAlert = (
            <Fragment>

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

                            <Button className='alert-btn' color="primary" size="sm" onClick={() => submit(alerts.redirectPath)}>{alerts.redirectValue}</Button>

                        )
                    }

                </div>


            </Fragment>
        )
    }

    return (

        <>
            {isAlert}
        </>
    );
}


Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alertReducer
});

export default connect(mapStateToProps, { removeAlert })(Alert);
