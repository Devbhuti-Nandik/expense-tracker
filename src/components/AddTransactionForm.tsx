import { View, Text, StyleSheet } from 'react-native'
import { FormInput } from '../common/FormInput';

export const AddTransactionForm = () => {
    return (
        <View style={styles.transactionForm}>
            <FormInput label='Amount' inputType='amount' inputConfig={{ keyboardType: 'decimal-pad' }} />
            <FormInput label='Date' inputType='date' inputConfig={{}} />
        </View>
    );
}

const styles = StyleSheet.create({
    transactionForm: {
        flex: 1,
        marginHorizontal: 28,
        marginVertical: 8,
    }
})