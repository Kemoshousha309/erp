import { functionsListeners } from "../screen/handlers/listeners";
import { updateMode } from "../screen/handlers/mode";
import ScreenConstructor from "../ScreenConstructor";
import { handlePrivSaveModel, PrivSaver } from "./handlers/privSave";
import { handlePrivsViewModel, PrivsViewer } from "./handlers/viewPrivs";
import { PrivInputsHandler } from "./handlers/privInputs";

class InputPrivsConstructor extends ScreenConstructor {
  constructor() {
    super();
    this.state = {
      ...this.state,
      tapTools: [
        "list",
        "delete",
        "add",
        "copy",
        "search",
        "next",
        "previous",
        "last",
        "first",
        "excel",
      ],
      isPrivScreen: true
    };
    this.privSaver = new PrivSaver(this);
    this.privViewHandler = new PrivsViewer(this);
    this.privInputs = new PrivInputsHandler(this);
  }
  componentDidMount() {
    functionsListeners(this, true);
    const { tools } = updateMode("start", this.state, this.props);
    this.setState({ tools });
  }

  save = () => handlePrivSaveModel.call(this);

  viewInputPrivs = () => handlePrivsViewModel.call(this);

  privChangeHandler = (e, record) => {
    this.setState({
      input_privs: this.privInputs.inputChangeHandler(e, record),
    });
  };

  privControlInputHandler = (e, type, identifier) => {
    this.setState({
      input_privs: this.privInputs.handleControlInputChange(
        e,
        type,
        identifier
      ),
    });
  };

  static getDerivedStateFromProps(props, state) {
    let { mode, input_privs } = state;
    if (mode === "start") {
      input_privs = null;
    }
    return {
      input_privs: input_privs,
    };
  }
  render() {
    return false;
  }
}

export default InputPrivsConstructor;

/**
 * @typedef PrivState
 * @property {Object} fields like in the normal state
 * @property {Array} fk like in the normal state
 * @property {Object} fkList like in the normal state
 * @property {string} url used to send get priv and save requests
 * @property {Array} propsNames hold the properties name that should be displayed in the table
 * @property {Array} identifiers the properties form the pk for the row used to define it
 * @property {PrivsContent} content manages the the data used to build the table header and body
 *
 */

/**
 * @typedef PrivsContent
 * @property {Array} header list of string or objects each item used to define the label and control of the field
 * @property {Array} propNames list of strings or objects each item is a property name in the privs input
 * used to display the table content
 */
