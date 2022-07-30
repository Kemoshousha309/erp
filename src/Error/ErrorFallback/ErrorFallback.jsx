import { Button } from "@mui/material";
import { useState } from "react";
import style from "./ErrorFallback.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";
import { t } from "../../Languages/languages";

function ErrorFallback({ children, details, imgSrc, reload, message }) {
  const [showDtl, setShowDtl] = useState(false);
  const toggleDtl = () => setShowDtl((showDtl) => !showDtl);
  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <div className={style.message}>
          {children ? children : <h1>{message}</h1>}
        </div>
        {reload ? (
          <Button
            className={style.reloadBtn}
            variant="outlined"
            endIcon={<ReplayIcon />}
            onClick={() => document.location.reload()}
          >
            {t("reload")}
          </Button>
        ) : null}
        {details ? (
          <div className={style.details}>
            <Button onClick={toggleDtl}> {t("more_dtl")}</Button>
            {showDtl ? <p>{details.toString()}</p> : null}
          </div>
        ) : null}
      </div>
      <div className={style.imgContainer}>
        <img src={imgSrc} className="img-fluid" alt="warning" />
      </div>
    </div>
  );
}

export default ErrorFallback;
