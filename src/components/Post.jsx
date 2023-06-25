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
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Post = ({ data }) => {
  const navigation = useNavigation();
  const { geoLocation, location, name, photoUri } = data;
  return (
    <View style={postStyles.container}>
      <Image style={postStyles.image} source={{ uri: photoUri }} />
      <Text style={{ ...postStyles.text, marginBottom: 11 }}>{name}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <FontAwesome
            name="comment-o"
            size={24}
            color="#BDBDBD"
            onPress={() => navigation.navigate('Comments')}
          />
          <Text style={{ ...postStyles.text, color: '#BDBDBD', marginLeft: 8 }}>
            Num
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
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
  container: {},
  image: {
    width: '100%',
    height: 240,
    backgroundColor: '#bdbdbd',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 32,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});

export default Post;
