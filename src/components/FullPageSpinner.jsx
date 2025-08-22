import React from 'react';
import Spinner from './Spinner';

function FullPageSpinner() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
      <Spinner size="large" />
    </div>
  );
}

export default FullPageSpinner;
