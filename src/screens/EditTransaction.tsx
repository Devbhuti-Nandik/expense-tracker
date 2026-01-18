import { StyleSheet, View, Text } from 'react-native'

const EditTransaction = () => {
    return (
        <View style={styles.editTransactionContainer}>
            <Text>
                Edit transaction screen
            </Text>
        </View>
    );
}

export default EditTransaction;

const styles = StyleSheet.create({
    editTransactionContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})