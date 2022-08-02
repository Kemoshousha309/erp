import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from './LogoutPage.module.scss';
import secure_login from '../../../Assets/secure_login.png';

const lang2 = {
  1: 'You are not logged in, please login to continue',
  2: 'Go login page',
  3: 'You are directed to this page because one of the following reasons:',
  4: 'You log out of the system.',
  5: 'Your privileges are updated and you need to log in.',
  6: 'Your login session ends.',
  7: 'Read more',
};

const lang1 = {
  1: 'انت لم تسجل دخولك, الرجاء تسجيل الدخول للاستمرار',
  2: 'الذهاب لصفحة تسجيل الدخول',
  3: 'لقد تم تحويلك لهذه الصفحه لاحد الاسباب التاليه: ',
  4: 'سجلت خوجك من النظام',
  5: 'تم تحديث صلاحياتك وتحتاج الى اعادة تسجيل الدخول',
  6: 'فترة تسجيلك لدخول انتهت',
  7: 'اقرأ المزيد',
};

function LogoutPage(props) {
  let labels = lang1;
  if (parseInt(props.lanState) === 2) {
    labels = lang2;
  }

  const [state, setState] = useState({ boxShow: false });

  return (
    <div className={[style.container, 'container-fluid'].join(' ')}>
      <div className="row">
        <div className={[style.column, 'col-md-6 p-4'].join(' ')}>
          <img src={secure_login} className="img-fluid " alt="warning" />
        </div>
        <div className={[style.infoColumn, 'col-md-6'].join(' ')}>
          <div>
            <h1 className="">{labels['1']}</h1>
            <button
              onClick={() => props.history.push('/login')}
              style={{ fontSize: '2rem' }}
              className="btn btn-outline-primary "
            >
              {labels['2']}
            </button>
            <br />

            <button
              style={{ fontSize: '2rem' }}
              onClick={() => setState({ boxShow: !state.boxShow })}
              className="btn btn-outline-secondary"
            >
              {labels['7']}
            </button>

            <div
              className={[
                style.collapseBox,
                state.boxShow ? style.show : style.hidden,
              ].join(' ')}
            >
              <p>
                {labels['3']}
                {' '}
                <br />
                1-
                {' '}
                {labels['4']}
                <br />
                2-
                {' '}
                {labels['5']}
                {' '}
                <br />
                3-
                {' '}
                {labels['6']}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  langTable: state.lang.langTables,
});

export default connect(mapStateToProps, null)(LogoutPage);
