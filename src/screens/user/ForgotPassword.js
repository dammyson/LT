import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions,
    Image,
    Keyboard,
    NativeModules,
    PermissionsAndroid,
    ImageBackground

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import colors from '../../components/theme/colors'
import { Container, Content, Toast } from 'native-base';
import { navigation } from '../../../rootNavigation'
import { connect } from 'react-redux'
import Success from '../../components/views/Success';
import CameraView from '../../components/CameraView';
import Loader from '../../components/loader/Loader';
import { baseUrl, setEmail, setToken, setIsFirst, setUserId, processResponse } from '../../utilities';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            image1: '',
            image1_display: '',
            is_valide_mail: false,
            done: false,
            show_camera: false
        };
    }

    async componentDidMount() {

    }



    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, is_valide_mail: false })
            return false;
        }
        else {
            this.setState({ email: text, is_valide_mail: true })
        }
    }

    updateSecureTextEntry = () => {
        this.setState({ secureTextEntry: this.state.secureTextEntry ? false : true })
    }

    async loginRequest() {
        const { email,  is_valide_mail } = this.state

        if (email == "") {
            Alert.alert('Validation failed', 'Email field cannot be empty', [{ text: 'Okay' }])
            return
        }
        if (!is_valide_mail) {
            Alert.alert('Validation failed', 'Email is invalid', [{ text: 'Okay' }])
            return
        }
        var payload = {
            email: email,

        }
        var formData = JSON.stringify(payload);

        this.setState({ loading: true })

        fetch(baseUrl() + 'accounts/forgot-password', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }, body: formData
        })
            .then(processResponse)
            .then(res => {
                const { statusCode, data } = res;
                console.warn(statusCode, data)
                this.setState({ loading: false })
                if (statusCode === 200) {
                    Toast.show({
                        text: 'Token sent to email, redirecting to change page  !',
                        position: 'top',
                        type: 'success',
                        buttonText: 'Dismiss',
                        duration: 2000
                    });
                    this.props.navigation.navigate('ChangePassword')
                    this.setState({ loading: false, done: true })
                } else if (statusCode === 500) {
                    alert(data.message)
                } else if (statusCode === 400) {
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
                alert(error.message);
            });
    }




    render() {
        const { user } = this.props
        if (this.state.loading) {
            return (
                <Loader message={'Verifying email...'} />
            );
        }
        
        return (
            <ImageBackground
                source={require('../../assets/background_dot.png')}
                resizeMode="repeat"
                style={styles.background}
            >
                <StatusBar backgroundColor='#fff' barStyle="dark-content" />
                <Container style={{ backgroundColor: 'transparent' }}>
                    <Content>
                        <View style={styles.backgroundImage}>
                            <View style={styles.mainbody}>
                                <View style={styles.sideContent}>
                                    <Image source={require('../../assets/logo.png')} style={styles.image} />
                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 5, }}>

                                    <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 2, marginTop: 2 }}>Forgot your password?</Text>
                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>

<Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Light', fontSize: 11, marginBottom: 2, marginTop: 2 }}>Provide us with an email to your account for us to process your password change</Text>
</View>
                                <View style={styles.textInputContainer}>
                                    <View style={styles.text_icon}>
                                        <Icon
                                            name="email"
                                            size={20}
                                            type='entypo'
                                            color={colors.primary_color}

                                        />
                                    </View>

                                    <View style={styles.input}>
                                        <TextInput
                                            placeholder="Email "
                                            placeholderTextColor={colors.placeholder_color}
                                            returnKeyType="next"
                                            keyboardType='email-address'
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            defaultValue={this.state.email}
                                            style={{ flex: 1, fontSize: 12, color: colors.primary_color, fontFamily: 'Poppins-SemiBold', }}
                                            onChangeText={(text) => this.validate(text)}
                                            onSubmitEditing={() => tthis.loginRequest()}
                                        />
                                    </View>


                                    <View style={styles.operation_icon}>
                                        {this.state.is_valide_mail ?
                                            <Animatable.View
                                                animation="bounceIn"
                                            >
                                                <Icon
                                                    name="check-circle"
                                                    color="green"
                                                    size={20}
                                                    type='feather'


                                                />
                                            </Animatable.View>
                                            : null}

                                    </View>
                                </View>

                               
                                    <TouchableOpacity style={styles.buttonContainer}  onPress={() => this.loginRequest()} >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Continue</Text>
                                    </TouchableOpacity>
                             

                                <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 10, }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: '#193a4d', fontFamily: 'Poppins-Medium', fontSize: 12, marginBottom: 7, marginTop: 7 }}>Changed your mind?</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')} style={{ alignItems: 'center' }}>
                                        <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 13, marginBottom: 7, marginTop: 7 }}>  Login Now!</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </Content>
                </Container>
            </ImageBackground>
        );
    }


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    textInputContainer: {
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 30,
        height: 45,
        borderColor: '#3E3E3E',
        marginBottom: 15,
        marginTop: 20,
        paddingLeft: 12,
        borderWidth: 0.6,
        borderColor: colors.primary_color,
        borderRadius: 10
    },
    input: {
        flex: 1,
        marginLeft: 15,
    },
    text_icon: {
        padding: 10,
        borderRightWidth: 0.6,
        borderRightColor: colors.primary_color,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operation_icon: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sideContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
    },
    actionbutton: {
        marginTop: 7,
        marginBottom: 2,
        opacity: 0.5,
        fontSize: 14,
        color: '#0F0E43',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular'
    },
    buttonContainer: {
        height: 50,
        marginRight: 30,
        marginLeft: 30,
        marginTop: 13,
        borderRadius: 15,
        backgroundColor:colors.primary_color,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
