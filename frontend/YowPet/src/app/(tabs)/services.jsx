import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { router } from 'expo-router';

const icons = {
  comunidad: require('../../assets/icons/community.jpg'),
  chat: require('../../assets/icons/chat.jpg'),
  educa: require('../../assets/icons/educate.jpg'),
  localiza: require('../../assets/icons/location.jpg'),
  cuidador: require('../../assets/icons/caretaker.jpg'),
};

export default function ServicesScreen() {
  const menuItems = [
    {
      title: 'Comunidad',
      route: '/(services)/community',
      icon: icons.comunidad,
    },
    { title: 'Chat', route: '/(services)/chat', icon: icons.chat },
    {
      title: 'Buscar cuidador',
      route: '/(services)/find-caretaker',
      icon: icons.cuidador,
    },
    {
      title: 'Educa a tu mascota',
      route: '/(services)/select-animal',
      icon: icons.educa,
    },
    {
      title: 'Localiza tu mascota',
      route: '/(services)/locate',
      icon: icons.localiza,
    },
  ];

  return (
      <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
        <View style={styles.container}>
          <Text style={styles.title}>SERVICIOS</Text>
          <View style={styles.menuBox}>
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                      styles.menuItem,
                      index === menuItems.length - 1 && styles.lastItem,
                    ]}
                    onPress={() => router.push(item.route)}
                >
                  <View style={styles.iconWrapper}>
                    <Image
                        source={item.icon}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: YowPetTheme.text.mainText,
    marginBottom: 30,
  },
  menuBox: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  lastItem: {
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  menuText: {
    fontSize: 16,
    color: YowPetTheme.text.mainText,
  },
});