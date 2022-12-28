
import React, { Component, useEffect } from 'react';
import firebase from "../../components/screenSnippets/FirebaseInit";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,ScrollView,
  Dimensions,SafeAreaView,TextInput
} from 'react-native';
import BoxContainer from "../../components/screenSnippets/ProfileBoxContainer";
import BoxContainer1 from "../../components/screenSnippets/BoxContainer";
import StarRating from 'react-native-star-rating';
import { Divider } from 'react-native-elements';
import { acc } from 'react-native-reanimated';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
let name = "Ford Mustang, 2017";


  const CustWorkUnderProgress = (navigationProps) => {

    //const [description, setdescription] = useState(" "); 

    
        
    let userEmail = navigationProps.navigation.getParam('userEmail')
    let cnic = navigationProps.navigation.getParam('cnic')
    let array = navigationProps.navigation.getParam('array')
    let charges = navigationProps.navigation.getParam('charges')
    let wallet = navigationProps.navigation.getParam('wallet')

    const path = `mobileMechanic/userRequests/${userEmail}`;



  //let customer_object=navigationProps.navigation.getParam('customer_object');
  let customer_object_email=cnic;
  let customer_object_info;
  firebase.database().ref(path).once('value', (data) => {
    let firebaseDataString = JSON.stringify(data); // JavaScript object to string
    let firebaseDataJSON = JSON.parse(firebaseDataString); // String to JSON
    customer_object_info = firebaseDataJSON
        });
    console.log("customer object :",customer_object_info);

  //let customer_object_entries=Object.entries(customer_object[0]);
  let star_gray = require("../../assets/icons/star_gray.png");
  let star_yellow = require("../../assets/icons/star_yellow.png");
  let image = require("../../assets/icons/car-cleaning.png");
  let message= require("../../assets/icons/message.png");
  let call = require("../../assets/icons/call.png");
  let gender= require("../../assets/icons/gender.png");
  let age = require("../../assets/icons/age.png");
  let accept= require("../../assets/icons/accept.png");
  let reject = require("../../assets/icons/reject.png");
  let rate = require("../../assets/icons/rate.png");
  let location = require("../../assets/icons/location.png");
  let image1 = require("../../assets/icons/airbrush.png");
  let image2 = require("../../assets/icons/radiator.png");
  let image3 = require("../../assets/icons/brakes.png");
  let car_image= require('../../assets/car-images/corolla.png')
  let date_image= require('../../assets/icons/date1.png')
  let work_under= require('../../assets/icons/work_under.png')


  let Images_list=[]
  let shopping_cart=customer_object_info.customerShoppingCart; 
  let keys =Object.keys(shopping_cart);
  let enteries_item= Object.entries(shopping_cart);
  for(let x = 0; x < enteries_item.length; x++){

    Images_list.push(enteries_item[x][1].carImageKey)

  }
  console.log(Images_list )


  useEffect(() => {
    const listener = firebase.database().ref(`mobileMechanic/mechanicLocations/${cnic}/workdone`).on('value', (data) => {
        let firebaseDataString = JSON.stringify(data); // JavaScript object to string
        let arrived = JSON.parse(firebaseDataString); // String to JSON
        if (arrived) {
            navigationProps.navigation.navigate('Payments', {
                cnic: cnic,
                userEmail: userEmail,
                array: array,
                charges: charges,
                wallet: wallet,
            })
        }
        // console.log("arrived :",arrived)
    });
    return () =>
      firebase.database()
        .ref(`mobileMechanic/mechanicLocations/${cnic}/workdone`)
        .off('value', listener);
    
  }, [])
 
  



//
const pressHandler = (object) => {
  console.log("navigationProps")
  navigationProps.navigation.navigate("ProfileMech",{customer_object:object} );
};
    return (
      <React.Fragment> 
      <ScrollView behavior="padding"> 

      <View style={styles.pageTop_header}>
          <Text style={styles.title_header}> Work Under Process</Text>
          <Image source={work_under} />

        </View>



        <View
  style={{
    padding:10,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
  }}
/>
<View>
  <View style={{marginTop: windowHeight * 0.00,marginBottom: windowHeight * 0.03,}}>
  <BoxContainer style={styles.container1}>
    <View style={{ flexDirection: "row" }}>
    <TouchableOpacity style={styles.call}   ><Image style={styles.call}source={call} /></TouchableOpacity> 
    <TouchableOpacity style={styles.message}   ><Image style={styles.call}source={message} /></TouchableOpacity>       
    <Image style={styles.profile}source={navigationObject[customer_object_info.customerCarImageKey]} />
    <Image style={styles.age}source={age} />
    
    <Image style={styles.gender}source={gender} />
      <Text  style={styles.profilename}  >{" "}{customer_object_email}{" "} </Text>
      <Text  style={styles.gender_info}  >Male </Text>
      <Text  style={styles.age_info}  >32 </Text>
      <Image style={styles.accept}source={accept} />
      <Image style={styles.reject}source={reject} />
      <Image style={styles.rate}source={rate} />
      <Text  style={styles.acceptance_value}  >90% </Text>
      <Text  style={styles.rejection_value}  >10% </Text>
      <Text  style={styles.rating_value}  > 4.75 </Text>
      <Text  style={styles.acceptance_info}  >Acceptance</Text>
      <Text  style={styles.rejection_info}  >Rejection </Text>
      <Text  style={styles.rating_info}  > Rating </Text>
      < View style={styles.rating} >
            <StarRating disabled
             maxStars={5}
             rating={4}
             starSize={22}
             fullStar={star_yellow}
             emptyStar={star_gray}
      /></View>



      </View>
      </BoxContainer>
      </View>
  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
    <BoxContainer1 style={styles.container2}>
      <View style={{ flexDirection: "row" }}>
        <Image  style={styles.location} source={location}/>
        <Text style={styles.location_text}>Toyata Motors Street # 8, House 6, Bosan Rd, Shalimar Colony, Multan.
        </Text>
      </View>
    </BoxContainer1>
  </View>


  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
    <BoxContainer1 style={styles.container3}>
      <Text  style={styles.services}>Services</Text>
      <View  style={styles.services_images} > 
      {Images_list.map((img, index) => <Image  style={{
         width:windowHeight * 0.04,
          height:windowHeight * 0.04 , 
          position:'absolute',   
          left:windowWidth * (0.03  + index*0.1),
          top:windowWidth * 0.01,
      }} source={ styles[img]   } />)}
        </View>
    </BoxContainer1>
  </View>










  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
    <BoxContainer1 style={styles.container3}>
      <Text  style={styles.services}>Photos</Text>
      <View  style={styles.services_images} > 
        <Image  style={{     width:windowHeight * 0.04, height:windowHeight * 0.04 , position:'absolute',   left:windowWidth * 0.03,top:windowWidth * 0.01,}} source={navigationObject[customer_object_info.customerCarImageKey]}/>
        <Image  style={{ width:windowHeight * 0.04, height:windowHeight * 0.04 , position:'absolute',    left:windowWidth * 0.13,top:windowWidth * 0.01,}}source={navigationObject[customer_object_info.customerCarImageKey]}/>
        <Image  style={{  width:windowHeight * 0.04, height:windowHeight * 0.04 ,position:'absolute',    left:windowWidth * 0.24,top:windowWidth * 0.01,}}source={navigationObject[customer_object_info.customerCarImageKey]}/></View>
    </BoxContainer1>
  </View>
  
  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
    <BoxContainer1 style={styles.container3}>
      <Text  style={styles.services}>Vehicle</Text>
      <View  style={styles.services_images} >  
        <Text  style={{  color:'#8894c3',fontSize: 10,   position:'absolute',   left:windowWidth * 0.03,}} >Car Name: {customer_object_info.customerCarName}</Text>
        <Text  style={{  color:'#8894c3',fontSize: 10,  position:'absolute',    left:windowWidth * 0.03,top:windowWidth * 0.035,}}>Car Model:{customer_object_info.customerCarModel}</Text>
        <Text  style={{  color:'#8894c3',fontSize: 10, position:'absolute',    left:windowWidth * 0.03,top:windowWidth * 0.07,}}>Car Number:{customer_object_info.customerCarNumber}</Text></View>
    </BoxContainer1>
  </View>

  {/* <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
    <BoxContainer1 style={styles.container3}>
    <Text  style={styles.comments}>Comments</Text>
      <SafeAreaView>
      <TextInput
       placeholder = "Add your comments"
       multiline={true}
       numberOfLines={2}
       onChangeText={(text) => setdescription(text)}
       value=""
       style={styles.input}/>
       </SafeAreaView>
    </BoxContainer1>
  </View>

  
  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
    <BoxContainer1 style={styles.container6}>
      <Text  style={styles.bid_title}>Bid Amount</Text>
      <Text  style={styles.schedule_date}>Scheduled Date</Text>
      <Text  style={styles.schedule_date_time}>{ customer_object_info.orderDateTime.date }{"-"}{customer_object_info.orderDateTime.month}{"-"}{customer_object_info.orderDateTime.year} | {customer_object_info.orderDateTime.time.hrs}{":"}{customer_object_info.orderDateTime.time.mins}{":"}{customer_object_info.orderDateTime.time.secs} </Text>
      <View  style={styles.services_images} >  
      <Image  style={styles.schedule_date_image} source={date_image}/>
      <BoxContainer style={styles.container5}>
      <TextInput 
        style = { styles.input_bid }
        placeholder = "Enter Your Bid"
        onChangeText = {(text) => setdescription(text)}
        value = ""
        keyboardType = 'numeric'
        />
      </BoxContainer>
         </View>
    </BoxContainer1>

  </View>

  
  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
  <TouchableOpacity onPress={() => pressHandler(customer_object_info)} >

    <BoxContainer1 style={styles.container7}>
      <Text  style={styles.accept_title}>Accept</Text>
    </BoxContainer1>
    </TouchableOpacity>   
  </View>


  <View style={{marginBottom:windowHeight * 0.005,marginTop:windowHeight * 0.005}}>
  <TouchableOpacity onPress={() => pressHandler()} >
    <BoxContainer1 style={styles.container8}>
      <Text  style={styles.accept_title}>Reject</Text>
    </BoxContainer1>
   </TouchableOpacity>   
  </View> */}





</View>

      </ScrollView> 
      </React.Fragment> 
    );
  }


  const navigationObject = {
    0: require('../../assets/car-images/civic.png'), 
    1: require('../../assets/car-images/city.png'),
    2: require('../../assets/car-images/corolla.png'),
    3: require('../../assets/car-images/mehran.png'),
    4: require('../../assets/car-images/alto.png'),
    5: require('../../assets/car-images/vitz.png'),
    6: require('../../assets/car-images/lexus.png'),
    7: require('../../assets/car-images/bmw.png'),
    8: require('../../assets/car-images/bolan.png'),
    9: require('../../assets/car-images/accord.png'), 
    10: require('../../assets/car-images/every.png'),   
    11: require('../../assets/car-images/swift.png'), 
    // Repearing a few cars for now
    12: require('../../assets/car-images/civic.png'), 
    13: require('../../assets/car-images/city.png'),
    14: require('../../assets/car-images/corolla.png'),
    15: require('../../assets/car-images/mehran.png'),
    16: require('../../assets/car-images/alto.png'),
    17: require('../../assets/car-images/vitz.png'),
}

const styles = StyleSheet.create({

  0: require('../../assets/icons/oil-change.png'), 
  1: require('../../assets/icons/battery-check.png'),
  2: require('../../assets/icons/automotive.png'),
  3: require('../../assets/icons/car-washing.png'),
  4: require('../../assets/icons/tyre-changing.png'),
  5: require('../../assets/icons/delivery-inspection.png'),
  6: require('../../assets/icons/car-cleaning.png'),
  7: require('../../assets/icons/conditioner-system-repair.png'),
  8: require('../../assets/icons/airbrush.png'),
  9: require('../../assets/icons/radiator.png'), 
  10: require('../../assets/icons/brakes.png'),   
  11: require('../../assets/icons/car-repair.png'),
  12: require('../../assets/icons/service.png'), 
  pageTop_header: {
    marginTop: windowHeight * 0.01,
  },
  title_header: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: windowHeight * 0.05,
    textAlign: "center",
    color:"black"
  },
  input: {
    paddingTop:0.02*windowHeight
},
input_bid: {
  paddingTop:0.02*windowHeight,
  left:0.02*windowHeight,
},
  heading3: {
    paddingTop: 0.02*windowHeight,
    borderBottomWidth:1,
    borderRadius: 20,
    borderColor:'#fee',
    flexDirection: 'row',
},
  pageTop: {
    marginTop: windowHeight * 0.01,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: windowHeight * 0.05,
    textAlign: "center",
  },


  container1: {
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.05,
    backgroundColor: "white",
    height: windowHeight * 0.4,
  },


  container2: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "white",
    height: windowHeight * 0.12,
    alignItems:"center"
  }, 
  container3: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "white",
    height: windowHeight * 0.12,
  },
  container4: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#35b8b6",
    height: windowHeight * 0.12,
  },
  container6: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#35b8b6",
    height: windowHeight * 0.15,
  },
  container7: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#58d400",
    height: windowHeight * 0.09,
    width:windowWidth * 0.65,
    justifyContent:'center',
    left:windowWidth * 0.1,
    right:windowWidth * 0.1,
  },
  container8: {
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "red",
    height: windowHeight * 0.09,
    width:windowWidth * 0.65,
    justifyContent:'center',
    left:windowWidth * 0.1,
    right:windowWidth * 0.1,
    
  },
  container5: {
    marginTop:windowHeight * 0.05,
    marginLeft:windowHeight * 0.015,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.0003,
    backgroundColor: "white",
    height: windowHeight * 0.05,
    width: windowWidth * 0.8,
    padding:4
  },
  call: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.06,
    height:windowHeight * 0.06 ,
    position: "absolute",
    marginLeft: windowWidth * 0.06,
    right:windowWidth * 0.03,
  },

  message: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.06,
    height:windowHeight * 0.06 ,
    position: "absolute",
    marginLeft: windowWidth * 0.06,
    right:windowWidth * 0.18,
  },
  age: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.035,
    height:windowHeight * 0.035 ,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    right:windowWidth * 0.18,
    top:windowHeight * 0.17,
  },
  gender: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.035,
    height:windowHeight * 0.035 ,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    right:windowWidth * 0.18,
    top:windowHeight * 0.1,
  },
  accept: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.035,
    height:windowHeight * 0.035 ,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left:windowWidth * 0.08,
    top:windowHeight * 0.25,
  },

  accept_bid: {
    position: "absolute",
    left:windowWidth * 0.25,
    width:windowHeight * 0.09,
    height:windowHeight * 0.09 ,
    top:windowHeight * 0.0,
    bottom: windowHeight * 0.4,
  },
  reject_bid: {
    left:windowWidth * 0.45,
    width:windowHeight * 0.09,
    height:windowHeight * 0.09 ,
    top:windowHeight * 0.0,
  },
  reject: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.035,
    height:windowHeight * 0.035 ,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left:windowWidth * 0.37,
    top:windowHeight * 0.25,
  },
  rate: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.035,
    height:windowHeight * 0.035 ,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left:windowWidth * 0.65,
    top:windowHeight * 0.25,
  },





   profile: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
    width:windowHeight * 0.08,
    height:windowHeight * 0.08 ,
    position: "absolute",
    marginLeft: windowWidth * 0.005,
    left:windowWidth * 0.005,
    top:windowWidth * 0.1,
  },


  location: {
    borderRadius: 500 ,
    width:windowHeight * 0.06,
    height:windowHeight * 0.06 ,
    marginLeft: windowWidth * 0.005,
    left:windowWidth * 0.005,
    top:windowWidth * 0.1,
    left: windowWidth * 0.03,
    top: windowHeight*0.03,
    alignItems:"center"
  },

  schedule_date_image: {
    position:'absolute',
    width:windowHeight * 0.04,
    height:windowHeight * 0.04 ,
    left: windowWidth * 0.489,
  },
  location_text:{
      paddingLeft: windowHeight * 0.05,
      fontSize: 15,
      padding: 20,
      color:"grey"

  },

  services_images: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500 ,
 
    position: "absolute",
    marginLeft: windowWidth * 0.005,

  },
  

  profilename: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color:"black",
    position: "absolute",
    left:windowWidth * 0.14,
    top:windowHeight * 0.06,
  },
  services: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color:"black",
    position: "absolute",
    left:windowWidth * 0.01,
    top:windowHeight * 0.01,
  },
  bid_title: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color:"white",
    position: "absolute",
    left:windowWidth * 0.01,
    top:windowHeight * 0.01,
  },

  accept_title: {
    fontWeight: "bold",
    fontSize: 25,
    color:"white",
    left:windowWidth * 0.2,
    right:windowHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  schedule_date: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 15,
    color:"white",
    position: "absolute",
    right:windowWidth * 0.03,
    top:windowHeight * 0.02,
  },
  schedule_date_time: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 8,
    color:"white",
    position: "absolute",
    right:windowWidth * 0.068,
    top:windowHeight * 0.05,
  },

  comments: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color:"black",
    position: "absolute",
    left:windowWidth * 0.01,
    top:windowHeight * 0.01,

  },
  gender_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",
    right:windowWidth * 0.06,
    top:windowHeight * 0.1,
    color:"#8894c3"

  },
  age_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    right:windowWidth * 0.1,
    top:windowHeight * 0.17,
    color:"#8894c3"

  },

  acceptance_value: {
    fontWeight: "bold",
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    left:windowWidth * 0.07,
    top:windowHeight * 0.29,
  },
  rejection_value: {
    fontWeight: "bold",
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    left:windowWidth * 0.36,
    top:windowHeight * 0.29,
  },
  rating_value: {
    fontWeight: "bold",
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    left:windowWidth * 0.62,
    top:windowHeight * 0.29,
  },


  acceptance_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    left:windowWidth * 0.001,
    top:windowHeight * 0.32,
    color:"grey"

  },
  rejection_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    left:windowWidth * 0.31,
    top:windowHeight * 0.32,
    color:"grey"
  },
  rating_info: {
    paddingLeft: windowHeight * 0.01,
    fontSize: 15,
    color:"black",
    position: "absolute",  
    left:windowWidth * 0.60,
    top:windowHeight * 0.32,
    color:"grey"

  },




  rating: {
    flexDirection: 'row',
     justifyContent: 'space-between',
     position: "absolute",
     left:windowWidth * 0.17,
     top:windowWidth * 0.18,
  },
  button: {
    width: 80,
    height: 40,
    color: "white",
    backgroundColor: "white",
  },


  header:{
    backgroundColor: "#FFFFFF",
    flexDirection: "row" 
  },
  headerContent:{
    padding:30,
  },
 
  name:{
    fontSize:22,
    color:"black",
    fontWeight:'600',
    position: "absolute",
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#35b8b6"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00CED1",
  },
  description:{
    fontSize:20,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'center'
  },
});

export default CustWorkUnderProgress
