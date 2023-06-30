import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import ImageBG from '../PhotoBG.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { getFilteredPosts, getUser } from '../redux/selectors';
import { logOutUser } from '../redux/thunks';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { login, email, photoUri } = useSelector(getUser);
  const posts = useSelector(getFilteredPosts(email));

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.avatar} />
        <MaterialIcons
          name="logout"
          size={24}
          color="#BDBDBD"
          style={styles.icon}
          onPress={() => {
            dispatch(logOutUser());
            navigation.navigate('Login');
          }}
        />
        <Text style={styles.text}>{login}</Text>
        {posts && (
          <ScrollView style={{ paddingHorizontal: 16 }}>
            {posts.map(el => (
              <Post key={el.creationTime} data={el}></Post>
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    position: 'relative',
    marginTop: 120,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 60,
    paddingBottom: 100,
    minHeight: Dimensions.get('window').height - 90,
    backgroundColor: 'white',
    opacity: 1,
  },
  avatar: {
    height: 120,
    width: 120,
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    top: -60,
    left: Dimensions.get('window').width / 2,
    borderRadius: 16,
    transform: [{ translateX: -60 }],
  },
  icon: {
    marginLeft: 'auto',
    position: 'absolute',
    top: 12,
    paddingVertical: 10,
    right: 16,
    paddingLeft: 16,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    color: '#212121',

    marginVertical: 32,
  },
});

export default ProfileScreen;
