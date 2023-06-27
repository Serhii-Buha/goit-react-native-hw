import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { styles } from './scc';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/slice';
import { getEmail } from '../redux/selectors';

const CreatePostsScreen = () => {
  const [permission, setPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [geoLocation, setGeoLocation] = useState(null);
  const [haveParam, setHaveParam] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const email = useSelector(getEmail);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setPermission(status === 'granted');
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  useEffect(() => {
    setHaveParam(photoUri && !!name && !!location);
  }, [photoUri, name, location]);

  if (!isFocused || permission === null) {
    return <View />;
  }

  if (permission === false) {
    navigation.navigate('Posts');
  }

  const onPostPress = async () => {
    setHaveParam(false);
    const post = {
      name,
      location,
      geoLocation,
      email,
      photoUri,
    };
    console.log(post);
    dispatch(addPost(post));
    onDelPress();
    navigation.navigate('Posts');
  };

  const onDelPress = () => {
    setPhotoUri(null);
    setName('');
    setLocation('');
  };

  const onShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setPhotoUri(uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={innerStyles.container}>
        {photoUri ? (
          <ImageBackground
            style={innerStyles.imageContainer}
            source={{
              uri: photoUri,
            }}
          ></ImageBackground>
        ) : (
          <Camera
            style={innerStyles.imageContainer}
            type={type}
            ref={setCameraRef}
            ratio="1:1"
          >
            <View>
              <View style={innerStyles.photoIcon}>
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={'#BDBDBD'}
                  onPress={onShot}
                />
              </View>
            </View>
          </Camera>
        )}

        <View style={innerStyles.buttonsContainer}>
          <Text style={innerStyles.innerText}>
            {!photoUri ? 'Add photo' : 'Edit photo'}
          </Text>
          {/* <View style={innerStyles.smallButton}>
            <MaterialIcons
              name="flip-camera-android"
              size={24}
              color={photoUri ? '#bdbdbd' : 'black'}
              onPress={
                photoUri
                  ? null
                  : () => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }
              }
            />
          </View> */}
          {/* <View style={innerStyles.smallButton}>
            <AntDesign
              name="delete"
              size={24}
              color={!photoUri ? '#bdbdbd' : 'black'}
              onPress={onDelPress}
            />
          </View> */}
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <TextInput
            style={innerStyles.input}
            placeholder="Name..."
            name="name"
            placeholderTextColor={'#BDBDBD'}
            value={name}
            onChangeText={setName}
          />
          <View style={{ position: 'relative' }}>
            <TextInput
              style={{ ...innerStyles.input, paddingLeft: 25 }}
              placeholder="Location..."
              name="location"
              placeholderTextColor={'#BDBDBD'}
              value={location}
              onChangeText={setLocation}
            />
            <AntDesign
              name="enviromento"
              size={24}
              color="#BDBDBD"
              style={{ position: 'absolute', bottom: 5 }}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          disabled={!haveParam}
          style={
            haveParam
              ? innerStyles.button
              : { ...innerStyles.button, backgroundColor: '#F6F6F6' }
          }
          onPress={onPostPress}
        >
          <Text
            style={
              haveParam
                ? innerStyles.buttonText
                : { ...innerStyles.buttonText, color: '#bdbdbd' }
            }
          >
            Post
          </Text>
        </TouchableOpacity>
        <View style={innerStyles.positionSmallButton}>
          <View style={innerStyles.smallButton}>
            <AntDesign
              name="delete"
              size={24}
              color={!photoUri ? '#bdbdbd' : 'black'}
              onPress={onDelPress}
            />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const innerStyles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // gap: 20,
    // justifyContent: 'center',
    marginTop: 10,
  },
  positionSmallButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 120,
  },
  smallButton: {
    height: 40,
    width: 70,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
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
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 240,
    // border: 1px solid #E8E8E8,
    borderRadius: 8,
  },
  photoIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    backgroundColor: 'white',
    opacity: 0.5,
    borderRadius: 30,
  },
  innerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    marginTop: 20,
    fontSize: 16,
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
});

export default CreatePostsScreen;
