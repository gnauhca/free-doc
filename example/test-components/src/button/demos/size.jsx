import React from 'react';
import { Button } from 'test-components';

export default function () {
  return (
    <div>
      <div className="demo-button-col">
        <Button theme="primary" size="large">大按钮</Button>
        <Button theme="primary" size="default">中按钮</Button>
        <Button theme="primary" size="small">小按钮</Button>
      </div>
      <div className="demo-button-col">
        <Button theme="default" size="large">大按钮</Button>
        <Button theme="default" size="default">中按钮</Button>
        <Button theme="default" size="small">小按钮</Button>
      </div>
      <div className="demo-button-col">
        <Button theme="text" size="large">大按钮</Button>
        <Button theme="text" size="default">中按钮</Button>
        <Button theme="text" size="small">小按钮</Button>
      </div>
    </div>
  );
}
