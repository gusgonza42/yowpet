import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function BackButton() {
    const router = useRouter();
    return (
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        backgroundColor: 'transparent',
        padding: 4,
        borderRadius: 20,
    },
});