import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer } from '@components/global/ScreenContainer';
import { YowPetTheme } from '@theme/Colors';
import { Ionicons } from '@expo/vector-icons';

const chats = [
    {
        id: 1,
        name: 'Adidas M.',
        lastMessage: 'Entonces quedamos...',
        time: '9:41',
        unread: true,
        avatar: require('../../assets/chat/adrian.jpg'),
        status: 'online'
    },
    {
        id: 2,
        name: 'Cat boscati!',
        lastMessage: 'Nace Lhora',
        time: 'Ayer',
        unread: false,
        avatar: require('../../assets/chat/boy.jpg'),
        status: 'offline'
    },
    {
        id: 3,
        name: 'Miriam',
        lastMessage: 'Cuanto gatitos...',
        time: 'Ayer',
        unread: false,
        avatar: require('../../assets/chat/alina.jpg'),
        status: 'online'
    },
    {
        id: 4,
        name: 'Amanhos de perros',
        lastMessage: 'Mi perro suele...',
        time: 'Ayer',
        unread: true,
        avatar: require('../../assets/chat/girl.jpg'),
        status: 'away'
    },
    {
        id: 5,
        name: 'Pascual',
        lastMessage: 'Compre pienso para gatos',
        time: '1 FEB',
        unread: false,
        avatar: require('../../assets/chat/cat.jpg'),
        status: 'offline'
    },
];

export default function ChatScreen() {
    return (
        <ScreenContainer backgroundColor={YowPetTheme.brand.primary}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>CHAT</Text>
                    <TouchableOpacity>
                        <Ionicons name="add-circle" size={28} color={YowPetTheme.brand.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {chats.map(chat => (
                        <TouchableOpacity
                            key={chat.id}
                            style={[
                                styles.chatCard,
                                chat.unread && styles.unreadCard
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.avatarContainer}>
                                <Image source={chat.avatar} style={styles.avatar} />
                                <View style={[
                                    styles.statusIndicator,
                                    { backgroundColor: getStatusColor(chat.status) }
                                ]} />
                            </View>
                            <View style={styles.chatContent}>
                                <View style={styles.chatHeader}>
                                    <Text style={styles.chatName}>{chat.name}</Text>
                                    <Text style={styles.chatTime}>{chat.time}</Text>
                                </View>
                                <Text
                                    style={[
                                        styles.chatMessage,
                                        chat.unread && styles.unreadMessage
                                    ]}
                                    numberOfLines={1}
                                >
                                    {chat.lastMessage}
                                </Text>
                            </View>
                            {chat.unread && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadBadgeText}>!</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ScreenContainer>
    );
}

function getStatusColor(status) {
    switch(status) {
        case 'online': return '#4CAF50';
        case 'away': return '#FFC107';
        case 'offline': return '#9E9E9E';
        default: return YowPetTheme.brand.primary;
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: YowPetTheme.background.mainWhite,
        borderRadius: 24,
        marginTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: YowPetTheme.brand.primary + '20',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    unreadCard: {
        borderLeftWidth: 4,
        borderLeftColor: YowPetTheme.brand.primary,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: YowPetTheme.background.mainWhite,
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '700',
        color: YowPetTheme.text.mainText,
    },
    chatTime: {
        fontSize: 12,
        color: YowPetTheme.text.subtleText,
    },
    chatMessage: {
        fontSize: 14,
        color: YowPetTheme.text.subtleText,
    },
    unreadMessage: {
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
    },
    unreadBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: YowPetTheme.brand.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    unreadBadgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
});