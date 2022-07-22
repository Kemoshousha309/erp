import React from 'react';
import { connect } from 'react-redux';
import ErrorFallback from './ErrorFallback/ErrorFallback';
import warning from '../Assets/warning.png';
import { t } from '../Helpers/lang';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorInfo: error };
  }

  render() {
    const {
      props: { lanState, lanTable, children },
      state: { errorInfo, hasError },
    } = this;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorFallback
          imgSrc={warning}
          message={t('unexpected_error', lanTable, lanState)}
          details={errorInfo}
          reload
        />
      );
    }

    return children;
  }
}

const mapStateToProps = (state) => ({
  lanState: state.lang.lan,
  lanTable: state.lang.langTables,
});

export default connect(mapStateToProps, null)(ErrorBoundary);
