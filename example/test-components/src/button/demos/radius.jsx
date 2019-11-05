import React from 'react';
import { Button } from 'test-components';

export default function () {
  return (
    <div>
      <Button theme="primary" icon="save" round={true} size="large" />
      <Button icon="save" round={true} />
      <Button icon="save" round={true}>保存</Button>
    </div>
  );
}
