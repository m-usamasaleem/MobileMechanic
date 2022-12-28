import { Formik } from 'formik'
import React from 'react' 
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native' 
import firebase from "../../components/screenSnippets/FirebaseInit";
import StarRating from 'react-native-star-rating'


const RatingReviews = (navigationProps) => {
    //fetch parameters from navigation
    const userId = navigationProps.navigation.getParam('userId')
    const userLabel = navigationProps.navigation.getParam('userLabel')
    const reviewBy = navigationProps.navigation.getParam('reviewBy')
    const nextScreen = navigationProps.navigation.getParam('nextScreen')
    const params = navigationProps.navigation.getParam('params')

    const path = `mobileMechanic/${userLabel}/${userId}`
    
    let userRating = 0
    let numRatedBy = 0
    
    //get existing values from database if any
    firebase.database().ref(`${path}/rating/value`).once('value', (data) => {
        if(data){
            userRating = parseFloat(JSON.stringify(data));
        }
    });
    // firebase.database().ref(`${path}/rating/count`).once('value', (data) => {
    //     if(data){
    //         numRatedBy = parseInt(JSON.stringify(data));
    //     }
    // });

    const updateDataBase = (rating, review) =>{
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let today = date + '-' + month + '-' + year;
        
        let newRating
        if(userRating > 0){
            newRating = (userRating + parseFloat(rating))/2 //if rating exists in database, average out to get updated value
        } else{
            newRating = rating
        }
        console.log(`newRating ${newRating}`)
        firebase.database().ref(`${path}`).update({
          rating : newRating  //increment number of ratings
        }).then( () => {
            firebase.database().ref(`${path}/reviews`).push({   //if rating successfuly updated, push review
                date: today,
                value: rating,
                text: review.trim(),
                by: reviewBy
            }).then( () => {    //if review successfuly pushed, notify user
                Alert.alert(
                    'Thankyou for sharing!',
                    'Your feedback will help others make better choices :)',
                    [ 
                        { 
                            text: "Done", 
                            onPress: () => navigationProps.navigation.navigate(nextScreen,params)
                        },
                        {
                            text: "Cancel",
                            onPress: () => console.log("cancel alert button")
                        }
                    ]
                )
            }).catch((error) => console.log("hashim")) //todo: handle errors
        }).catch((error)=>console.log("hashim"))
    }

    const handleCancel = () => {
      Alert.alert(
        'Are you sure you want to cancel review?',
        'This action is not reversible.',
        [ 
            { 
                text: "Yes", 
                onPress: () => navigationProps.navigation.navigate(nextScreen,params)
            },
            {
                text: "No",
            }
        ]
    )
    }

    return(
        <Formik
        initialValues={{ review: "", rate: 0 }}
        onSubmit={(formData, actions) => {
          console.log("Form Data:", formData);
          updateDataBase(formData.rate, formData.review)
        }}
      >
        {(formikProps) => {
          return (
            <View style={myStyles.form}>
              <Text style = { myStyles.title  }> Rate & Review </Text>

              {/* Star Rating */}
              <StarRating
                buttonStyle = {myStyles.starRating}
                containerStyle = {myStyles.starRatingContainer}
                disabled={false}
                disabled={false}
                halfStarEnabled = {true}
                maxStars={5}
                rating={formikProps.values.rate}
                fullStarColor={'orange'}
                emptyStarColor={'black'}
                starSize= {40}
                starStyle = {myStyles.starStyle}
                selectedStar = {(rating)=>{formikProps.setFieldValue("rate", rating)}}
              />

              
              <Text style = { myStyles.subtitle  }> Review </Text>
              
              {/* reviewBox */}
              <TextInput
                multiline
                style={myStyles.reviewBox}
                placeholder="Please type your review here"
                onChangeText={formikProps.handleChange("review")}
                value={formikProps.values.review}
              />
              <TouchableOpacity
                style={myStyles.postButton}
                onPress={formikProps.handleSubmit}
                underlayColor="#fff"
              >
                <Text style={myStyles.loginText}>Post Review</Text>
              </TouchableOpacity>

              {/* add cancel button */}
              <TouchableOpacity
                style={myStyles.cancelButton}
                onPress={()=>{handleCancel()}}
                underlayColor="#fff"
              >
                <Text style={myStyles.loginText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    );
}

const myStyles = StyleSheet.create({
    form: {
      textAlign: "center",
    },
    starRating: {
      marginRight: '4%',
      marginLeft: '6%',
      height: 40,
      width: 40,
    },
    starRatingContainer: {
      margin: '10%',
      alignContent: 'center',
    },
    starStyle: {
      margin: '2%',
    },
    reviewBox: {
      marginTop: '3%',
      height: 120,
      width: '86%',
      margin: 2,
      borderWidth: 1,
      padding: 5,
      textAlignVertical: 'top',
      color: "black",
      borderRadius: 10,
      marginLeft: '7%',
      marginRight: '7%',
      marginBottom: 10
    },
    continueButton: {
      backgroundColor: "red",
    },
    postButton: {
      marginRight: '18%',
      marginLeft: '18%',
      marginTop: 30,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#35b8b6",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#fff",
      position: "relative",
      borderRadius: 30,
    },
    cancelButton: {
      marginRight: '18%',
      marginLeft: '18%',
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#7f7f7f",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#fff",
      position: "relative",
      borderRadius: 30,
    },
    loginText: {
      fontSize: 15,
      color: "#fff",
      textAlign: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 35,
      marginTop: '12%',
      textAlign: 'center',
      padding: 15,
      paddingBottom: '10%',
      borderBottomWidth: 1,
      marginBottom: '5%',
    },
    subtitle: {
      fontSize: 23,
      textAlign: 'left',
      padding: 15,
      paddingLeft: 0,
      marginLeft: '7%',
    },
    button: {
      backgroundColor: "#00aeef",
      borderColor: "red",
      borderWidth: 5,
      borderRadius: 15,
    },
    formError: {
      color: "red",
      fontSize: 12,
      textAlign: "center",
    },
    
  });
export default RatingReviews
