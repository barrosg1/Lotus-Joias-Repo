import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Alert = ({ alerts }) => (
    <div className={`alert-style alert alert-${alerts.alertType}`}>
        {
            alerts.msgData && alerts.msgData.map(alert => {
                return <p>{alert.msg}</p>
            })

        }

        {
            alerts.redirectValue && alerts.redirectPath && (
                <>
                    <hr />
                    <Link to={alerts.redirectPath}>{alerts.redirectValue}</Link>
                </>
            )
        }
    </div>

);


Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alertReducer
});

export default connect(mapStateToProps)(Alert);
