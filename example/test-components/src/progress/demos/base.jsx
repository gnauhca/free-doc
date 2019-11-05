import React from 'react';
import { Progress } from 'test-components';

export default function () {
  return (
    <div>
      <Progress value={0.6} inline={true} />
      <Progress value={0.7} inline={true} size="large" />
    </div>
  );
}
