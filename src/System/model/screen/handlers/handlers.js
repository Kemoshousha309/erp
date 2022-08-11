import { getParam } from "../../../../Helpers/utilities";
import { handleMode } from "./mode";
import { toolsPriv } from "./utilities";


// derived state Handler ***************************************
export const handleDerivedState = (props, state) => {
  let tools = handleMode(
    state.mode,
    props.languages,
    state.tapTools,
    props.changeLangSelectActivity
  );
  const formPrivs =
    props.forms_privs_hash[getParam(props.location.search, "no")];
  tools = toolsPriv(formPrivs, tools);
  return { tools };
};
