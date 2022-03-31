import { BRAND } from 'app/assets/images';
import { SidebarView } from 'app/components/DrawerContent';
import { RunnerCard } from 'app/components/RunnerCard';
import { FormView } from 'app/layouts/FormView';
import { getCorredoresRequest } from 'app/services/Connection';
import React, { useEffect, useState } from 'react';
import { View,Image } from 'react-native';
import {  makeStyles, Text } from 'react-native-elements';

const runners = [
  {
    name: 'Samuel',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    name: 'Luisa',
    avatar:
      'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
  },
  {
    name: 'Camilo',
    avatar:
      'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
  },
];

const useStyles = makeStyles((theme) => ({
  formView: {
    backgroundColor: theme.colors.secondary,
  },
  mainContainer: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: theme.colors.secondary,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 350,
    resizeMode: 'contain',
  },
  userCount: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30,
  },
}));

export const Home = () => {
  const [count, setCount] = useState(0);
  const styles = useStyles();

  const get = async () => {
    await getCorredoresRequest().then(({ data }) => {
      setCount(data);
    });
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <SidebarView>
      <FormView style={styles.formView}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Image source={BRAND} style={styles.logo} />
          </View>
          <Text style={styles.userCount}>
            Usuarios registrados: {`${count}`}
          </Text>
          {runners.map((item, index) => (
            <RunnerCard
              key={index}
              avatar={item.avatar}
              name={item.name}
              placement={index + 1}
            />
          ))}
        </View>
      </FormView>
    </SidebarView>
  );
};
