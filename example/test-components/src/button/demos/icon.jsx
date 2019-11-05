import React from 'react';
import { Button, Icon } from 'test-components'; // eslint-disable-line

export default function () {
  return (
    <div className="demo-button-icon">
      <div className="demo-button-row">
        <Button theme="primary" icon="save">保存</Button>
        <Button icon="save">保存</Button>
        <Button theme="text" icon="save">保存</Button>
        <Button icon="save"></Button>
        {/* <Button theme="text" suffixIcon="save">保存</Button> */}
        {/* 支持直接传入 Icon */}
        {/* <Button theme="primary"><Icon type="save"/>保存</Button> */}
        {/* <Button theme="primary">保存<Icon type="save"/></Button> */}
      </div>
    </div>
  );
}
