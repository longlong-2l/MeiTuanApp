import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Heading2, Paragraph} from './Text';
import Separator from "./Separator";

export default class DetailCell extends PureComponent {
    render() {
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image}/>;
        return (<View style={styles.container}>
            <TouchableOpacity>
                <View style={[styles.content, this.props.style]}>
                    {icon}
                    <Heading2>{this.props.title}</Heading2>
                    <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row',justifyContent:'flex-end'}}>
                        <Paragraph style={{color: '#999999'}}>{this.props.subtitle}</Paragraph>
                        <Image style={styles.arrow} source={require('../img/Public/cell_arrow.png')}/>
                    </View>
                </View>
                <Separator/>
            </TouchableOpacity>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    }
});