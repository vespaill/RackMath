import React, { Component } from 'react';
import '../css/loadValue.css';

class LoadValue extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  updateAnimation() {
    this.myRef.current.classList.remove('animate-wiggle');
    setTimeout(() => {
      this.myRef.current.classList.add('animate-wiggle');
    }, 10);
  }

  componentDidMount() { this.updateAnimation(); }
  componentDidUpdate() { this.updateAnimation(); }

  render() {
    const { value, unit } = this.props;
    return (
      <div className="load-value center-vertically">
        <div
          ref={this.myRef}
          className="load-value__inner badge badge-success"
          style={{ opacity: value > -1 ? '100%' : '0' }}
        >
          {`${value} ${unit}`}
        </div>
      </div>
    );
  }
}

export default LoadValue;
