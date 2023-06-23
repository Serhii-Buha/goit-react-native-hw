import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { styles } from './scc';

const CreatePostsScreen = () => {
  const [havePhoto, setHavePhoto] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const haveParam = havePhoto && !!name && !!location;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 32,
          paddingBottom: 10,
          backgroundColor: 'white',
          height: '100%',
          display: 'flex',
        }}
      >
        <View style={innerStyles.imageContainer}>
          <Image />
          <View style={innerStyles.photoIcon}>
            <MaterialIcons
              name="photo-camera"
              size={24}
              color={!havePhoto ? '#BDBDBD' : 'white'}
            />
          </View>
        </View>
        <Text style={innerStyles.innerText}>
          {!havePhoto ? 'Add photo' : 'Edit photo'}
        </Text>
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
              ? styles.button
              : { ...styles.button, backgroundColor: '#F6F6F6' }
          }
        >
          <Text
            style={
              haveParam
                ? styles.buttonText
                : { ...styles.buttonText, color: '#bdbdbd' }
            }
          >
            Post
          </Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.bottomNavigation,
            marginTop: 'auto',
            // marginHorizontal: "auto",
            backgroundColor: '#F6F6F6',
            alignSelf: 'center',
          }}
        >
          <AntDesign name="delete" size={24} color="#bdbdbd" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const innerStyles = StyleSheet.create({
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
