import React from 'react';
import { Progress } from 'test-components';

export default function () {
  return (
    <div>
      <Progress value={0.6} valueText={v => v} type="circle" inline={true} message="提醒文字" />
      <Progress value={1} type="bar" inline={true} size="large" message="提醒文字" />
    </div>
  );
}
