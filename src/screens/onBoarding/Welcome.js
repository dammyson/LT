import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Animated, 
  Easing
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import colors from '../../components/theme/colors'




export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }


  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  requestMultiplePermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
            [
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ]
        );
        this.props.navigation.replace('SignIn')
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         
        } else {
            console.warn("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

  render() {
    return (
      <ImageBackground
      source={require('../../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.container}
    >
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
       <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-Bold', fontSize: 20, marginBottom: 2, marginTop: 2}}>  NAME HERE</Text>
           
        </View>
        <Animatable.View
          style={[styles.footer, {
            backgroundColor: colors.primary_color
          }]}
          animation="fadeInUpBig"
        >
          <Text style={[styles.title, {
            color:'white'
          }]}>Stay connected with everyone!</Text>
          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity  onPress={() =>  this.requestMultiplePermission()}>
              <LinearGradient
                colors={['#f1f1f1', '#fff']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons
                  name="navigate-next"
                  color={colors.primary_color}
                  size={20}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    );
  }
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: '#fff',
    marginTop: 5
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: colors.primary_color,
    fontWeight: 'bold'
  }
});