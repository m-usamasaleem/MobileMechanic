import React,{Component} from 'react';
import {Image, View} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'

var logo = require('../../assets/icons/MobileMechanicLogo.png');

export default class SplashScreen extends Component {
    constructor(props){
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'PreSignIn'})
            ]
        })
        super(props);
        
        setTimeout(()=> {
            this.props.navigation.dispatch(resetAction);
        }, 3000);
    }
    render() {
        return (
            <View style = { {flex: 1, justifyContent: 'center', alignItems: 'center'} }>
                <Image source = {logo} style = { {height: 500, width: 500, transform: [{ rotate: '340deg'}]}} />
            </View>
        );
    }   
}

