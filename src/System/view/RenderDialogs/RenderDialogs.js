/**
 * @module RenderDialogs
 */
import AlertDialog from "../../../Components/AlertDialog/AlertDialog";
import { t } from "../../../Languages/languages";

/**
 * manages Dialogs render in the screen
 */
export const RenderDialogs = ({ screen }) => {
  return (
    <>
      <RenderDeleteDialog screen={screen} />
    </>
  );
};

const RenderDeleteDialog = ({ screen }) => {
  return (
    <AlertDialog
      open={screen.state.deleteConfirm}
      handleClose={screen.deleteConfirmation}
    >
      {t("delete_confirm")}
    </AlertDialog>
  );
};
