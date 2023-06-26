import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from '../screens/scc';

const CustomHeader = ({ title, options }) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.customHeader}>
        <Text style={styles.customHeaderText}>{title}</Text>
        {title === 'Posts' ? (
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
        ) : (
          <AntDesign
            name="arrowleft"
            size={24}
            color="#BDBDBD"
            style={{
              marginLeft: 'auto',
              position: 'absolute',
              left: 16,
              top: 10,
            }}
            onPress={() => navigation.navigate('Posts')}
          />
        )}
      </View>
    </>
  );
};

export default CustomHeader;
