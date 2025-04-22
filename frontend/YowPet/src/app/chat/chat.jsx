import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { useRouter } from 'expo-router';

export default function ChatScreen() {
    const router = useRouter();

    return (
        <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
            <View style={styles.container}>
                <Text style={styles.title}>Chat</Text>
                <Text style={styles.description}>
                    Aquí puedes chatear con otros dueños de mascotas.
                </Text>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 10,
    },
    backArrow: {
        fontSize: 24,
        color: YowPetTheme.text.mainText,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: YowPetTheme.text.subtleText,
        textAlign: 'center',
    },
});