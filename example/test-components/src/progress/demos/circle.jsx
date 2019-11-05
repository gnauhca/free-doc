import React from 'react';
import { Progress } from 'test-components';

export default function () {
  return (
    <div>
      <Progress value={0.6} type="circle" inline={true} />
      <Progress value={1} type="circle" inline={true} size="large" />
    </div>
  );
}
