import React, {Component} from 'react'
import {View} from 'react-native'
import firebase from 'firebase'
import {Header, Button, Spinner, CardSection} from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {
	state = {loggedIn: null}

	componentWillMount() {
		firebase.initializeApp({
		    apiKey: "AIzaSyDWs2jT_bqlDUpAdc1mMqGT0oHoat-c9F4",
		    authDomain: "authentication-b06e6.firebaseapp.com",
		    databaseURL: "https://authentication-b06e6.firebaseio.com",
		    storageBucket: "authentication-b06e6.appspot.com",
		    messagingSenderId: "493349378040"
		});

		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({loggedIn: true})
			}else{
				this.setState({loggedIn: false})
			}
		});
	}

	renderContent(){
		switch (this.state.loggedIn){
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}> 
							Log Out 
						</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />
			default:
				return <Spinner />
		}
	}

	render(){
		return(
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;