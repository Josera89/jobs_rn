import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL
} from './types';

// How to use AsynStorage: RETURNS A PROMISE
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

// export const facebookLogin = () => {
// 	return async function(dispatch) {
// 		let token = await AsyncStorage.getItem('fb_token');
// 			console.log(1);
// 		if (token) {
// 			// Dispatch an action saying the login is done
// 			console.log(2);
// 			dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
// 		} else {
// 			// start up fb login process
// 			console.log(3);
// 			doFacebookLogin(dispatch);
// 		}
// 	}
// };

export const facebookLogin = () => async dispatch => {
	let token = await AsyncStorage.getItem('fb_token');
	console.log(1);
	if (token) {
		// Dispatch an action saying the login is done
		console.log(2);
		dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
	} else {
		//Start up fb login process
		console.log(3);
		doFacebookLogin(dispatch);
;	}
}

const doFacebookLogin = async dispatch => {
	console.log(5);
	let { type, token } = await Facebook.logInWithReadPermissionsAsync('427913151023407', {
		permissions: ['public_profile']
	});

	if (type === 'cancel') {
		console.log(6)
		return dispatch({ type: FACEBOOK_LOGIN_FAIL })
	}
	console.log(7)
	await AsyncStorage.setItem('fb_token', token);
	dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}; 

