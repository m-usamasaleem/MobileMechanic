import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import SettingsMech from "../components/screens/SettingsMech";
import ProfileMechanic from "../components/screens/ProfileMechanic";
import ServiceRequests from "../components/screens/ServiceRequests";
import CustomerResponses from "../components/screens/CustomerResponses";

import { Feather, TextInput, Ionicons, FontAwesome5 } from "@expo/vector-icons";

const screens = {
  Home: {
    screen: ServiceRequests,
    navigationOptions: {
      tabBarIcon: (iconProps) => {
        return (
          <FontAwesome5 name="home" size={23} color={iconProps.tintColor} />
        );
      },
    },
  },

  Responses: {
    screen: CustomerResponses,
    navigationOptions: {
      tabBarIcon: (iconProps) => {
        return (
          <FontAwesome5 name="user-check" size={23} color={iconProps.tintColor} />
        );
      },
    },
  },
  Settings: {
    screen: SettingsMech,
    navigationOptions: {
      tabBarIcon: (iconProps) => {
        return (
          <Feather name="settings" size={25} color={iconProps.tintColor} />
        );
      },
    },
  },
  Profile: {
    screen: ProfileMechanic,
    navigationOptions: {
      tabBarIcon: (iconProps) => {
        return <Ionicons name="person" size={25} color={iconProps.tintColor} />;
      },
    },
  },

};

const tabs = createBottomTabNavigator(screens);
const appContainer = createAppContainer(tabs);

export default appContainer;
