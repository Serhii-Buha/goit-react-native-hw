import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ImageBG from '../PhotoBG.png';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/thunks';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';

const RegistrationScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const [focused, setFocused] = useState(null);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [permission, setPermission] = useState(null);
  const [getAvatar, setGetAvatar] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [haveParam, setHaveParam] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    setHaveParam(login && email && password);
  }, [login, email, password]);

  if (permission === null) {
    return <View />;
  }

  const setFocus = e => setFocused(e._dispatchInstances.memoizedProps.name);

  const setBlur = () => setFocused(null);

  const onPress = () => {
    const user = {
      login,
      email,
      password,
      photoUri,
    };

    dispatch(createUser(user));
  };

  const onShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setPhotoUri(uri);
      setGetAvatar(false);
    }
  };

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            {!getAvatar ? (
              <Image source={{ uri: photoUri }} style={styles.image} />
            ) : (
              <Camera
                style={styles.image}
                type={Camera.Constants.Type.front}
                ref={setCameraRef}
              />
            )}
            {!getAvatar && !photoUri && (
              <AntDesign
                name="pluscircleo"
                size={24}
                color="#FF6C00"
                style={styles.icon}
                onPress={() => {
                  setGetAvatar(true);
                }}
              />
            )}
            {photoUri && (
              <AntDesign
                name="closecircleo"
                size={24}
                color="#BDBDBD"
                style={styles.icon}
                onPress={() => {
                  setGetAvatar(false);
                  setPhotoUri(null);
                }}
              />
            )}
            {getAvatar && !photoUri && (
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={'#FF6C00'}
                style={styles.icon}
                onPress={onShot}
              />
            )}
          </View>
          <Text style={styles.header}>Registration</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <TextInput
              style={
                focused === 'login'
                  ? { ...styles.input, ...styles.focus }
                  : { ...styles.input }
              }
              placeholder="Login"
              name="login"
              placeholderTextColor={'#BDBDBD'}
              textContentType="username"
              value={login}
              onChangeText={setLogin}
              onFocus={setFocus}
              onBlur={setBlur}
            />
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
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.bottomText}>
            <Text style={styles.text}>Have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    paddingTop: 85,
    paddingBottom: 10,
    backgroundColor: 'white',
    opacity: 1,
  },
  avatarContainer: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2,
    transform: [{ translateX: -60 }],
  },
  image: {
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: -60,
    left: 0,
    borderRadius: 16,
  },
  icon: {
    position: 'absolute',
    left: 120 - 12,
    bottom: -40,
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

export default RegistrationScreen;
