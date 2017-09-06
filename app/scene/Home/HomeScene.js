import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ListView, Image, StatusBar, FlatList} from 'react-native';
import NavigationItem from "../../widget/NavigationItem";
import color from "../../widget/color";
import api from '../../api';
import screen from '../../common/screen';
import SpacingView from "../../widget/SpacingView";
import {Heading2, Paragraph} from "../../widget/Text";

export default class HomeScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        //TouchableOpacity是点击按钮，点击后元素的透明度会发生变化
        headerTitle: (<TouchableOpacity>
            <Image style={styles.searchIcon} source={require('../../img/Home/search_icon.png')}/>
            <Paragraph>一点点</Paragraph>
        </TouchableOpacity>),
        headerRight: (
            <NavigationItem
                iconStyle={{width: 20, height: 20, margin: 5}}
                icon={require('../../img/Home/icon_navigationItem_message_white2x.png')}
                onPress={() => {

                }}
            />),
        headerLeft: (
            <NavigationItem
                title='杭州'
                titleStyle={{color: 'white'}}
                onPress={() => {

                }}
            />),
        headerStyle: {backgroundColor: color.theme},
    });

    //静态代码块，设置discounts属性
    state: {
        discounts: Array<Object>,
        dataList: Array<Object>,
        refreshing: boolean,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false,
        };

        //这一大串代码不知道什么意思，函数绑定？
        {
            (this: any).requestData = this.requestData.bind(this)
        }
        {
            (this: any).renderCell = this.renderCell.bind(this)
        }
        {
            (this: any).onCellSelected = this.onCellSelected.bind(this)
        }
        {
            (this: any).keyExtractor = this.keyExtractor.bind(this)
        }
        {
            (this: any).renderHeader = this.renderHeader.bind(this)
        }
        {
            (this: any).onGridSelected = this.onGridSelected.bind(this)
        }
        {
            (this: any).onMenuSelected = this.onMenuSelected.bind(this)
        }
    }

    //渲染完成之后执行requestData
    componentDidMount() {
        this.requestData()
    }

    requestData() {
        this.setState({refreshing: true});
        //获取活动数据
        this.requestDiscount();
        //获取附近商店数据
        this.requestRecommend();
    }

    //异步获取活动数据
    async requestDiscount() {
        try {
            let response = await fetch(api.discounts);
            let json = await response.json();
            //将获取的属性复赋值给discounts，之后会自动render渲染
            this.setState({discounts: json.data});
        } catch (error) {
            alert(error)
        }
    }

    //异步获取附近商店数据
    async requestRecommend() {
        try {
            let response = await fetch(api.recommend);
            let json = await response.json();
            let dataList = json.data.map((info) => {
                    //临时写一个实体，下面是属性
                    return {
                        id: info.id,//商家id
                        imageUrl: info.squareimgurl, //商家图片
                        title: info.mname, //商家店名
                        subtitle: `[${info.range}]${info.title}`,//获取店家活动，并将活动的券用[]括起来，后面紧跟参与活动的商品名
                        price: info.price,//商品价格，应该是所有商品中最低的价格吧
                    }
                }
            );

            this.setState({
                dataList: dataList,
                refreshing: false,
            });
        } catch (error) {
            this.setState({refreshing: false})
        }
    }

    renderCell(info: Object) {
        // return (
        //     <GroupPurchaseCell
        //     info={info.item}
        //     onPress={this.onCellSelected}/>);
        return (<View><Text>Hello world</Text></View>);
    }

    onCellSelected(info: Object) {
        StatusBar.setBarStyle('default', false);
        this.props.navigation.navigate('GroupPurchase', {info: info})
    }

    //为Item绑定Id
    keyExtractor(item: Object, index: number) {
        return item.id
    }

    //设置FlatList的头部组件
    renderHeader() {
        return (<View>
            {/*<HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected}/>*/}
            <SpacingView/>
            {/*<HomeGridView info={this.state.discounts} onDridSelected={(this.onGridSelected)}/>*/}
            <SpacingView/>
            <View style={styles.recommendHeader}>
                <Heading2>猜你喜欢</Heading2>
            </View>
        </View>)
    }

    //头部组件中GridView
    // 被点击
    onGridSelected(index: number) {
        let discount = this.state.discounts[index];

        if (discount.type == 1) {
            StatusBar.setBarStyle('default', false);

            let location = discount.tplurl.indexOf('http');
            let url = discount.tplurl.slice(location);
            this.props.navigation.navigate('Web', {url: url})
        }
    }

    onMenuSelected(index: number) {
        alert(index)
    }

    render() {
        //FlatList的性能比ListView好很多
        return (<View style={styles.container}>
            <FlatList
                //数据源
                data={this.state.dataList}
                //为每一个item设置一个Key,用以确定item
                keyExtractor={this.keyExtractor}
                //刷新数据做法
                onRefresh={this.requestData}
                //刷新状态
                refreshing={this.state.refreshing}
                //头部组件
                ListHeaderComponent={this.renderHeader}
                //设置item
                renderItem={this.renderCell}/>
        </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',       //默认主轴为水平，设置在主轴上居中
        borderWidth: screen.onePixel,   //设置边框宽度
        borderColor: color.border,      //设置边框颜色
        paddingVertical: 8,             //上下内边距20
        paddingLeft: 20,                //左内边距20
        backgroundColor: 'white'
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
});