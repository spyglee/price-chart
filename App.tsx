import React from 'react';
import Main from './pages/Main';
import ErrorBoundary from './src/ErrorBoundary';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

export default App;
