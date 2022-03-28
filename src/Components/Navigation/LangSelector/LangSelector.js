import style from "./LangSelector.module.scss";
import { connect } from "react-redux";
import { PureComponent } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/wrap";
import { changeLnaguage } from "../../../store";
import Icon from "../../UI/Icon"
import { t } from "../../../utilities/lang";


class LangSelector extends PureComponent {
  state = {
    show: false,
    value: 1
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
    this.props.onLanguageChange(parseInt(id))
    this.close();
  };

// refactor
  selectorClickHandler = (e) => {
    this.close()
  }

  componentDidMount() {
    this.setState({value: this.props.lanState})
  }
  render() {
    const {
      state: { show, value },
      props: {lanState, langTable, langChangeActive}
    } = this;

    let openStyle = style.hide;
    let arrowStyle = style.down;
    if (show) {
      openStyle = style.show;
      arrowStyle = style.up;
    }

    let disabled = {}
    if(!langChangeActive){
      disabled = {cursor: "initial"}
    }

    let content = <p>loading ...</p>;
    const langs = [1, 2]
      content = (
        <Aux>
          <Backdrop show={show} click={this.close} opacity="0" />
          <div className={style.Select}>
            <button disabled={!langChangeActive} style={disabled}  onClick={this.selectorClickHandler} value={value}>
              {mapSymbol(value, "short", lanState, langTable)}
              <Icon
                className={arrowStyle}
                size={10}
                color="#43464E"
                icon="chevron-up"
              />
            </button>
            <ul className={openStyle}>
              {langs.map((i) => {
                return (
                  <li key={i} onClick={this.updateValue} id={i}>
                    {mapSymbol(i, "long", lanState, langTable)}
                  </li>
                );
              })}
            </ul>
          </div>
        </Aux>
      );

    return content;
  }
}

export const mapSymbol = (c, type, lanState, langTable) => {
  switch (parseInt(c)) {
    case 1:
      return <span id={c}>{type === "short" ? "Ar" :  t("arabic", langTable, lanState) }</span>;
    case 2:
      return <span id={c}>{type === "short" ? "En" :  t("english", langTable, lanState)  }</span>;
    default:
      break
  }
};

const mapStateToProps = state => {
  return {
      lanState: state.lang.lan,
      langTable: state.lang.langTables,
      langChangeActive: state.lang.langChangeActive
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onLanguageChange: (langValue) => dispatch(changeLnaguage(langValue))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LangSelector);
