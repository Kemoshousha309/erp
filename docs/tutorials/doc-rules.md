
# Functions (methods) standards:
> * define the types of params and return
> * give a one line description at top define the general purpose of this function
> * in steps clarify the procedural of the function 
> * you should provide a detailed description of behavior

example: 
``` javascript
/** manages the model of details undo behavior 
 * - get the fieldsUpdate, mode (normal handle)
 * - get the updated record from handleDtlRecordUndo (details handle)
 * - update the state and remove the content of pre content if present
 * @returns undefined (model => updating the state)
 */
export async function handleDtlUndoModel() {
  const {
    state: { preAdd, preModify },
  } = this;
  const recordUpdate = this.dtlUndoHandler.handleDtlRecordUndo();
  const { fieldsUpdate, mode, record } = this.undoHandler.handleUndo();
  const { tools } = updateMode(mode, this.state, this.props);
  const finalRecordUpdate = !record ? record : recordUpdate
  if (!preAdd || !preModify)
    return this.setState({
      fields: fieldsUpdate,
      mode,
      record: finalRecordUpdate,
      tools,
    });
  this.setState({
    fields: fieldsUpdate,
    mode,
    record: finalRecordUpdate,
    preAdd: { ...preAdd, content: null },
    preModify: { ...preModify, content: null },
    tools,
  });
}

```