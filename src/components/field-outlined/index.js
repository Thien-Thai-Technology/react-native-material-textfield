import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import TextField from '../field';
import Outline from '../outline';

export default class OutlinedTextField extends TextField {
  
  static contentInset = {
    ...TextField.contentInset,

    input: 16,

    top: 0,
    left: 12,
    right: 12,
  };

  static labelOffset = {
    ...TextField.labelOffset,

    y0: 0,
    y1: -10, // vị trí chữ đẩy lên (căn dọc)
    // x1: this.props.locationX || 0, // vị trí chữ đẩy lên (căn ngang)xs
  };

  static defaultProps = {
    ...TextField.defaultProps,

    lineWidth: 1,
    disabledLineWidth: StyleSheet.hairlineWidth,
  };

  constructor(props) {
    super(props);
    OutlinedTextField.labelOffset.x1 = this.props.locationX
    // console.log(OutlinedTextField.labelOffset.y0, 'trung1')
    // console.log(this.constructor.labelOffset.y0, 'trung2');
    this.onTextLayout = this.onTextLayout.bind(this);
    this.state.labelWidth = new Animated.Value(0);
  }

  onTextLayout({ nativeEvent: { lines } }) {
    let { fontSize, labelFontSize } = this.props;
    let { labelWidth } = this.state;

    let scale = labelFontSize / fontSize;

    labelWidth.setValue(lines[0].width * scale);
  }

  renderLabel(props) {
    let { onTextLayout } = this;

    return super.renderLabel({ ...props, onTextLayout });
  }

  renderLine(props) {
    let { labelWidth } = this.state;

    return (
      <Outline {...props} left={this.props.left} rangeLeft={this.props.rangeLeft} sizeSpaceText={this.props.sizeSpaceText} labelWidth={labelWidth} />
    );
  }
}
