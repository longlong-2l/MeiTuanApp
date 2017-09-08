import React, {PureComponent} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import {TabNavigator, TabBarTop} from 'react-navigation';
import color from '../../widget/color';
import screen from '../../common/screen';
import {Paragraph} from '../../widget/Text';
import NearByItemScene from "./NearByItemScene";

export default class NearbyScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <TouchableOpacity style={styles.searchBar}>
                <Image style={styles.searchIcon} source={require('../../img/Home/search_icon.png')}/>
                <Paragraph>找附近的吃喝玩乐</Paragraph>
            </TouchableOpacity>),
        headerLeft: (
            <TouchableOpacity>
                <Image style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}/>
                <Text style={{fontSize: 15, color: '#333333'}}>杭州 三墩</Text>
            </TouchableOpacity>),
        headerStyle: {
            backgroundColor: 'white'
        }
    });

    render() {
        let titles = ['享美食', '住酒店', '爱玩乐', '全部'];
        let types = [
            ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
            ['热门', '商务出行', '公寓民宿', '情侣专项', '高兴特惠', '成人情趣'],
            ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '大保健', '电影院', '美容美发', '美甲'],
        ];
        // return(<View><Text>what up man</Text></View>);
        return (<Navigator/>);
    }
}

const TabRouteConfigs = {
    Food: {
        screen: NearByItemScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '享美食'
        })
    },
    Hotel: {
        screen: NearByItemScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '住酒店'
        })
    },
    Happy: {
        screen: NearByItemScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '爱玩乐'
        })
    },
    All: {
        screen: NearByItemScene,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '全部',
        })
    }
};

const TabNavigatorConfigs = {
    initialRouteName: 'Food',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#FE566D',
        inactiveTintColor: '#555555',
        indicatorStyle:{
          backgroundColor:'#FE566D',
        },
        style:{
            backgroundColor:'white'
        }
    }
};

const Navigator = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    searchBar: {
        width: screen.width * 0.65,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        alignSelf: 'flex-end',
        marginRight: 20
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
});