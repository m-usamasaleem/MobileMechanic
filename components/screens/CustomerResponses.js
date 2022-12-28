import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  CheckBox,
  Alert,
} from "react-native";

import { FontAwesome, Ionicons, Entypo, Feather } from "@expo/vector-icons";
import firebase from "../../components/screenSnippets/FirebaseInit";
import { SearchBar } from "react-native-elements";
import BoxContainer from "../../components/screenSnippets/BoxContainer";

var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;

const SettingsCust = (tabsNavigationProps) => {
  const [isSelected, setSelection] = React.useState(null);
  const [firebaseDataJSON_entries,setFirebaseData] = useState({});
  let dummy={};
  let cnic_mechanic = tabsNavigationProps.navigation.getParam("usercnic");
  var service_requests = [];
  var customers_status = {};
  var customer_responses = {};
  var customer_responses_email = {};
  const handleTextChange = () => {
    console.log(`You wrote something in the input text field ...`);
  };

  const fetchData = () => {
    let responses_entries = "";
    let customer_responses_email_keys ='';
    firebase
      .database()
      .ref(`mobileMechanic/mechanicResponse/`)
      .once("value", (data) => {
        let firebaseDataString_response = JSON.stringify(data); // JavaScript object to string
        let firebaseDataJSON_response = JSON.parse(firebaseDataString_response); // String to JSON
        
        try{
          responses_entries = Object.entries(firebaseDataJSON_response);

        }catch(err){
          console.log("No Response")
        }
        
        
  
        for (let x = 0; x < responses_entries.length; x++) {
          try {
            if (responses_entries[x][1][cnic_mechanic].bidAcceptance) {
              customer_responses_email[responses_entries[x][0]] =
                responses_entries[x][1][cnic_mechanic].charges;
            }
          } catch (err) {
            console.log("ERROR");
          }
        }
  
        customer_responses_email_keys = Object.keys(customer_responses_email);
    for (let t = 0; t < customer_responses_email_keys.length; t++) {
      firebase
        .database()
        .ref(`mobileMechanic/userRequests/${customer_responses_email_keys[t]}`)
        .once("value", (data) => {
          let firebaseDataString = JSON.stringify(data); // JavaScript object to string
          let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
          let response_email = customer_responses_email_keys[t];
  
          try{
            dummy[[response_email]]= Object.entries({ [response_email]: firebaseDataJSON });
            setFirebaseData(dummy)
          }catch(err){
            console.log("No Response")
          }



            
        });
    }
    
   
    
  });
  }
 
  const [update, setUpdate] = React.useState(false)
  const toggleUpdate = () => { setUpdate(!update) }
  
  React.useEffect(()=>{
    fetchData()
    let timer1 = setTimeout(toggleUpdate, 50000)
    return () => {
      clearTimeout(timer1)
    }
  }, [update])


  const createThreeButtonAlert = (object) => {
    Alert.alert("", "Do you want to start working?", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },

      { text: "OK", onPress: () => pressHandler(object) },
    ]);
  };

  const pressHandler = (object) => {



    firebase
      .database()
      .ref(`mobileMechanic/mechanicResponse/${object[0]}/${cnic_mechanic}`)
      .update({mechanicStartWorking:1})



    tabsNavigationProps.navigation.navigate("MechanicLocation", {
      customer_object: object,
      usercnic: cnic_mechanic,
    });
  };



  if (firebaseDataJSON_entries){

    
    console.log( "1---------")
  //  console.log(Object.entries (firebaseDataJSON_entries)[0][1][0][1].customerShoppingCart )
  //  console.log( Object.entries (firebaseDataJSON_entries)[0][0])
  
try{

  let tempJsonEntries=  Object.entries (firebaseDataJSON_entries);
  let Images_list = [];
  let lengthEntries=Object.entries (firebaseDataJSON_entries).length;

  for (let x = 0; x < lengthEntries; x++) {
    let temp_images = [];
   
    let tempJsonEntries=  Object.entries (firebaseDataJSON_entries);
    let shopping_cart = tempJsonEntries[x][1][0][1] .customerShoppingCart;

    let enteries_item = Object.entries(shopping_cart);
    let length_items = enteries_item.length;

    for (let y = 0; y < length_items; y++) {
      temp_images.push(enteries_item[y][1].carImageKey);
    }
    Images_list.push(temp_images);
  }


  for (let i = 0; i < lengthEntries; i++) {
    let status = "Accepted";
    let tempJsonEntries=  Object.entries (firebaseDataJSON_entries);

    
    firebase
      .database()
      .ref(
        `mobileMechanic/mechanicResponse/${tempJsonEntries[i][0]}`
      )
      .on("value", (data) => {
        let firebaseDataString = JSON.stringify(data); // JavaScript object to string
        let setMechanicResponse = JSON.parse(firebaseDataString); // String to JSON
        try {
          if (setMechanicResponse[cnic_mechanic].bidAcceptance == 1) {
            status = "Accepted";
          } else if (setMechanicResponse[cnic_mechanic].bidAcceptance == -1) {
            status = "Rejected";
          } else {
            status = "Pending";
          }
        } catch (err) {
          console.log("Not founded");
        }
      });


    service_requests.push(
      <View
        key={i}
        style={{
          marginTop: windowHeight * 0.03,
          marginBottom: windowHeight * 0.03,
        }}
      >
        <TouchableOpacity
          onPress={() => createThreeButtonAlert( tempJsonEntries[i][1][0])}
        >
          <BoxContainer style={myStyles.container1}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  marginBottom: windowHeight * 0.06,
                  width: 50,
                  height: 50,
                }}
                source={
                  navigationObject[
                    tempJsonEntries[i][1][0][1].customerCarImageKey
                   

                  ]
                }
              />
              <Text
                style={{
                  paddingLeft: windowHeight * 0.01,
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {" "}
                {tempJsonEntries[i][1][0][1].customerCarName}{" "}
              </Text>

              <Text
                style={{
                  alignItems: "flex-end",
                  color: "#35b8b6",
                  paddingLeft: windowHeight * 0.01,
                  fontWeight: "bold",
                  fontSize: 20,
                  position: "absolute",
                  left: windowWidth * 0.6,
                }}
              >
                {" "}
                {status}{" "}
              </Text>
            </View>

            {Images_list[i].map((img, index) => (
              <Image
                style={{
                  left: 90 + index * 35,
                  position: "absolute",
                  width: 25,
                  height: 25,
                }}
                source={myStyles[img]}
              />
            ))}

            <CheckBox
              style={{
                top: 40,
                right: 45,
                position: "absolute",
                width: 25,
                height: 25,
              }}
              value={isSelected}
              onValueChange={setSelection}
            />
          </BoxContainer>
        </TouchableOpacity>
      </View>
    );
  }

}
    
catch(err){
  console.log("MYERROR")
}



  

  }

  return (
    <ScrollView behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={myStyles.pageTop}>
          <Text style={myStyles.title}> Customer Responses </Text>
        </View>

        <View style={myStyles.container}>
          <SearchBar
            style={myStyles.containerinner}
            round
            searchIcon={{ size: 24 }}
            onChangeText={handleTextChange}
            placeholder="  Search Requests..."
          />
        </View>

        <View>
          <Text>{service_requests}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const navigationObject = {
  0: require("../../assets/car-images/civic.png"),
  1: require("../../assets/car-images/city.png"),
  2: require("../../assets/car-images/corolla.png"),
  3: require("../../assets/car-images/mehran.png"),
  4: require("../../assets/car-images/alto.png"),
  5: require("../../assets/car-images/vitz.png"),
  6: require("../../assets/car-images/lexus.png"),
  7: require("../../assets/car-images/bmw.png"),
  8: require("../../assets/car-images/bolan.png"),
  9: require("../../assets/car-images/accord.png"),
  10: require("../../assets/car-images/every.png"),
  11: require("../../assets/car-images/swift.png"),
  // Repearing a few cars for now
  12: require("../../assets/car-images/civic.png"),
  13: require("../../assets/car-images/city.png"),
  14: require("../../assets/car-images/corolla.png"),
  15: require("../../assets/car-images/mehran.png"),
  16: require("../../assets/car-images/alto.png"),
  17: require("../../assets/car-images/vitz.png"),
};

const myStyles = StyleSheet.create({
  checkbox: {
    position: "absolute",
    marginLeft: windowWidth * 0.65,
    left: 200,
  },
  0: require("../../assets/icons/oil-change.png"),
  1: require("../../assets/icons/battery-check.png"),
  2: require("../../assets/icons/automotive.png"),
  3: require("../../assets/icons/car-washing.png"),
  4: require("../../assets/icons/tyre-changing.png"),
  5: require("../../assets/icons/delivery-inspection.png"),
  6: require("../../assets/icons/car-cleaning.png"),
  7: require("../../assets/icons/conditioner-system-repair.png"),
  8: require("../../assets/icons/airbrush.png"),
  9: require("../../assets/icons/radiator.png"),
  10: require("../../assets/icons/brakes.png"),
  11: require("../../assets/icons/car-repair.png"),
  12: require("../../assets/icons/service.png"),

  pageTop: {
    marginTop: windowHeight * 0.01,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: windowHeight * 0.05,
    textAlign: "center",
  },

  signin: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    padding: 3,
  },
  useyouraccount: {
    fontSize: 9,

    textAlign: "center",
  },
  termsofservice: {
    fontSize: 4,
    padding: 10,
    textAlign: "center",
    marginLeft: 25,
    marginRight: 25,
  },
  pageBottom: {
    fontSize: 4,
    padding: 60,
    textAlign: "center",
    marginRight: 15,
    marginBottom: 25,
  },
  container: {
    paddingTop: 10,
  },
  containerinner: {
    backgroundColor: "white",
    color: "white",
    borderRadius: 10,
  },

  container1: {
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.07,
    backgroundColor: "white",
    height: 90,
  },

  button: {
    width: 80,
    height: 40,
    color: "white",
    backgroundColor: "white",
  },
});

export default SettingsCust;