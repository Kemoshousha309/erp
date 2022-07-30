import React from 'react';
import { t } from '../../Languages/languages';
import Modal from '../UI/Modal/Modal';

function ShortCutsList(props) {
  return (
    <Modal show clicked={props.close}>
      <table className="table table-bordered text-center ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{t('key')}</th>
            <th scope="col">{t('function')}</th>
          </tr>
        </thead>
        <tbody>
          {tableBody(props)}
        </tbody>
      </table>
    </Modal>
  );
}

const shortcuts = [
  ['F1', 'display_shortcuts'],
  ['F2 - Insert', 'add'],
  ['F3', 'copy'],
  ['F4', 'list'],
  ['F5', 'search'],
  ['F7', 'modify'],
  ['F10', 'save'],
  ['F12 - Delete', 'delete'],
  ['Home', 'first_record'],
  ['End', 'last_record'],
  ['Arrows', 'next_prev_record'],
  ['Esc', 'undo'],
];

const tableBody = (p) => (shortcuts.map((row, i) => (
  <tr key={i}>
    <th scope="row">{i + 1}</th>
    <td>{row[0]}</td>
    <td>{t(row[1], p.lanTable, p.lanState)}</td>
  </tr>
)));

export default (ShortCutsList);
