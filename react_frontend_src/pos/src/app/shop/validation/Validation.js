import React, { Component } from "react"
import { intlShape } from "react-intl"
import PropTypes from "prop-types"
import { v4 } from "uuid"

import PageTemplate from "../../../components/PageTemplate"
import Box from "../../../components/ui/Box"
import BoxBody from "../../../components/ui/BoxBody"
import BoxHeader from "../../../components/ui/BoxHeader"

import ButtonNextOrder from "./ButtonNextOrder"
import ValidationList from "./ValidationList"


class Validation extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    PropTypes = {
        intl: intlShape.isRequired,
        setPageTitle: PropTypes.function,
        app: PropTypes.object,
        items: PropTypes.array,
        total: PropTypes.int,
        selected_method: PropTypes.int,
    }

    componentWillMount() {
        this.props.setPageTitle(
            this.props.intl.formatMessage({ id: 'app.pos.shop.validation.page_title' })
        )
    }


    onClickNextOrder() {
        console.log('next order clicked')
        this.props.history.push('/shop/products')

    }
    
    render() {
        const history = this.props.history
        const items = this.props.items
        const total = this.props.total
        const selected_method = this.props.selected_method

        return (
            <PageTemplate app_state={this.props.app}>
                <div className="row">
                    <div className="col-md-12">

                        <ButtonNextOrder onClick={this.onClickNextOrder.bind(this)} />
                        {/* <ButtonValidate selectedID={selected_method}
                                        total={total}
                                        onClick={this.onClickValidate.bind(this)} />
                        <ButtonBack onClick={() => history.push('/shop/products')}>
                            Cancel
                        </ButtonBack> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <Box>
                            {/* <BoxHeader title="Payment methods" /> */}
                            <BoxBody>
                                Receipt example content
                                <ValidationList items={items}
                                                total={total}
                                                selected_method={selected_method} />
                            </BoxBody>
                        </Box>
                    </div>
                </div>
            </PageTemplate>
        )
    }
}

export default Validation
