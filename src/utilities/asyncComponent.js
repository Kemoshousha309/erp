import React, { Component } from "react"
import SkeletonLoader from "../Components/UI/SkeletonLoader/SkeletonLoader"

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
            .then(cmp => {
                this.setState({component: cmp.default})
            })
        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : <SkeletonLoader type="Bp"/>
        }
    }
}

export default asyncComponent;