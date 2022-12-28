import React from 'react';
import './components/screenSnippets/FirebaseInit'
import StackNavigator from './routes/StackWrapper'
import TabNavigator from './routes/CustTabsWrapper'
import CustLocation from './components/screens/CustLocation'
//import RatingReviews from './components/screens/RatingReviews'
const App = () => {
    return (
        //<RatingReviews />
        <StackNavigator />
        //<CustLocation />
        // <TabNavigator /> 
    );
}
export default App

// Remember, you should always return stackNavigator from here.
