import { Snackbar, Alert } from "@mui/material";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import style from "./StatusBar.module.scss";

class StatusBar extends PureComponent {
  state = {
    state: null,
  };

  onMouseOverHandler = () => {
    let { content, state } = this.state;
    let { type, children } = this.props;
    if (state !== "MOUSE_OVER") {
      content = !content ? { type, children } : content;
      this.setState({ state: "MOUSE_OVER", content: content });
    }
  };

  onMouseOutHandler = () => {
    this.setState({ state: "MOUSE_OUT" });
    setTimeout(() => {
      const { state } = this.state;
      if (state === "MOUSE_OUT") {
        this.setState({ content: null, state: null });
      }
    }, 3000);
  };

  render() {
    let { show, type, children } = this.props;
    const { content, state } = this.state;
    if(["MOUSE_OUT", "MOUSE_OVER"].includes(state)){
      show = true
    }
    if (content) {
      type = content.type;
      children = content.children;
    }

    return show ? (
      <Snackbar
        open={show}
        onMouseOver={this.onMouseOverHandler}
        onMouseLeave={this.onMouseOutHandler}
        className={style.StatusBar}
        sx={{position: "static", display: "inline-block"}}
      >
        <Alert  severity={type}>{children}</Alert>
      </Snackbar>
    ) : null;
  }
}

export default connect(null, null)(StatusBar);
