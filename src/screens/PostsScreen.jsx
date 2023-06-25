import {
  Button,
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Post from '../components/Post';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// const PostNav = createStackNavigator();

const PostsScreen = () => {
  const posts = useSelector(state => state.posts.posts);
  console.log(posts);
  const { email, login, photo } = useSelector(state => state.user);

  return (
    <>
      <View style={postStyles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View>
            <ImageBackground source={photo} style={postStyles.image} />
          </View>
          <View>
            <Text style={postStyles.name}>{login}</Text>
            <Text style={postStyles.email}>{email}</Text>
          </View>
        </View>
      </View>
      {posts && (
        <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
          {posts.map(el => (
            <Post key={el.name} data={el}></Post>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const postStyles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    backgroundColor: '#BDBDBD',
    borderRadius: 16,
    marginRight: 8,
    // marginLeft: 16,
    // marginTop:32,
  },
  container: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  name: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    // display: flex,
    // alignItems: center,
    color: '#212121',
  },
  email: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    // display: flex,
    // alignItems: center,
    color: '#333333',
  },
});

export default PostsScreen;
