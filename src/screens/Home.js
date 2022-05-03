import { BRAND } from 'app/assets/images';
import { SidebarView } from 'app/components/DrawerContent';
import { RunnerCard } from 'app/components/RunnerCard';
import { getCorredoresRequest } from 'app/services/Connection';
import React, { useEffect, useState } from 'react';
import { View,Image } from 'react-native';
import {  makeStyles, Text } from 'react-native-elements';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    backgroundColor: theme.colors.secondary,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
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
  const [runners, setRunners] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const get = async () => {
    setRefreshing(true);
    const value = JSON.parse(await AsyncStorage.getItem('DatosU'));
    await getCorredoresRequest({codigo: value.codigo}).then(({ data }) => {
      console.log('data-----------> ', data);
      data.corredores = data.corredores.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.codigo === value.codigo && t.nombre === value.nombre
        ))
      )
      setCount(data.total);
      setRunners(data.corredores);

    });
    setRefreshing(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <SidebarView>
      <View style={styles.mainContainer}>
      <FlatList 
      onRefresh={get}
      refreshing={refreshing}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Image source={BRAND} style={styles.logo} />
          <Text style={styles.userCount}>
            Usuarios registrados: {`${count}`}
          </Text>
        </View>
      }
      data={runners}
      renderItem={({item, index}) => (
        <RunnerCard 
        key={index}
        avatar={item.foto}
        name={item.nombre}
        velocidad={item.velocidad}
        placement={parseInt(item.posicion)} />
      )}/>
      </View>
    </SidebarView>
  );
};
