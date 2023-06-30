import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import ImageBG from '../PhotoBG.png';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../redux/slice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/firestore';
import { loginUser } from '../redux/thunks';

const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [focused, setFocused] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const haveParam = email && password;

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const uid = user.uid;
        const data = await getUserData(uid);

        dispatch(updateUserData({ ...data, uid }));

        navigation.navigate('Home');
        setIsLogged(true);
      } else {
        navigation.navigate('Login');
        setIsLogged(true);
      }
    });
  }, []);

  const setFocus = e => setFocused(e._dispatchInstances.memoizedProps.name);

  const setBlur = () => setFocused(null);

  const onPress = () => {
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      {isLogged && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <TextInput
                style={
                  focused === 'email'
                    ? { ...styles.input, ...styles.focus }
                    : { ...styles.input }
                }
                placeholder="Email"
                name="email"
                placeholderTextColor={'#BDBDBD'}
                textContentType="emailAddress"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChangeText={setEmail}
                onFocus={setFocus}
                onBlur={setBlur}
              />
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={
                    focused === 'password'
                      ? { ...styles.input, ...styles.focus }
                      : { ...styles.input }
                  }
                  placeholder="Password"
                  name="password"
                  placeholderTextColor={'#BDBDBD'}
                  textContentType="password"
                  secureTextEntry={passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={setFocus}
                  onBlur={setBlur}
                />
                <Entypo
                  name={passwordVisible ? 'eye' : 'eye-with-line'}
                  size={24}
                  color="#212121"
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                  }}
                  onPress={() => setPasswordVisible(prev => !prev)}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={
                haveParam
                  ? styles.button
                  : { ...styles.button, backgroundColor: '#bdbdbd' }
              }
              onPress={onPress}
              disabled={!haveParam}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.bottomText}>
              <Text style={styles.text}>Dont have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  focus: {
    backgroundColor: '#Ffffff',
    borderColor: '#FF6C00',
  },
  container: {
    position: 'relative',
    marginTop: 'auto',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 10,
    backgroundColor: 'white',
    opacity: 1,
  },
  image: {
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: -60,
    left: '50%',
    borderRadius: 16,
    transform: [{ translateX: -50 }],
  },
  icon: {
    position: 'absolute',
    right: -12,
    bottom: 14,
    zIndex: 100,
  },
  imageBG: {
    flex: 1,
    width: null,
    height: null,
  },
  input: {
    height: 50,
    width: null,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#E8E8E8',
    marginBottom: 16,
    padding: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  header: {
    height: 35,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',
    marginBottom: 33,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 50,
    width: null,
    backgroundColor: '#FF6C00',
    marginTop: 27,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
    marginTop: 16,
  },
  bottomText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomNavigation: {
    height: 40,
    width: 70,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customHeader: {
    position: 'relative',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    marginTop: 35,
  },
  customHeaderText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.408,
    color: '#212121',
  },
});

export default LoginScreen;
