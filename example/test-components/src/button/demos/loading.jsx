import React from 'react';
import { Button } from 'test-components';

export default function () {
  return (
    <div>
      <Button theme="primary" loading={true} round={true} />
      <Button theme="primary" loading={true}>加载中</Button>
    </div>
  );
}
