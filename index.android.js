/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {PureComponent} from 'react';
import {AppRegistry,} from 'react-native';

import RootScene from './app/RootScene';

export default class MeiTuanApp extends PureComponent {
    render() {
        return (
            <RootScene/>
        );
    }
}

AppRegistry.registerComponent('MeiTuanApp', () => MeiTuanApp);
