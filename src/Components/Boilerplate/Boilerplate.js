import React from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/wrap";
import Tools from "../Tools/Tools";
import Spinner from "../UI/Spinner/Spinner";
import StatusBar from "../StatusBar/StatusBar";
import style from "./Boilerplate.module.scss";

const Boilerplate = (props) => {
  const {
    loading,
    message,
    toolsClicked,
    dropDown,
    tools,
    children,
  } = props;

  const statusBar = (
    <Aux>
      {loading ? <Spinner small color="3F51B5" /> : null}
      {message ? (
        <StatusBar show type={message.type}>
          {message.content}
        </StatusBar>
      ) : (
        <StatusBar show={false}></StatusBar>
      )}
    </Aux>
  );

  return (
    <Aux>
      <div className={style.Boilerplate}>
        <div className={[style.header].join(" ")}>
          {dropDown}
          <Tools clicked={toolsClicked} tools={tools} />
        </div>
        <div className={style.container}>
          <div className={style.tap}>
            <div className={style.content}>
              {children}
              <span></span>
            </div>
          </div>
        </div>
        <div className={style.statusBar}>{statusBar}</div>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(Boilerplate);
