import { View, Text, StyleSheet, Pressable } from 'react-native'
import { FormInput } from '../common/FormInput';
import { LightColors } from '../theme/color';

export const AddTransactionForm = () => {
    return (
        <View style={styles.transactionForm}>
            <FormInput label='Amount' inputType='amount' inputConfig={{ keyboardType: 'decimal-pad' }} />
            <FormInput label='Date' inputType='date' inputConfig={{}} />
            <FormInput label='Categories' inputType='categories' inputConfig={{}} />
            <FormInput label='Description' inputType='description' inputConfig={{}} />
            <Pressable style={styles.addTransactionButton}>
                <Text style={styles.addTransactionButtonText}>Add Transaction</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    transactionForm: {
        flex: 1,
        marginHorizontal: 28,
        marginVertical: 8,
    },
    addTransactionButton: {
        marginTop: 8,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: LightColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    addTransactionButtonText: {
        fontSize: 16,
        color: LightColors.background,
        fontWeight: 700,
    }
})