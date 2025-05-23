
import React from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Modalnotifi } from './styles';

export default function Addnotifimodal({
    visible,
    onDismiss,
    onRequestClose,
    newTitle,
    setNewTitle,
    addReminder,
    closeModal,
}) {
    const handleAddAndClose = async () => {
        await addReminder();
        closeModal();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={Modalnotifi.centeredView}
            >
                <View style={Modalnotifi.modalView}>
                    <Text style={Modalnotifi.modalTitle}>Add Reminder</Text>

                    <TextInput
                        style={Modalnotifi.input}
                        placeholder="Enter reminder title"
                        value={newTitle}
                        onChangeText={setNewTitle}
                    />

                    <View style={Modalnotifi.buttonRow}>
                        <TouchableOpacity onPress={onDismiss} style={[Modalnotifi.button, Modalnotifi.cancelButton]}>
                            <Text style={Modalnotifi.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleAddAndClose} style={[Modalnotifi.button, Modalnotifi.addButton]}>
                            <Text style={Modalnotifi.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

