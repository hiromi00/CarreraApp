import { getCorredoresRequest } from 'app/services/Connection';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';

const useStyles = makeStyles({
  mainContainer: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 400,
  },
  logo: {
    height: 390,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
    padding: 10
  }
});

export const Home = () => {
  const styles = useStyles();
  const [result, setResult] = useState(0);
  useEffect(() => {
    const getCorredores = async () => {
      getCorredoresRequest().then((response) => {
        setResult(response.data);
      });
    };
    getCorredores();
  }, []);

  return (
    <View>
      <Text style={styles.text}>{result}</Text>
    </View>
  );
};
