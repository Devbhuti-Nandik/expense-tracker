import { StyleSheet, View, Text } from 'react-native'
import { LightColors } from '../theme/color';
import { TransactionTypePicker } from '../components/TransactionTypePicker';
import { AddTransactionForm } from '../components/AddTransactionForm';

const AddTransaction = () => {
    return (
        <View style={styles.addTransactionContainer}>
            {/* Transaction type picker */}
            <TransactionTypePicker />
            <AddTransactionForm />
        </View>
    );
}

export default AddTransaction;

const styles = StyleSheet.create({
    addTransactionContainer: {
        flex: 1,
        backgroundColor: LightColors.background
    }
})