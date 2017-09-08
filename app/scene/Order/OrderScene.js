import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, View,} from 'react-native';
import color from "../../widget/color";
import api from "../../api";
import GroupPurchaseCell from "../GroupPurchase/GroupPurchaseCell";
import DetailCell from "../../widget/DetailCell";
import OrderMenuItem from "./OrderMenuItem";
import SpacingView from "../../widget/SpacingView";

export default class OrderScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        title: '订单',
        headerStyle: {backgroundColor: color.theme},
    });

    constructor(props: Object) {
        super(props);
        this.state = {
            isRefreshing: false,
        };

        {
            (this: any).requestData = this.requestData.bind(this)
        }
        {
            (this: any).renderCell = this.renderCell.bind(this)
        }
        {
            (this: any).keyExtractor = this.keyExtractor.bind(this)
        }
        {
            (this: any).renderHeader = this.renderHeader.bind(this)
        }
    }

    componentDidMount() {
        this.requestData();
    }

    async requestData() {
        this.setState({isRefreshing: true});
        try {
            let response = await fetch(api.recommend);
            let json = await response.json();

            let dataList = json.data.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price,
                }
            });

            dataList.sort(() => {
                return 0.5 - Math.random()
            });

            this.setState({
                dataList: dataList,
                isRefreshing: false,
            });
        } catch (e) {
            this.setState({
                isRefreshing: false
            })
        }
    }

    renderCell(info: Object) {
        return (
            <GroupPurchaseCell
                info={info.item}
                onPress={{}}/>
        )
    }

    keyExtractor(item: Object, index: number) {
        return item.id;
    }

    renderHeader() {
        return (<View style={styles.container}>
            <DetailCell title='我的订单' subtitle='全部订单' style={{height: 38}}/>
            <View style={styles.itemContainer}>
                <OrderMenuItem title='待付款' icon={require('../../img/Order/order_tab_need_pay2x.png')}/>
                <OrderMenuItem title='待使用' icon={require('../../img/Order/order_tab_need_review2x.png')}/>
                <OrderMenuItem title='待评价' icon={require('../../img/Order/order_tab_need_review2x.png')}/>
                <OrderMenuItem title='退款/售后' icon={require('../../img/Order/order_tab_needoffer_aftersale2x.png')}/>
            </View>
            <SpacingView/>
            <DetailCell title='我的收藏' subtitle='查看全部' style={{height: 38}}/>
        </View>);
    }

    render() {
        return (<View style={styles.container}>
            <FlatList
                data={this.state.dataList}
                onRefresh={this.requestData}
                renderItem={this.renderCell}
                keyExtractor={this.keyExtractor}
                ListHeaderComponent={this.renderHeader}
                refreshing={this.state.isRefreshing}
            />
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    }
});