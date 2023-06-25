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
import { postStyles } from '../components/Post';
import React, { useState } from 'react';
import Comment from '../components/Comment';
import { AntDesign } from '@expo/vector-icons';

const CommentsScreen = () => {
  const [comments, setComments] = useState([1, 2, 3, 4, 5]);
  const [newComment, setNewComment] = useState('');

  return (
    <>
      <View style={{ paddingHorizontal: 16, paddingTop: 32 }}>
        <ScrollView>
          <Image style={commentStyles.image} />
          {comments.map((el, ind) => (
            <Comment key={el} ind={ind}></Comment>
          ))}
        </ScrollView>
        <View
          style={{
            position: 'relative',
            marginTop: 'auto',
            paddingVertical: 16,
          }}
        >
          <TextInput
            style={commentStyles.input}
            placeholder="Comment..."
            name="comment"
            placeholderTextColor={'#BDBDBD'}
            textContentType="username"
            value={newComment}
            onChangeText={setNewComment}
          />
          <View style={commentStyles.icon}>
            <AntDesign name="arrowup" size={24} color="white" />
          </View>
        </View>
      </View>
    </>
  );
};

const commentStyles = StyleSheet.create({
  input: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    // fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#bdbdbd',
    borderRadius: 8,
    marginBottom: 8,
  },
  icon: {
    width: 34,
    height: 34,
    backgroundColor: '#FF6C00',
    borderRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    top: 24,
    // transform: [{ translateY: 50 }],
  },
});

export default CommentsScreen;
