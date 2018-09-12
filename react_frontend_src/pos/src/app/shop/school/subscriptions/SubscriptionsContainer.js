import { connect } from 'react-redux'
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router'

import { appOperations } from '../../../duck'
import Subscriptions from './Subscriptions';


const mapStateToProps = state => 
    ({
        app: state.app,
        loaded: state.shop.school.subscriptions.loaded,
        subscriptions: state.shop.school.subscriptions.data
    })

const mapDispatchToProps = dispatch =>
    ({
        setPageTitle(title) {
            dispatch(appOperations.setPageTitle(title))
        }
    })

const SubscriptionsContainer = withRouter(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscriptions)))

export default SubscriptionsContainer