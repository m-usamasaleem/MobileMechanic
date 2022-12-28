import {
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BoxContainer from "../../components/screenSnippets/BoxContainer";
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import Constants from "expo-constants";
import BoxContainer1 from "../../components/screenSnippets/BoxContainer";

// You can import from local files
import DropDownPicker from "react-native-dropdown-picker";

//import SearchableDropdown component
import SearchableDropdown from "react-native-searchable-dropdown";

var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;
const items = [
  //name key is must.It is to show the text in front
  { id: 1, name: "angellist" },
  { id: 2, name: "codepen" },
  { id: 3, name: "envelope" },
  { id: 4, name: "etsy" },
  { id: 5, name: "facebook" },
  { id: 6, name: "foursquare" },
  { id: 7, name: "github-alt" },
  { id: 8, name: "github" },
  { id: 9, name: "gitlab" },
  { id: 10, name: "instagram" },
];
let check=true;
let check1=true;

const PreSignUp = (navigationProps) => {
  let [selectedImage, setSelectedImage] = React.useState(null);
  let [selectedImage1, setSelectedImage1] = React.useState(null);
  let [selectedImage2, setSelectedImage2] = React.useState(null);
  //let [check, setcheck] = React.useState(true);
  const [locationcheck, onChangelocationcheck] = React.useState(null);
  const [comment, onChangecomment] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openImagePickerAsync1 = async () => {
    console.log("CNIC FRONT")
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult1 = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult1.cancelled === true) {
      return;
    }
    setSelectedImage1({ localUri1: pickerResult1.uri });
  };


  let openImagePickerAsync2 = async () => {
    console.log("CNIC BACK")
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult2 = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult2.cancelled === true) {
      return;
    }
    setSelectedImage2({ localUri2: pickerResult2.uri });
  };

  const onButtonPress = () => {
    navigationProps.navigation.navigate("SignInMech");
  };


  if ((selectedImage !== null) && (check==true ) ) {
    
    check=false;
  console.log("check1",check)

    return (
      <ScrollView nestedScrollEnabled={true}>
      <View style={styles.pageTop_header}>
        <View>
          <BoxContainer style={styles.container1}>
            <Text style={styles.comments}>Location</Text>
            <TouchableOpacity style={styles.location}>

              <Image style={styles.location} source={styles[0]} />
            </TouchableOpacity>
            <SafeAreaView>
              <TextInput
                placeholder="Enter your location"
                multiline={true}
                numberOfLines={2}
                onChangeText={onChangelocationcheck}
                value={locationcheck}
                style={styles.input}
              />
            </SafeAreaView>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>Photos</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={{uri: selectedImage.localUri }} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Front</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync1}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={styles[1] }/>
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Back</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync2}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={styles[1]  }/>
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>
        <View>
          <BoxContainer style={styles.container10}>
            <Text style={styles.comments}>Interview Location</Text>
          </BoxContainer>
        </View>

        <View style={styles.container9}>
          <DropDownPicker
            items={[
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
            ]}
            searchable={true}
            searchablePlaceholder="Search"
            searchableError={() => <Text fontSize={16}>Not found</Text>}
            searchableStyle={{ fontSize: 18 }}
            containerStyle={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.08,
            }}
            placeholder="Please Select Location"
            style={{ backgroundColor: "#fafafa" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            dropDownMaxHeight={300}
            labelStyle={{ fontSize: 15 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
          />
        </View>
        <BoxContainer style={styles.container11}>
          <Text style={styles.comments_location}>Feedback</Text>
          <SafeAreaView>
            <TextInput
              placeholder="Add your feedback"
              multiline={true}
              numberOfLines={2}
              onChangeText={onChangecomment}
              value={comment}
              style={styles.input}
            />
          
          </SafeAreaView>
        </BoxContainer>
        <BoxContainer1 style={styles.container8}>
          <TouchableOpacity onPress={() => onButtonPress()}>
            <Text style={styles.updatebid_title}>REGISTER</Text>
          </TouchableOpacity>
        </BoxContainer1>
      </View>
    </ScrollView>
    );

 
  }


  if ((selectedImage1 !== null) && (check1==true ) ) {
    
    check1=false;
  console.log(check1)


    return (
      <ScrollView nestedScrollEnabled={true}>
      <View style={styles.pageTop_header}>
        <View>
          <BoxContainer style={styles.container1}>
            <Text style={styles.comments}>Location</Text>
            <TouchableOpacity style={styles.location}>
              <Image style={styles.location} source={styles[0]} />
            </TouchableOpacity>
            <SafeAreaView>
              <TextInput
                placeholder="Enter your location"
                multiline={true}
                numberOfLines={2}
                onChangeText={onChangelocationcheck}
                value={locationcheck}
                style={styles.input}
              />
            </SafeAreaView>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>Photos</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={{uri: selectedImage.localUri }} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Front</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync1}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={{uri: selectedImage1.localUri1 }} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Back</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync2}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={styles[1]  }/>
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>
        <View>
          <BoxContainer style={styles.container10}>
            <Text style={styles.comments}>Interview Location</Text>
          </BoxContainer>
        </View>

        <View style={styles.container9}>
          <DropDownPicker
            items={[
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
            ]}
            searchable={true}
            searchablePlaceholder="Search"
            searchableError={() => <Text fontSize={16}>Not found</Text>}
            searchableStyle={{ fontSize: 18 }}
            containerStyle={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.08,
            }}
            placeholder="Please Select Location"
            style={{ backgroundColor: "#fafafa" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            dropDownMaxHeight={300}
            labelStyle={{ fontSize: 15 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
          />
        </View>
        <BoxContainer style={styles.container11}>
          <Text style={styles.comments_location}>Feedback</Text>
          <SafeAreaView>
            <TextInput
              placeholder="Add your feedback"
              multiline={true}
              numberOfLines={2}
              onChangeText={onChangecomment}
              value={comment}
              style={styles.input}
            />
          </SafeAreaView>
        </BoxContainer>
        <BoxContainer1 style={styles.container8}>
          <TouchableOpacity onPress={() => onButtonPress()}>
            <Text style={styles.updatebid_title}>REGISTER</Text>
          </TouchableOpacity>
        </BoxContainer1>
      </View>
    </ScrollView>
    );
  }

  if ((selectedImage2 !== null)  ) {
    



    return (
      <ScrollView nestedScrollEnabled={true}>
      <View style={styles.pageTop_header}>
        <View>
          <BoxContainer style={styles.container1}>
            <Text style={styles.comments}>Location</Text>
            <TouchableOpacity style={styles.location}>
              <Image style={styles.location} source={styles[0]} />
            </TouchableOpacity>
            <SafeAreaView>
              <TextInput
                placeholder="Enter your location"
                multiline={true}
                numberOfLines={2}
                onChangeText={onChangelocationcheck}
                value={locationcheck}
                style={styles.input}
              />
            </SafeAreaView>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>Photos</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={{uri: selectedImage.localUri }} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Front</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync1}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={{uri: selectedImage1.localUri1 }} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Back</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync2}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto}  source={{uri: selectedImage2.localUri2 }}/>
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>
        <View>
          <BoxContainer style={styles.container10}>
            <Text style={styles.comments}>Interview Location</Text>
          </BoxContainer>
        </View>

        <View style={styles.container9}>
          <DropDownPicker
            items={[
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
            ]}
            searchable={true}
            searchablePlaceholder="Search"
            searchableError={() => <Text fontSize={16}>Not found</Text>}
            searchableStyle={{ fontSize: 18 }}
            containerStyle={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.08,
            }}
            placeholder="Please Select Location"
            style={{ backgroundColor: "#fafafa" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            dropDownMaxHeight={300}
            labelStyle={{ fontSize: 15 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
          />
        </View>
        <BoxContainer style={styles.container11}>
          <Text style={styles.comments_location}>Feedback</Text>
          <SafeAreaView>
            <TextInput
              placeholder="Add your feedback"
              multiline={true}
              numberOfLines={2}
              onChangeText={onChangecomment}
              value={comment}
              style={styles.input}
            />
          </SafeAreaView>
        </BoxContainer>
        <BoxContainer1 style={styles.container8}>
          <TouchableOpacity onPress={() => onButtonPress()}>
            <Text style={styles.updatebid_title}>REGISTER</Text>
          </TouchableOpacity>
        </BoxContainer1>
      </View>
    </ScrollView>
    );
  }




  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.pageTop_header}>
        <View>
          <BoxContainer style={styles.container1}>
            <Text style={styles.comments}>Location</Text>
            <TouchableOpacity style={styles.location}>
              <Image style={styles.location} source={styles[0]} />
            </TouchableOpacity>
            <SafeAreaView>
              <TextInput
                placeholder="Enter your location"
                multiline={true}
                numberOfLines={2}
                onChangeText={onChangelocationcheck}
                value={locationcheck}
                style={styles.input}
              />
            </SafeAreaView>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>Photos</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={styles[1]} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Front</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync1}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={styles[1]} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>

        <View>
          <BoxContainer style={styles.container3}>
            <Text style={styles.comments}>CNIC Back</Text>
            <BoxContainer style={styles.container4}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.pickphoto}
              >
                <Image style={styles.pickphoto} source={styles[1]} />
              </TouchableOpacity>
            </BoxContainer>
          </BoxContainer>
        </View>
        <View>
          <BoxContainer style={styles.container10}>
            <Text style={styles.comments}>Interview Location</Text>
          </BoxContainer>
        </View>

        <View style={styles.container9}>
          <DropDownPicker
            items={[
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
              { label: "USA", value: "usa" },
            ]}
            searchable={true}
            searchablePlaceholder="Search"
            searchableError={() => <Text fontSize={16}>Not found</Text>}
            searchableStyle={{ fontSize: 18 }}
            containerStyle={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.08,
            }}
            placeholder="Please Select Location"
            style={{ backgroundColor: "#fafafa" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            dropDownMaxHeight={300}
            labelStyle={{ fontSize: 15 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
          />
        </View>
        <BoxContainer style={styles.container11}>
          <Text style={styles.comments_location}>Feedback</Text>
          <SafeAreaView>
            <TextInput
              placeholder="Add your feedback"
              multiline={true}
              numberOfLines={2}
              onChangeText={onChangecomment}
              value={comment}
              style={styles.input}
            />
          </SafeAreaView>
        </BoxContainer>
        <BoxContainer1 style={styles.container8}>
          <TouchableOpacity onPress={() => onButtonPress()}>
            <Text style={styles.updatebid_title}>REGISTER</Text>
          </TouchableOpacity>
        </BoxContainer1>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  0: require("../../assets/icons/current_location.png"),
  1: require("../../assets/icons/pickphoto.png"),
  pageTop_header: {
    marginTop: windowHeight * 0.05,
  },
  container8: {
    marginTop: windowHeight * 0.01,
    paddingRight: windowWidth * 0.03,
    paddingLeft: windowWidth * 0.03,
    backgroundColor: "#35b8b6",
    height: windowHeight * 0.09,
    bottom: windowHeight * 0.13,
    width: windowWidth * 0.8,
    justifyContent: "center",
    left: windowWidth * 0.05,
    right: windowWidth * 0.05,
  },
  updatebid_title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    left: windowWidth * 0.22,
    right: windowHeight * 0.22,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.06,
    height: windowHeight * 0.06,
    position: "absolute",
    marginLeft: windowWidth * 0.06,
    right: windowWidth * 0.03,
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#35b8b6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    position: "relative",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  pickphoto: {
    marginBottom: windowHeight * 0.06,
    borderRadius: 500,
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    position: "absolute",
    marginLeft: windowWidth * 0.06,
    right: windowWidth * 0.02,
  },
  input: {
    paddingTop: 0.01 * windowHeight,
    left: 0.01 * windowHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  comments: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.01,
    top: windowHeight * 0.01,
  },
  comments_location: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.01,
    top: windowHeight * 0.01,
  },
  photosText: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.01,
    top: windowHeight * 0.1,
  },
  photos: {
    paddingLeft: windowHeight * 0.01,
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    position: "absolute",
    left: windowWidth * 0.04,
    top: windowHeight * 0.01,
  },
  container1: {
    borderRadius: windowWidth * 0.07,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.07,
    backgroundColor: "white",
    height: windowHeight * 0.1,
  },
  container2: {
    left: windowWidth * 0.06,

    borderRadius: windowWidth * 0.07,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.07,
    height: windowHeight * 0.1,
  },
  container3: {
    borderRadius: windowWidth * 0.07,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.07,
    height: windowHeight * 0.2,
  },
  container4: {
    borderRadius: windowWidth * 0.05,
    backgroundColor: "white",
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    left: windowHeight * 0.0,
    top: windowHeight * 0.07,
    position: "absolute",
  },
  container9: {
    left: windowHeight * 0.01,
    borderRadius: windowWidth * 0.07,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.07,
    height: windowHeight * 0.2,
    bottom: windowHeight * 0.03,
  },
  container10: {
    borderRadius: windowWidth * 0.07,
    paddingLeft: windowWidth * 0.03,
    paddingTop: windowWidth * 0.07,
    height: windowHeight * 0.01,
  },
  container11: {
    height: windowHeight * 0.14,
    bottom: windowHeight * 0.09,
    backgroundColor: "white",
    marginBottom: windowHeight * 0.05,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  container7: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },
});

export default PreSignUp;
