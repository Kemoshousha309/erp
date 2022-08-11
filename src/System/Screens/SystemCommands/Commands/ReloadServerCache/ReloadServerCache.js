import React from 'react';
import { t } from '../../../../../Languages/languages';
import Command from '../../Command';

function ReloadServerCache(props) {
  const {
    lanTable,
    lanState,
    reloadServerCache,
  } = props;
  return (
    <Command excute={reloadServerCache}>
      <p>{t('reload_server_cash', lanTable, lanState)}</p>
    </Command>
  );
}


export default ReloadServerCache;
