import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';

import color from './color';
import screen from '../common/screen';

export default class Separator extends PureComponent {
    render() {
        return (<View style={[styles.line, this.props.style]}/>);
    }
}

const styles = StyleSheet.create({
    line: {
        width: screen.width,
        height: screen.onePixel,
        backgroundColor: color.border,
    }
});
