import { Component } from "react";
import style from "./SystemCommands.module.scss";
import { Button } from "@material-ui/core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { t } from "../../../utilities/lang";

class Command extends Component {
  render() {
    const {
      props: { lanState, lanTable, children, excute },
    } = this;
    let dirStyle = style.ltr;
    if (parseInt(lanState) === 1) {
      dirStyle = style.rtl;
    }
    return (
      <div className={[style.command, dirStyle].join(" ")}>
        <div className={style.commandContent}>{children}</div>
        <Button onClick={excute} variant="contained" color="primary">
          {t("excute", lanTable, lanState)}
        </Button>
        <FontAwesomeIcon className={style.icon} icon={faPaperPlane} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    lanTable: state.lang.langTables,
  };
};

export default connect(mapStateToProps, null)(Command);
