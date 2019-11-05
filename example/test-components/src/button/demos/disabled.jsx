import React from 'react';
import { Button } from 'test-components';

export default function () {
  return (
    <div>
      <Button theme="primary" disabled>主按钮</Button>
      <Button disabled>次按钮</Button>
      <Button theme="text" disabled>次按钮</Button>
    </div>
  );
}
