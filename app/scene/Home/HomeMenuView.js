import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ScrollView,} from 'react-native';

import HomeMenuItem from './HomeMenuItem';

export default class HomeMenuView extends PureComponent {
    state: {
        currentPage: number
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            currentPage: 0
        }
    }

    render() {
        let {menuInfo, onMenuSelected} = this.props;
        let menuItems = menuInfo.map(
            (info, i) => (
                <HomeMenuItem
                    key={info.title}
                    title={info.title}
                    icon={info.icon}
                    onPress={() => {
                        onMenuSelected && onMenuSelected(i)
                    }}/>
            )
        );

        let menuViews = [];
        //将数字进行上舍入，大于1.0就是2
        let pageCount = Math.ceil(menuItems.length / 10);

        for (let i = 0; i < pageCount; i++) {
            let length = menuItems.length < (i * 10) ? menuItems.length - (i * 10) : 10;
            //抽取menuItem 中i * 10至 i* 10 + length的值，左闭右开
            let items = menuItems.slice(i * 10, i * 10 + length);

            let menuView = (<View style={styles.itemView} key={i}>
                    {items}
                </View>
            );
            menuViews.push(menuView);
        }
        return (<View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}
                //水平滚动，默认为false
                        horizontal={true}
                //不显示水平方向的滚动条
                        showsHorizontalScrollIndicator={false}
                //滚动条会停在滚动视图的尺寸的整数倍位置
                        pagingEnabled={true}
                //在滚动的过程中每帧最多调用一次这个回调函数
                        onScroll={(e) => this.onScroll(e)}>
                <View style={styles.menuContainer}>{menuViews}</View>
            </ScrollView></View>);
    }
}

const styles = StyleSheet.create({
    container: {
        background: 'white',
    },
    contentContainer: {},
    menuContainer: {
        flexDirection: 'row',
    },
    itemView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width,
    },
    pageControl: {
        margin: 10,
    }
});