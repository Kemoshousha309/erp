import React, { Component } from 'react';
import Modal from '../Components/UI/Modal/Modal';
import Aux from './Aux';


export const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        // here checking first for errors before rendering
        componentWillMount () {
            // make use of axios interceptors
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null}) // to make sure that state is init
                return req
            },err => console.log(err));

            this.resInterceptors = axios.interceptors.response.use(res =>  res, err => {
                // technecal errors are handled in the response
                console.log(err.response)
                this.setState({error: err})
            })
        }

        // when we use this hoc with many components you create many interceptors which make errors or leak the memory so 
        // you we should to eject (clear) interceptor before unmounting (removing from the dom)
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        modalCloseHandler = () =>{
            
            this.setState({error: null})
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} clicked={this.modalCloseHandler} >
                        <h1>
                        {this.state.error ? this.state.error.message : null}    
                        </h1>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}