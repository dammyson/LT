import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';

import { CameraKitCamera } from 'react-native-camera-kit';
import { readFile as read, writeFile as write } from "react-native-fs";


export default class SignUpTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            operation_message: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            password: '',
            phone: '',
        };
    }
    onBottomButtonPressed(event) {
        console.warn(event);
        const captureImages = JSON.stringify(event.captureImages);
        Alert.alert(
            `${event.type} button pressed`,
            `${captureImages}`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
        );
    }
    async onCapture() {
        const image = await this.camera.capture();
       console.warn(image);
       
        
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'red',
            }}>
                <CameraKitCamera
                    actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                    onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
                    ref={(cam) => (this.camera = cam)}
                    style={{
                        flex: 1,
                        backgroundColor: 'red',
                    }}
                    cameraOptions={{
                        flashMode: 'auto', // on/off/auto(default)
                        focusMode: 'on', // off/on(default)
                        zoomMode: 'on', // off/on(default)
                        ratioOverlay: '1:1', // optional
                        ratioOverlayColor: '#00000077', // optional
                    }}
                    captureButtonImage={require('./logo.png')}
                    onReadCode={(
                        event, // optional
                    ) => console.log(event.nativeEvent.codeStringValue)}
                    resetFocusTimeout={0} // optional
                    resetFocusWhenMotionDetected={true} // optional
                />
                <View style={{
                    backgroundColor: 'red',
                    height: 50
                }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.onCapture()} >
                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Create account</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    };

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    mainbody: {
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'center'
    },

});
