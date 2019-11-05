import React from 'react';
import { Button } from 'test-components';

export default function () {
  return (
    <div>
      <Button theme="primary" block={true}>块级按钮</Button>
      <Button theme="default" block={true}>块级按钮</Button>
    </div>
  );
}
