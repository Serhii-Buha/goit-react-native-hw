import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail } from '../redux/selectors';
import { addLike, delPost } from '../redux/thunks';

const Post = ({ data }) => {
  const navigation = useNavigation();
  const accEmail = useSelector(getEmail);
  const dispatch = useDispatch();

  const {
    geoLocation,
    location,
    name,
    url,
    email,
    creationTime,
    comments,
    likes,
  } = data;

  const delPostFunc = () => {
    dispatch(delPost(creationTime));
  };

  const addLikeFunc = () => {
    if (likes?.includes(accEmail)) return;
    dispatch(addLike({ mail: accEmail, id: creationTime }));
  };

  return (
    <View style={postStyles.container}>
      <Image style={postStyles.image} source={{ uri: url }} />
      {/* {accEmail === email && (
        <View style={postStyles.bottomNavigation}>
          <AntDesign
            name="delete"
            size={24}
            color={'#bdbdbd'}
            onPress={delPostFunc}
          />
        </View>
      )} */}
      <Text style={{ ...postStyles.text, marginBottom: 11 }}>{name}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={postStyles.viewStyle}>
          <FontAwesome
            name="comment"
            size={24}
            color={comments?.length ? '#FF6C00' : '#BDBDBD'}
            onPress={() =>
              navigation.navigate('Comments', { creationTime, url })
            }
          />
          <Text
            style={
              comments?.length
                ? { ...postStyles.text, marginLeft: 8 }
                : { ...postStyles.text, color: '#BDBDBD', marginLeft: 8 }
            }
          >
            {comments?.length}
          </Text>
          <AntDesign
            name="like2"
            size={24}
            style={{ marginLeft: 10 }}
            color={likes?.length ? '#FF6C00' : '#BDBDBD'}
            onPress={addLikeFunc}
          />
          <Text
            style={
              likes?.length
                ? { ...postStyles.text, marginLeft: 8 }
                : { ...postStyles.text, color: '#BDBDBD', marginLeft: 8 }
            }
          >
            {likes?.length ?? 0}
          </Text>
        </View>
        {accEmail === email && (
          <View style={postStyles}>
            <AntDesign
              name="delete"
              size={24}
              color={'#bdbdbd'}
              onPress={delPostFunc}
            />
          </View>
        )}
        <View style={postStyles.viewStyle}>
          <AntDesign
            name="enviromento"
            size={24}
            color="#BDBDBD"
            onPress={() =>
              navigation.navigate('Map', { geoLocation, location, name })
            }
          />
          <Text style={{ ...postStyles.text, marginLeft: 8 }}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export const postStyles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 34,
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#bdbdbd',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 0,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  deleteButton: {
    // height: 40,
    // width: 70,
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
  },
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Post;
