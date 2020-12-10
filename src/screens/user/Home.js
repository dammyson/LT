import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import colors from '../../components/theme/colors'
import LinearGradient from 'react-native-linear-gradient';
import { baseUrl, setToken, setRefresheToken, setIsFirst, setUserId, processResponse } from '../../utilities';
import Loader from '../../components/loader/Loader';
import { getToken } from '../../utilities';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: 'pechbusorg@gmail.com',
      user: {}
    };
  }


  async componentDidMount() {
    this.setState({
      email: await getToken()
    })
   // this.loginRequest()
  }


  async loginRequest() {

    const { email } = this.state
    var payload = {
      Identity: email
    }
    console.warn(payload)

    var formData = JSON.stringify(payload);
    this.setState({ loading: true })
    fetch(baseUrl() + 'GetUser', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, body: formData
    })
      .then(processResponse)
      .then(res => {
        const { statusCode, data } = res;
        this.setState({ loading: false })
        if (statusCode === 200) {
          this.setState({ loading: false, user: data })
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
    const { user } = this.state
    if (this.state.loading) {
      return (
        <Loader message={'getting active user...'} />
      );
    }

    return (
      <ImageBackground
        source={require('../../assets/background_dot.png')}
        resizeMode="repeat"
        style={styles.container}
      >
        <StatusBar backgroundColor='#fff' barStyle="dark-content" />
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
            <View style={{}}>
              <Text style={{ color: colors.primary_color, fontFamily: 'Poppins-SemiBold', fontSize: 10, marginBottom: 2, marginTop: 2 }}>You have been verified:   </Text>
              
            </View>
           
          </View>
          <View style={{ width: Dimensions.get('window').width, marginTop:30}}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[colors.primary_color, colors.primary_color,]} style={styles.buttonContainer} block iconLeft>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} onPress={() => this.logOut()} >
              <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 14 }}>Log Out</Text>
            </TouchableOpacity>
          </LinearGradient>
          </View>
         

        </View>
      </ImageBackground>
    );
  }


  logOut() {
    try {

        this.setState({ visible_log_merchant: false })
       AsyncStorage.clear();
        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome'}],
              });
        }, 500);

        return true;
    }
    catch (exception) {
        return false;
    }



}
}




const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
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
  },
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
    paddingTop: 40,
    paddingBottom: 40,
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
  },
  terms_container: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});