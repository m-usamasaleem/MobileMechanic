// CAUTION: DO NOT RUN THIS FILE AGAIN!!

// THIS FILE IS SUPPOSED TO CREATE ONLY DUMMY DATA IN mobileMechanic FOR TESTING

// IF YOU RUN THIS FILE AGAIN, IT WILL ERASE ALL THE ACTUAL DATA, 
// AND REPLACE IT WITH THIS STUPID DUMMY DATA

import * as firebase from 'firebase'

let dummyAdmin = {
    userID: '001', 
    firstName: 'Uzair', 
    lastName: 'Afzal'
};

let dummyClient = {
    userID: '001', 
    firstName: 'Furqan', 
    lastName: 'Ather'
};

let dummyMechanic = {
    userID: '3520219876342', // ID card number 
    firstName: 'Raza', 
    lastName: 'Ilahi'
};

console.log('Creating Collections and Dummy Data ...');

firebase.database().ref('mobileMechanic/Admins/001').set(dummyAdmin)
    .then( () => {
        console.log('Dummy Admin Set Successfully');
        firebase.database().ref('mobileMechanic/Clients/001').set(dummyClient)
            .then( () => {
                console.log('Dummy Client Set Successfully');
                firebase.database().ref('mobileMechanic/Mechanics/3520219876342').set(dummyMechanic)
                    .then( () => {
                        console.log('Dummy Mechanic Set Successfully');
                    })
                    .catch( (error) => {
                        console.log('Error Occurred Setting Dummy Mechanic:', error);
                    });
            })
            .catch( (error) => {
                console.log('Error Occurred Setting Dummy Client:', error);
            });
    })
    .catch( (error) => {
        console.log('Error Occurred Setting Dummy Admin:', error);
    });

console.log('Successfully Created Collections and Dummy Data!!');