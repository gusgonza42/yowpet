import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const Login = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/8d/56/b7/8d56b7f2c721d18c6360f6d961eb733f.jpg' }}
      style={GlobalStyles.backgroundImage}
    >
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.title}>Login Page</Text>
        <TouchableOpacity
          style={GlobalStyles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={GlobalStyles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
