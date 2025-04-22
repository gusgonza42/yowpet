import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';

export default function EducateScreen() {
    return (
        <ScreenContainer backgroundColor={YowPetTheme.background.mainWhite}>
            <View style={styles.container}>
                <Text style={styles.title}>Educa a tu mascota</Text>
                <Text style={styles.description}>
                    Aquí encontrarás consejos y recursos para entrenar a tu mascota.
                </Text>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
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