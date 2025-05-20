
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