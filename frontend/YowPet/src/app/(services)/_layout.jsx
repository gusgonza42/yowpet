import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import {YowPetTheme} from "@theme/Colors";

export default function ServicesLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerBackVisible: false,
                headerStyle: {
                    backgroundColor: YowPetTheme.brand.primary,
                },
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
            <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
    );
}
