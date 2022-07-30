import React from 'react';
import ErrorFallback from './ErrorFallback/ErrorFallback';
import warning from '../Assets/warning.png';
import { t } from '../Languages/languages';

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
      props: { children },
      state: { errorInfo, hasError },
    } = this;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorFallback
          imgSrc={warning}
          message={t('unexpected_error')}
          details={errorInfo}
          reload
        />
      );
    }

    return children;
  }
}


export default (ErrorBoundary);
