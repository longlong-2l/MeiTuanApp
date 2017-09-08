import React, {PureComponent} from 'react';
import api from "../../api";
import {FlatList, View} from 'react-native';
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';

export default class NearByItemScene extends PureComponent {
    constructor() {
        super();
        this.state = {
            dataList: [],
            isRefreshing: false,
        };
        {
            (this: any).requestData = this.requestData.bind(this)
        }
        {
            (this: any).renderCell = this.renderCell.bind(this)
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
                    price: info.price
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
        return (<GroupPurchaseCell
            info={info.item}
            onPress={{}}/>);
    }

    NearbyHeaderView(){
        return(<View style={{flexDirection:'raw',flexWrap:'wap'}}>

        </View>);
    }

    render() {
        return (<View>
            <FlatList
                data={this.state.dataList}
                onRefresh={this.requestData}
                refreshing={this.state.isRefreshing}
                renderItem={this.renderCell}
            />
        </View>);
    }
}