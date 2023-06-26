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
import ImageBG from '../PhotoBG.png';
import { styles } from './scc';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  return (
    <ImageBackground source={ImageBG} style={styles.imageBG}>
      <View style={styles.container}>
        <ImageBackground source={photo} style={styles.image}>
          {!photo ? (
            <AntDesign
              name="pluscircleo"
              size={24}
              color="#FF6C00"
              style={styles.icon}
            />
          ) : (
            <AntDesign
              name="closecircleo"
              size={24}
              color="#BDBDBD"
              style={styles.icon}
            />
          )}
        </ImageBackground>
        <MaterialIcons
          name="logout"
          size={24}
          color="#BDBDBD"
          style={{
            marginLeft: 'auto',
            position: 'absolute',
            right: 16,
            top: 10,
          }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
