import { Redirect } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Redirect href="/(auth)/welcome" />
    </GestureHandlerRootView>
  );
};

export default Home;
