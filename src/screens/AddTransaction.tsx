import { StyleSheet, View, Text } from 'react-native'

const AddTransaction = () => {
    return (
        <View style={styles.addTransactionContainer}>
            <Text>
                Add transaction screen
            </Text>
        </View>
    );
}

export default AddTransaction;

const styles = StyleSheet.create({
    addTransactionContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})