
import { StyleSheet } from 'react-native';
import { YowPetTheme } from '@theme/Colors';

export const PlannerHome = StyleSheet.create({
    container:
    {
        padding: 20,
        backgroundColor: YowPetTheme.brand.white,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
        marginBottom: 16,
    },
    planCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: YowPetTheme.brand.surface,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    planIcon: {
        padding: 12,
        borderRadius: 12,
        backgroundColor: YowPetTheme.status.info + '20',
        marginRight: 12,
    },
    planInfo: {
        flex: 1,
    },
    planTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
    },
    planSubtitle: {
        fontSize: 14,
        color: YowPetTheme.text.softText,
        marginTop: 4,
    },
    section: {
        padding: 20,
        backgroundColor: YowPetTheme.background.cardBg,
        borderRadius: 16,
        marginBottom: 20
    },
});

export const petshome = StyleSheet.create({
    highlightCard: {
        margin: 20,
        padding: 20,
        backgroundColor: YowPetTheme.brand.accent,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    highlightContent: {
        alignItems: 'center',
        marginBottom: 20,
    },
    highlightTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: YowPetTheme.text.mainText,
        marginTop: 12,
    },
    highlightText: {
        fontSize: 14,
        color: YowPetTheme.brand.support,
        textAlign: 'center',
        marginTop: 8,
    },
    highlightButton: {
        backgroundColor: YowPetTheme.brand.orange,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    highlightButtonText: {
        color: YowPetTheme.brand.support,
        fontWeight: '600',
        fontSize: 16,
    },
    petsSection: {
        padding: 20,
    },
    petsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    petsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
    },
    addButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: YowPetTheme.brand.accent,
    },
    petsList: {
        flexGrow: 0,
    },
    petCard: {
        marginRight: 16,
        alignItems: 'center',
    },
    petImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
        backgroundColor: YowPetTheme.brand.surface,
    },
    petName: {
        fontSize: 14,
        fontWeight: '600',
        color: YowPetTheme.text.mainText,
        textAlign: 'center',
    },
})