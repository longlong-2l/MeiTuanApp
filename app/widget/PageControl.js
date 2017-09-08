import React, {PureComponent} from 'react';

import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import assign from 'object-assign';

export default class PageControl extends PureComponent {
    static propsTypes = {
        numberOfPages: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number,
        hidesForSinglePage: React.PropTypes.bool,
        pageIndicatorTintColor: React.PropTypes.string,
        currentPageIndicatorTintColor: React.PropTypes.string,
        indicatorSize: React.PropTypes.object,
        indicatorStyle: View.propTypes.style,
        currentIndicatorStyle: View.propTypes.style,
        onPageIndicatorPress: React.PropTypes.func,
    };

    static defaultProps = {
        numberOfPages: 0,
        currentPage: 0,
        hidesForSinglePage: false,
        pageIndicatorTintColor: 'gray',
        currentPageIndicatorTintColor: 'white',
        indicatorSize: {width: 8, height: 8},
        indicatorStyle: {},
        currentIndicatorStyle: {},
        onPageIndicatorPress: function () {
        }
    };

    onPageIndicatorPress(index: number) {
        this.props.onPageIndicatorPress(index);
    }

    render() {
        let {style, ...props} = this.props;

        let defaultStyle = {
            height: this.props.indicatorSize.height
        };

        let indicatorItemStyle = {
            width: this.props.indicatorSize.width,
            height: this.props.indicatorSize.height,
            borderRadius: this.props.indicatorSize.height / 2,
            marginLeft: 5,
            marginRight: 5
        };

        let indicatorStyle = assign({}, indicatorItemStyle, this.props.indicatorStyle, {
            backgroundColor: this.props.pageIndicatorTintColor
        });

        let currentIndicatorStyle = assign({}, indicatorItemStyle, this.props.currentIndicatorStyle, {
            backgroundColor: this.props.currentPageIndicatorTintColor
        });

        let pages = [];
        for (let i = 0; i < this.props.numberOfPages; i++) {
            pages.push(i);
        }

        return (
            this.props.hidesForSinglePage && pages.length <= 1 ? null :
                <View style={[styles.container, defaultStyle, style]}>
                    {pages.map((el, i) => <TouchableWithoutFeedback key={i}
                                                                    onPress={this.onPageIndicatorPress.bind(this, i)}>
                        <View style={i === this.props.currentPage ? currentIndicatorStyle : indicatorStyle}/>
                    </TouchableWithoutFeedback>)}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});