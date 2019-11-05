import React from 'react';
import { Progress, Button } from 'test-components';

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0.6
    };
  }

  setRandomValue() {
    this.setState({
      value: Math.random()
    });
  }

  render() {
    return (
      <div>
        <Button theme="primary" onClick={() => this.setRandomValue()}>Random Value</Button>
        <div>
          <Progress value={this.state.value} inline={true} />
        </div>
        <div>
          <Progress value={this.state.value} inline={true} size="large" />
        </div>
        <div>
          <Progress value={this.state.value} type="circle" inline={false} />
        </div>
      </div>
    );
  }
}

export default Random;
