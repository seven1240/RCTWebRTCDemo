'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ListView,
  Platform,
} from 'react-native';

import verto from './verto/verto';
import { Verto } from './verto/verto';

export function verto_params() {
	var host = "seven.local";
	var url = "wss://" + host + ":8082/ws";
	var username = "1000"; //localStorage.getItem('xui.username');
	var password = "1234"; //localStorage.getItem('xui.password');
	// var vid_width = localStorage.getItem("phone.video.width");

	return {
		login: username + "@" + host,
		passwd: password,
		socketUrl: url,
		tag: "webcam",
		ringFile: "/assets/sounds/bell_ring2.mp3",
		iceServers: [
			// { url: 'stun:[YOUR_STUN_SERVER]',}
		],
		deviceParams: {
			useMic: 'any',
			useSpeak: 'any'
		}
	}
}

export const verto_callbacks = {
	onMessage: function(verto, dialog, msg, data) {
		console.log("GOT MSG", msg);

		switch (msg) {
		case Verto.enum.message.pvtEvent:
			console.error("pvtEvent", data.pvtData);
			break;
		case Verto.enum.message.display:
			break;
		default:
			break;
		}
	},

	onDialogState: function(d) {
		fire_event("verto-dialog-state", d);
	},

	onWSLogin: function(v, success) {
		console.log("onWSLogin", v);
		console.log("onWSLogin", success);
		verto_loginState = true;
		verto.domain = domain;

		if (!success) {
			console.log("verto-login-error", v);
			return;
		}
	},

	onWSClose: function(v, success) {
		console.log("onWSClose", v);
	},

	onEvent: function(v, e) {
		console.debug("GOT EVENT", e);
	}
};

class VertoPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {destNumber: "9196"}
	}

	componentDidMount() {
		verto.connect(verto_params());
		console.log("aaaa");
	}

	makeCall() {
		console.log("calling", this.state.destNumber);

		verto.newCall({
			destination_number: this.state.destNumber,
			caller_id_name: '1000',
			caller_id_number: '1000',
			useVideo: false,
			useCamera: false,
			useMic: 'any',
			useSpeak: 'any',
			useStereo: true,
			outgoingBandwidth: 'default',
			incomingBandwidth: 'default',
			deviceParams: {
				useMic: 'any',
				useSpeak: 'any',
				useCamera: 'any'
			}
		});
	}

	render() {
		return <View style={styles.container}>
			<Text>Hello</Text>

			<View>
				<TextInput
					onChangeText={value => this.setState({destNumber: value})}
					value={this.state.destNumber}
				/>

			</View>
			<View>
				<TouchableHighlight
					onPress={this.makeCall.bind(this)}>
					<Text>Call</Text>
				</TouchableHighlight>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	selfView: {
		width: 200,
		height: 150,
	},

	remoteView: {
		width: 200,
		height: 150,
	},

	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F5FCFF',
	},

	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},

	listViewContainer: {
		height: 150,
	},
});


AppRegistry.registerComponent('RCTWebRTCDemo', () => VertoPhone);
