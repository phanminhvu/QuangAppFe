// ErrorPage.js

import React from 'react';
import { Result, Button } from 'antd';

const ErrorPage = () => {
  return (
      <Result
          status="404"
          title="This application does not support mobile view"
          subTitle="Please try accessing this application from a desktop or laptop."

      />
  );
};

export default ErrorPage;
