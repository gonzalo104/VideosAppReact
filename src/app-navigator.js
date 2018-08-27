import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Home from './screens/containers/home';
import Movie from './screens/containers/movie';
import Category from './screens/containers/category';
import Header from './screens/components/header';
import About from './screens/containers/about';
import Lucky from './screens/containers/lucky';
import Profile from './screens/containers/profile';
import Login from './screens/containers/login';
import Loading from './screens/containers/loading';
import Icon from './sections/components/icon';
import DrawerComponent from './sections/components/drawer';

const Main = createStackNavigator(
    {
      Home,    
      Category,
    },    
    {
      navigationOptions: {
        header: Header
      },
      cardStyle:{
        backgroundColor: 'white'
      }
    }          
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen           : Main,
      navigationOptions: {
        title     : 'inicio',
        tabBarIcon: <Icon icon="🏡"/>
      }
    },
    About: {
      screen: About,
    },
    Lucky: {
      screen: Lucky,
    },
    Profile: {
      screen: Profile,
    }
  },
  {
    tabBarOptions: {
      activeTintColor      : 'white',
      activeBackgroundColor: '#65a721'
    }
  }
)


const WithModal = createStackNavigator(
  {
    Main:{
      screen: TabNavigator
    },
    Movie: Movie
  },
  {
    mode      : 'modal',
    headerMode: 'none',
    cardStyle : {
      backgroundColor: 'white'
    },
    navigationOptions:{
      gesturesEnabled: true,
    }
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    Main:{
      screen           : WithModal,
      navigationOptions: {
        title     : 'Inicio',
        drawerIcon: <Icon icon="🌚"/>
      }
    },
    Sobre: {
      screen: About
    },
    Suerte: {
      screen: Lucky
    }
  },
  {
    drawerWidth          : 200,
    drawerBackgroundColor: '#f6f6f6',
    contentComponent     : DrawerComponent,
    contentOptions       : {
      activeBackgroundColor  : '#7aba2f',
      activeTintColor        : 'white',
      inactiveTintColor      : '#828282',
      inactiveBackgroundColor: 'white',
      itemStyle              : {
        borderBottomWidth: .5,
        borderBottomColor: 'rgba(0,0,0,.5)',
      },
      labelStyle:{
        marginHorizontal: 0
      },
      iconContainerStyle:{
        marginHorizontal: 5,
      }
    }
  }
)

const SwitchNavigator = createSwitchNavigator(
  {
    App    : DrawerNavigator,
    Login  : Login,
    Loading: Loading
  },
  {
    initialRouteName: 'Loading'
  }
);

export default SwitchNavigator;