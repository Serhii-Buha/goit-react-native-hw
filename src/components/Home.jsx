import { View, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PostsScreen from '../screens/PostsScreen';
import CreatePostsScreen from '../screens/CreatePostsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomHeader from './CustomHeader';

const HomeNav = createBottomTabNavigator();

const Home = ({ route, navigation }) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  const router = routeName => {
    if (routeName === 'Posts') {
      return (
        <>
          <HomeNav.Screen
            name="CreatePost"
            component={CreatePostsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
              tabBarStyle: { display: 'none' },
            }}
          />
          <HomeNav.Screen
            name="Posts"
            component={PostsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
            }}
          />
          <HomeNav.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      );
    } else if (routeName === 'Profile') {
      return (
        <>
          <HomeNav.Screen
            name="Posts"
            component={PostsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
            }}
          />
          <HomeNav.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
          <HomeNav.Screen
            name="CreatePost"
            component={CreatePostsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
              tabBarStyle: { display: 'none' },
            }}
          />
        </>
      );
    } else
      return (
        <>
          <HomeNav.Screen
            name="Posts"
            component={PostsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
            }}
          />
          <HomeNav.Screen
            name="CreatePost"
            component={CreatePostsScreen}
            options={{
              header: ({ navigation, route, options }) => {
                const title = route.name;
                return (
                  <CustomHeader title={title} options={options.headerStyle} />
                );
              },
              tabBarStyle: { display: 'none' },
            }}
          />
          <HomeNav.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      );
  };

  return (
    <>
      <HomeNav.Navigator
        initialRouteName="Posts"
        backBehavior="none"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Posts') {
              return (
                <View
                  style={{
                    ...styles.bottomNavigation,
                    backgroundColor: (iconName = focused
                      ? '#FF6C00'
                      : '#ffffff'),
                  }}
                >
                  <AntDesign
                    name="appstore-o"
                    size={24}
                    color={(iconName = focused ? '#ffffff' : '#212121CC')}
                  />
                </View>
              );
            }
            if (route.name === 'CreatePost') {
              return (
                <View
                  style={{
                    ...styles.bottomNavigation,
                    backgroundColor: (iconName = focused
                      ? '#FF6C00'
                      : '#ffffff'),
                  }}
                >
                  <Octicons
                    name="plus"
                    size={24}
                    color={(iconName = focused ? '#ffffff' : '#212121CC')}
                  />
                </View>
              );
            }
            if (route.name === 'Profile') {
              return (
                <View
                  style={{
                    ...styles.bottomNavigation,
                    backgroundColor: (iconName = focused
                      ? '#FF6C00'
                      : '#ffffff'),
                  }}
                >
                  <Feather
                    name="user"
                    size={24}
                    color={(iconName = focused ? '#ffffff' : '#212121CC')}
                  />
                </View>
              );
            }
          },
        })}
      >
        {router(routeName)}
      </HomeNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    height: 40,
    width: 70,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
