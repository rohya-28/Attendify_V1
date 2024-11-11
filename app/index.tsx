import { Redirect } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Verify from './(auth)/verify' // Your verification page

const Stack = createNativeStackNavigator()
const universal = Linking.createURL('https://attendify.example.com')

const linking: LinkingOptions = {
  prefixes: [universal, 'attendify://'],
  config: {
    screens: {
      Verify: 'verify', // Maps the URL myapp://verify to the Verify screen
    },
  },
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="Verify" component={Verify} />
          {/* You can add more screens here if needed */}
        </Stack.Navigator>
      </NavigationContainer>
      <Redirect href="/(auth)/welcome" />
      {/* <Redirect href="/(auth)/sign-in" /> */}
      {/* Optionally, redirect to other routes if necessary */}
    </GestureHandlerRootView>
  )
}
