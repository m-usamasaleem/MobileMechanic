import React, {useState, useEffect} from "react";
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { FontAwesome, Ionicons, Entypo, Feather } from "@expo/vector-icons";
import firebase from "../../components/screenSnippets/FirebaseInit";
import { SearchBar } from "react-native-elements";
import BoxContainer from "../../components/screenSnippets/BoxContainer";

var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;

const SettingsCust = (tabsNavigationProps) => {
  const [isSelected, setSelection] = React.useState(null);
  const [state, setState] = React.useState({ count: 0, count2: 100 });
  const [update, setUpdate] = React.useState(false)
  const toggleUpdate = () => { setUpdate(!update) }

  function handleClick() {
    forceUpdate();
  }
  let cnic_mechanic = tabsNavigationProps.navigation.getParam("usercnic");
  var service_requests = [];
  var customers_status = {};

  const handleTextChange = () => {
    console.log(`You wrote something in the input text field ...`);
  };

  const [firebaseDataJSON_entries, setEntries]=React.useState({})

  const getRequests = () =>{
    firebase
    .database()
    .ref(`mobileMechanic/userRequests/`)
    .once("value", (data) => {


      let firebaseDataString = JSON.stringify(data); // JavaScript object to string
      let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
      try{
        setEntries(Object.entries(firebaseDataJSON))
      }catch(err){
        console.log("No Requests")
      }
      

    });
  }
  const pressHandler = (object) => {
    tabsNavigationProps.navigation.navigate("ProfileMech", {
      customer_object: object,
      cnicMechanic: cnic_mechanic,
    });
  };
  React.useEffect(()=>{
    getRequests()
    let timer1 = setTimeout(toggleUpdate, 5000)
    return () => {
      clearTimeout(timer1)
    }
  }, [update])



  if (firebaseDataJSON_entries){
    try{

   

  let Images_list = [];
  for (let x = 0; x < firebaseDataJSON_entries.length; x++) {
    let temp_images = [];
    let shopping_cart = firebaseDataJSON_entries[x][1].customerShoppingCart;
    let keys = Object.keys(firebaseDataJSON_entries[x][1].customerShoppingCart);
    let enteries_item = Object.entries(shopping_cart);
    let length_items = enteries_item.length;
    for (let y = 0; y < length_items; y++) {
      temp_images.push(enteries_item[y][1].carImageKey);
    }
    Images_list.push(temp_images);
  }

 
  for (let i = 0; i < firebaseDataJSON_entries.length; i++) {
    //let status= (firebaseDataJSON_entries[i][1].mechanicCNIC)
    let status="Pending";
    firebase
      .database()
      .ref(`mobileMechanic/mechanicResponse/${firebaseDataJSON_entries[i][0]}`)
      .on("value", (data) => {

        let firebaseDataString = JSON.stringify(data); // JavaScript object to string
        let setMechanicResponse = JSON.parse(firebaseDataString); // String to JSON

        try {
          if(setMechanicResponse[cnic_mechanic]) {
            status="Placed"
          }
        }
        catch(err) {
          console.log("Not founded")
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
          onPress={() => pressHandler(firebaseDataJSON_entries[i])}
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
                    firebaseDataJSON_entries[i][1].customerCarImageKey
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
                {firebaseDataJSON_entries[i][1].customerCarName}{" "}
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
                top:40,
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
}catch(err){

  console.log("No Reqeusts")
}
}
  return (
    <ScrollView behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={myStyles.pageTop}>
          <Text style={myStyles.title}> Service Requests </Text>
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
