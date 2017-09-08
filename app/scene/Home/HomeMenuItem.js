import React, {PureComponent} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Heading2} from '../../widget/Text';
import screen from '../../common/screen';

export default class HomeMenuItem extends PureComponent {
    render() {
        return (<TouchableOpacity style={styles.container}>
            <Image source={this.props.icon} resizeMode='contain' style={styles.icon}/>
            <Heading2>{this.props.title}</Heading2>
        </TouchableOpacity>);
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.width / 5,
    },
    icon: {
        width: screen.width / 9,
        height: screen.width / 9,
        margin: 5,
    }
});