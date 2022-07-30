import React from "react";
import { t } from "../../../../../Languages/languages";
import Command from "../../Command";

function ReloadClientCache(props) {
  const { reloadClientCache } = props;
  return (
    <Command excute={reloadClientCache}>
      <p>{t("reload_client_cache")}</p>
    </Command>
  );
}

export default ReloadClientCache;
