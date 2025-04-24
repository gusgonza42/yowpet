import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function ServicesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerBackVisible: false,
                headerLeft: () => <BackButton />,
            }}
        />
    );
}

function BackButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
            }}
        >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={{ color: 'black', fontSize: 16, marginLeft: 5 }}>
                Back
            </Text>
        </TouchableOpacity>
    );
}
