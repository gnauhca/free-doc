import React from 'react';
import { Button } from 'test-components';

export default function () {
  return (
    <div className="demo-button-group-base">
      <div>
        <Button.Group>
          <Button>按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
        <Button.Group>
          <Button theme="primary">按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
      </div>
      <div>
        <Button.Group size="large">
          <Button theme="primary">按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
        <Button.Group disabled={true}>
          <Button theme="primary">按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
      </div>
      <div>
        <Button.Group style={{ width: 400 }} block={true}>
          <Button theme="primary">按钮1</Button>
          <Button>按钮2</Button>
          <Button>按钮3</Button>
        </Button.Group>
      </div>
    </div>
  );
}
