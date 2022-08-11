/**
 * @module RenderDisplayPattern
 */

import { DisplayFieldsGrid } from "./Fields/DisplayFieldsGrid";
import ScreenPrivs from "./ScreenPrivs/ScreenPrivs";
import {RenderDetails} from "./Details/DetailsPanel"
import {RenderPrivilegesView} from "./InputPrivs/InputPrivsView";
import TreeView from "../../Components/TreeView/TreeView";

/**
 * decide to the pattern and layout of the screen
 * - decide the layout of the fields, tree and other components
 * @prop {Object} screen
 * @prop {additional} to render additional content passed from above components
 * @returns jsx content
 */
export const RenderDisplayPattern = ({ screen, additional }) => {
  const {displayPattern } = screen.state;
  const patternMap = {
    BASIC: NormalPattern ,
    TREE: TreePattern ,
    SCREEN_PRIV: ScreenPrivPattern 
  }
  const DisplayPattern = patternMap[displayPattern]; 
  return <DisplayPattern screen={screen} />
};

/**
 * The normal pattern displays:
 * - fields grid 
 * - details if present
 * - inputPrivs if present
 */
const NormalPattern = ({ screen, additional }) => {
  return (
    <form>
      <DisplayFieldsGrid screen={screen} /> 
      <RenderDetails screen={screen} />
      <RenderPrivilegesView screen={screen} />
      {additional}
    </form>
  );
};

/** 
 * The pattern that display a tree side by side with fields
 */
const TreePattern = ({ screen, additional }) => {
  const {
    state: { tree, treeLoading },
  } = screen;
  return (
    <div className="row px-3 mt-4">
      <div className="col-sm-8 px-0">
        <form>
          <DisplayFieldsGrid screen={screen} />
          <RenderDetails screen={screen} />
          {additional}
        </form>
      </div>
      <div className="col-sm-4 px-0 ">
        <TreeView thisK={screen} tree={tree} loading={treeLoading} />
      </div>
    </div>
  );
};

/**
 * split the screen two sides:
 * - one has the fields and the user privs 
 * - the other has the has a tree
 * - used in ScreenPrivs 
 */
const ScreenPrivPattern = ({screen, additional}) => {
  const {
    state: { tree, treeLoading },
  } = screen;
  return (
    <div className="row px-3 mt-4">
      <div className="col-sm-8 px-0">
        <form>
          <DisplayFieldsGrid screen={screen} />
          <ScreenPrivs screen={screen} />
          {additional}
        </form>
      </div>
      <div className="col-sm-4 px-0 ">
        <TreeView thisK={screen} tree={tree} loading={treeLoading} />
      </div>
    </div>
  );
}