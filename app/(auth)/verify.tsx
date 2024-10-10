import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Linking from 'expo-linking';

const Verify = () => {
  const [params, setParams] = useState(null);

  useEffect(() => {
    const handleDeepLink = (event) => {
      const data = Linking.parse(event.url);
      setParams(data.queryParams);
    };

    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const data = Linking.parse(initialUrl);
        setParams(data.queryParams);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);
    getInitialUrl();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>Verify Here</Text>
      {params ? (
        <Text>Received Parameters: {JSON.stringify(params)}</Text>
      ) : (
        <Text>No Parameters Received</Text>
      )}
    </View>
  );
};

export default Verify;
