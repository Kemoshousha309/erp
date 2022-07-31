import style from "./LangSelector.module.scss";
import { connect } from "react-redux";
import { PureComponent } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { changeLnaguage } from "../../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { t } from "../../../Languages/languages";


class LangSelector extends PureComponent {
  state = {
    show: false,
    value: 1,
  };

  close = () => this.setState({ show: !this.state.show });

  updateValue = (e) => {
    const {
      target: { id },
    } = e;
    this.setState({
      value: parseInt(id),
    });
    // update lang_no in redux state
    this.props.onLanguageChange(parseInt(id));
    this.close();
  };

  // refactor
  selectorClickHandler = (e) => {
    this.close();
  };

  componentDidMount() {
    this.setState({ value: this.props.lanState });
  }
  render() {
    const {
      state: { show, value },
      props: { langTable, langChangeActive },
    } = this;

    let openStyle = style.hide;
    let arrowStyle = style.down;
    if (show) {
      openStyle = style.show;
      arrowStyle = style.up;
    }

    let disabledClass = [];
    if (!langChangeActive) {
      disabledClass.push(style.disabled);
    }

    let content = <p>loading ...</p>;
    const langs = [1, 2];
    content = (
      <>
        <Backdrop show={show} click={this.close} opacity="0" />
        <div className={style.Select}>
          <button
            disabled={!langChangeActive}
            className={disabledClass.join(" ")}
            type="button"
            onClick={this.selectorClickHandler}
            value={value}
          >
            {mapSymbol(value, "short", langTable)}
            <FontAwesomeIcon className={arrowStyle} icon={faChevronUp} />
          </button>
          <ul className={openStyle}>
            {langs.map((i) => {
              return (
                <li key={i} onClick={this.updateValue} id={i}>
                  {mapSymbol(i, "long", langTable)}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );

    return content;
  }
}

export const mapSymbol = (c, type) => {
  switch (parseInt(c)) {
    case 1:
      return (
        <span id={c}>
          {type === "short" ? "Ar" : t("arabic")}
        </span>
      );
    case 2:
      return (
        <span id={c}>
          {type === "short" ? "En" : t("english")}
        </span>
      );
    default:
      break;
  }
};

const mapStateToProps = (state) => {
  return {
    lanState: state.lang.lan,
    langTable: state.lang.langTables,
    langChangeActive: state.lang.langChangeActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLanguageChange: (langValue) => dispatch(changeLnaguage(langValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LangSelector);
