import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
import { theme } from 'app/constants/theme';
import { MainStack } from 'app/screens/MainStack';
import { MarathonProvider } from 'app/context';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Mapbox error Failed to obtain location update',
  'Switching glyphsRasterizationMode to NoGlyphsRasterizedLocally mode.',
]);
function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <MarathonProvider>
          <MainStack />
        </MarathonProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
