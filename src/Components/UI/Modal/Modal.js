import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import style from './Modal.module.scss';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){ // to prevent continuos updating which improve preformance
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    componentDidUpdate(){
        console.log("Modal Updated")
    }

    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} click={this.props.clicked} />
                <div className={style.Modal}
                    style={{
                        transform: this.props.show ? "translate(-50%, -40%) " : "translate(-50%, -600%)",
                        opacity: this.props.show ? "1" : "0"
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
    
        );        
    }
}

export default Modal;