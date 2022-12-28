import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs' 
import { createAppContainer } from 'react-navigation' 
import SettingsCust from '../components/screens/SettingsCust'
import ProfileCust from '../components/screens/ProfileCust'
import CustHome from '../components/screens/CustHome'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'

const screens = {
    Home: {
        screen: CustHome, 
        navigationOptions:{ 
            tabBarIcon: (iconProps) => {
                return(
                    <FontAwesome5 name = "home" size = { 23 } color = { iconProps.tintColor } />
                ); 
            } 
        } 
    },
    Settings: {
        screen: SettingsCust, 
        navigationOptions:{  
            tabBarIcon: (iconProps) => {
                return(
                    <Feather name = "settings" size = { 25 } color = { iconProps.tintColor } />
                );
            }
        }
    }, 
    Profile: {
        screen: ProfileCust, 
        navigationOptions:{ 
            tabBarIcon: (iconProps) => {
                return(
                    <Ionicons name = "person" size = { 25 } color = { iconProps.tintColor } />
                );
            }
        }
    }
}
const tabs = createBottomTabNavigator(screens);
const appContainer = createAppContainer(tabs);

export default appContainer
