import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  makeStyles,
  Button,
  Avatar,
  useTheme,
  Icon,
} from 'react-native-elements';
import MenuDrawer from 'react-native-side-drawer';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 0,
  },
  drawer: {
    minHeight: '100%',
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 15,
  },
  tmenu: {
    fontSize: 25,
    marginBottom: 15,
    color: 'white',
  },
  imenu: {
    marginVertical: 15,
    alignSelf: 'center',
  },
  collapse: {
    display: 'flex',
    position: 'absolute',
    height: 60,
    width: 60,
    marginTop: 10,
    zIndex: 10,
  },
}));

export const SidebarView = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ window, screen });
  const { theme } = useTheme();
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });

  const styles = useStyles();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const getData = async () => {
    const value = await AsyncStorage.getItem('DatosU');
    if(value !== null) {
      setUser(JSON.parse(value));
    }
    console.log(value);
  }
  useEffect(() => {
    // Get user service
    getData();
  }, []);

  const DrawerContent = () => {
    return (
      <View style={styles.drawer}>
        <View style={styles.imenu}>
          <Avatar
            size={100}
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
            title="Picture">
            <Avatar.Accessory size={23} />
          </Avatar>
        </View>
        <Text style={styles.tmenu}>{user.nombre}</Text>
        <Text style={styles.tmenu}>{user.codigo}</Text>
        <Text style={styles.tmenu}>{user.centro}</Text>
        <Button title="Cerrar" onPress={toggleOpen} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MenuDrawer
        open={open}
        position={'left'}
        drawerContent={DrawerContent()}
        drawerPercentage={85}
        animationTime={250}
        overlay={true}
        opacity={1}>
        <View
          style={[
            styles.collapse,
            { marginLeft: dimensions.window.width - 60 },
          ]}>
          <Icon
            name="menu"
            type="material"
            color={theme.colors.secondary}
            onPress={toggleOpen}
          />
        </View>
        <View style={styles.content}>{children}</View>
      </MenuDrawer>
    </View>
  );
};