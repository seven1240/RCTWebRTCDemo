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

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

import verto from './verto/verto';
import { Verto } from './verto/verto';

export function verto_params() {
	var host = "192.168.7.7";
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
		this.state = {}
	}

	componentDidMount() {
		verto.connect(verto_params());
		console.log("aaaa");
	}

	render() {
		return <View>
		<Text>Hello</Text>
		<Text>Hello</Text>
		<Text>Hello</Text>

		</View>
	}
}

AppRegistry.registerComponent('RCTWebRTCDemo', () => VertoPhone);
