import React, { Component } from "react";
import firebase from "../screenSnippets/FirebaseInit";

import {
    Text,
  } from "react-native";

import BoxContainer from "../../components/screenSnippets/BoxContainer";
const WaitPayment = (navigationProps) => {
    const customer_object_email = (navigationProps.navigation.getParam('customer_email'));
    const cnic_mechanic = (navigationProps.navigation.getParam('mech_cnic'));
    firebase.database().ref(`mobileMechanic/mechanicResponse/${customer_object_email}`).on("value",
        (data) => {if(data){
          let firebaseDataString = JSON.stringify(data); // JavaScript object to string
          mechanicResponse = JSON.parse(firebaseDataString); // String to JSON
          if(mechanicResponse[cnic_mechanic].payMe === -1){
              navigationProps.navigation.navigate("RatingReviews", {
              userId: customer_object_email,
              userLabel: "Clients",
              reviewBy: cnic_mechanic,
              nextScreen:"MechanicRequests",
              params:{
                usercnic:cnic_mechanic
              }
          })}}})

    return(
            <BoxContainer>
                <Text>Request Payment</Text>
            </BoxContainer>
    )
    
}

export default WaitPayment