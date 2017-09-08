import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import screen from '../../common/screen';
import color from "../../widget/color";
import HomeGridItem from "./HomeGridItem";

export default class HomeGridView extends PureComponent {
    static defaultProps = {
        info: []
    };

    render() {
        return (<View style={styles.container}>
            {this.props.info.map((info, index) => (<HomeGridItem
                info={info}
                key={index}
                onPress={() => this.props.onGridSelected(index)}/>))}
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap', //自动换行
        justifyContent: 'space-between',
        borderTopWidth: screen.onePixel,
        borderLeftWidth: screen.onePixel,
        borderColor: color.border
    }
});