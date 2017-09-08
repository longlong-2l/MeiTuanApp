import React, {PureComponent} from 'react';
import {View, StyleSheet, ScrollView,} from 'react-native';

import HomeMenuItem from './HomeMenuItem';
import screen from '../../common/screen';
import color from "../../widget/color";
import PageControl from "../../widget/PageControl";

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
        //map方法会把menuInfo中的每一个元素作为参数传递给形参info
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
        //将数字进行上舍入，大于1.0就是2,此时计算得有2页
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
                //在滚动的过程中每帧最多调用一次这个回调函数，这个函数是为了在滚动时通知控制器变化
                        onScroll={(e) => this.onScroll(e)}>
                <View style={styles.menuContainer}>{menuViews}</View>
            </ScrollView>
            <PageControl
                style={styles.pageControl}
                numberOfPages={pageCount}
                currentPage={this.state.currentPage}
                hidesForSinglePage={true}
                pageIndicatorTintColor='gray'
                currentPageIndicatorTintColor={color.theme}
                indicatorSize={{width: 8, height: 8}}
            />
        </View>);
    }

    onScroll(e: any) {
        console.log("onScroll","执行")
        let x = e.nativeEvent.contentOffset.x;
        let currentPage = Math.round(x / screen.width);

        if (this.state.currentPage != currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    contentContainer: {},
    menuContainer: {
        flexDirection: 'row',
    },
    itemView: {
        flexDirection: 'row',
        flexWrap: 'wrap',   //正常换行
        width: screen.width,
    },
    pageControl: {
        margin: 10,
    }
});