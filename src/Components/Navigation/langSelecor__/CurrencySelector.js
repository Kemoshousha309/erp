import style from "./CurrencySelector.module.scss";
import { connect } from "react-redux";
import { PureComponent } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/wrap";
import { changeLnaguage } from "../../../store";
import Icon from "../../UI/Icon"



// use this component as lang Selector later 

class CurrencySelector extends PureComponent {
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
      value: id,
    });
    // update lang_no in redux state

    this.close();
  };


  render() {
    const {
      state: { show, value },
    } = this;

    let openStyle = style.hide;
    let arrowStyle = style.down;
    if (show) {
      openStyle = style.show;
      arrowStyle = style.up;
    }

    let content = <p>loading ...</p>;
    const langs = ["engliss", "Arabic"]
      content = (
        <Aux>
          <Backdrop clicked={this.close} open={show} color="transparent" />
          <div className={style.Select}>
            <button onClick={this.close} value={value}>
              {mapSymbol(value)}
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
                    {mapSymbol(i, this.updateValue)} {i}
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

export const mapSymbol = (c, updateValue) => {
  switch (c) {
    case "GBP":
      return <span id={c}>&#163;</span>;
    case "AUD":
      return <span id={c}>&#36;</span>;
    case "YEN":
      return <span id={c}>&#165;</span>;
    case "RUB":
      return <span id={c}>&#8381;</span>;
    case "JPY":
      return <span id={c}>&#165;</span>;
    default:
      return <span id={c}>&#36;</span>;
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


export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
