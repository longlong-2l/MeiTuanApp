import React, {PureComponent} from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Heading2 } from "../../widget/Text";
import screen from '../../common/screen';

export default class OrderMenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={this.props.onPress}>
                <Image style={styles.icon} source={this.props.icon} resizeMode='contain'/>
                <Heading2>
                    {this.props.title}
                </Heading2>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 5,
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5
    }
});