import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { makeStyles, useTheme } from 'react-native-elements';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
  },
});

/* const defaultPattern = `M0,96L48,112C96,128,192,160,288,
        186.7C384,213,480,235,576,213.3C672,192,768,128,864,
        128C960,128,1056,192,1152,208C1248,224,1344,192,1392,
        176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,
        0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,
        0,96,0,48,0L0,0Z`; */
const defaultPattern = 'M0,96L75.8,128L151.6,32L227.4,96L303.2,288L378.9,192L454.7,32L530.5,64L606.3,160L682.1,224L757.9,224L833.7,96L909.5,256L985.3,288L1061.1,224L1136.8,64L1212.6,320L1288.4,96L1364.2,192L1440,160L1440,0L1364.2,0L1288.4,0L1212.6,0L1136.8,0L1061.1,0L985.3,0L909.5,0L833.7,0L757.9,0L682.1,0L606.3,0L530.5,0L454.7,0L378.9,0L303.2,0L227.4,0L151.6,0L75.8,0L0,0Z'

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

/**
 * @see https://amanhimself.dev/blog/create-custom-headers-with-react-native-svg/
 * @see https://getwaves.io/
 */

export function WavyHeader({
  style,
  height,
  top,
  backgroundColor,
  wavePattern,
}) {
  const styles = useStyles();
  const [dimensions, setDimensions] = useState({ window, screen });
  const { theme } = useTheme();

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });
  return (
    <View style={[styles.root, { width: dimensions.window.width }, style]}>
      <View
        style={{
          backgroundColor: backgroundColor ?? theme.colors.primary,
          height: height ?? 160,
        }}>
        <Svg
          height="60%"
          width={'100%'}
          viewBox="0 0 1440 320"
          style={[styles.root, { top: top ?? 130 }]}>
          <Path
            fill={backgroundColor ?? theme.colors.primary}
            d={wavePattern ?? defaultPattern}
          />
        </Svg>
      </View>
    </View>
  );
}
