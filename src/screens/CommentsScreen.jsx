import { TextInput, View, ScrollView, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import Comment from '../components/Comment';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getUser } from '../redux/selectors';
import { addComment } from '../redux/thunks';

const CommentsScreen = ({ route }) => {
  const id = route.params.creationTime;
  const url = route.params.url;
  const { photoUri } = useSelector(getUser);
  const comments = useSelector(getPost(id));
  const [newComment, setNewComment] = useState('');

  const dispatch = useDispatch();

  const setComment = () => {
    if (!newComment) return;

    const date = new Date();
    const data = {
      id,
      text: newComment,
      avatar: photoUri,
      date: date.getTime(),
    };

    dispatch(addComment(data));
    setNewComment('');
  };

  return (
    <>
      <View style={commentStyles.container}>
        <ScrollView>
          <Image style={commentStyles.image} source={{ uri: url }} />
          {comments?.map((el, ind) => (
            <Comment key={el.date} ind={ind} comment={el}></Comment>
          ))}
        </ScrollView>
        <View
          style={{
            position: 'relative',
            marginTop: 'auto',
            paddingBottom: 16,
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
            <AntDesign
              name="arrowup"
              size={24}
              color="white"
              onPress={setComment}
            />
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
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
    paddingVertical: 16,
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
    top: 8,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default CommentsScreen;
