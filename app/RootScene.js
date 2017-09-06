import React, {PureComponent} from 'react';
import {StatusBar} from 'react-native';
import {StackNavigator, TabNavigator,TabBarBottom} from 'react-navigation';
import color from './widget/color';
import TabBarItem from './widget/TabBarItem';

import HomeScene from './scene/Home/HomeScene';
import OrderScene from './scene/Order/OrderScene';
import NearbyScene from './scene/Nearby/NearbyScene';
import MineScene from './scene/Mine/MineScene';

import WebScene from './widget/WebScene';

import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene';

const lightContentScenes = ['Home', 'Mine'];

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

export default class RootScene extends PureComponent {
    constructor() {
        super();
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content');
                            } else {
                                StatusBar.setBarStyle('dark-content');
                            }
                        }
                    }
                }
            />);
    }
}


const TabRouteConfig = {
    //主页
    Home: {
        screen: HomeScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '团购',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_homepage2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected2x.png')}
                />)
        })
    },
    //附近
    Nearby: {
        screen: NearbyScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '附近',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_merchant2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected2x.png')}
                />)
        }),
    },
    //订单
    Order: {
        screen: OrderScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '订单',
            tabBarIcon: ({focused, tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_order2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_order_selected2x.png')}
                />)
        }),
    },
    //我的
    Mine: {
        screen: MineScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => ( <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./img/tabbar/pfb_tabbar_mine2x.png')}
                    selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected2x.png')}
                />
            )
        }),
    }
};

const TabNavigatorConfig = {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,     //是否可以滑动切换Tab选项卡
    animationEnabled: true, //点击Tab选项卡切换界面是否需要动画
    lazy: true,             //开启懒加载
    tabBarOptions: {
        activeTintColor: color.theme, //选中的Tab的文字颜色
        inactiveTintColor: '#979797', //未选中的Tab的文字颜色
        style: {backgroundColor: '#ffffff'},
    }
};

const Tab = TabNavigator(TabRouteConfig, TabNavigatorConfig);

const StackTabNavigatorConfig = {
    navigationOptions: {
        headerBackTitle: null,     //返回标题
        headerTintColor: '#CC0000', //头部颜色
        showIcon: true,            //是否显示图标
    }
};

const StackRouteConfig = {
    Tab: {screen: Tab},
    Web: {screen: WebScene},
    GroupPurchase: {screen: GroupPurchaseScene},
};

const Navigator = StackNavigator(StackRouteConfig, StackTabNavigatorConfig);

