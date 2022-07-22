import React, { PureComponent } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import style from './Modal.module.scss';

class Modal extends PureComponent {
  render() {
    return (
      <>
        <Backdrop show={this.props.show} click={this.props.clicked} />
        <div
          className={style.Modal}
          style={{
            transform: this.props.show
              ? 'translate(-50%, -40%) '
              : 'translate(-50%, -600%)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
