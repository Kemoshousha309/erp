import React from "react";
import { connect } from "react-redux";
import Tools from "../Tools/Tools";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import StatusBar from "../../../Components/StatusBar/StatusBar";
import style from "./Boilerplate.module.scss";

function Boilerplate(props) {
  const { loading, message, toolsClicked, dropDown, tools, children } = props;

  const statusBar = (
    <>
      {loading ? <Spinner small color="3F51B5" /> : null}
      {message ? (
        <StatusBar show type={message.type}>
          {message.content}
        </StatusBar>
      ) : (
        <StatusBar show={false} />
      )}
    </>
  );

  return (
    <div className={style.Boilerplate}>
      <div className={[style.header].join(" ")}>
        {dropDown}
        <Tools clicked={toolsClicked} tools={tools} />
      </div>
      <div className={style.container}>
        <div className={style.tap}>
          <div className={style.content}>
            {children}
            <span />
          </div>
        </div>
      </div>
      <div className={style.statusBar}>{statusBar}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
});

export default connect(mapStateToProps, null)(Boilerplate);

export const RenderBoilerplate = ({ screen, children }) => {
  const {
    state: { loading, message, tools },
    props: { dropDown },
    toolsClickedHandler,
  } = screen;
  return (
    <Boilerplate
      dropDown={dropDown}
      loading={loading}
      message={message}
      tools={tools}
      toolsClicked={toolsClickedHandler}
    >
      {children}
    </Boilerplate>
  );
};
