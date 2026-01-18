import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native'

const Transactions = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.transactionsContainer}>
            <Text>Transactions screen</Text>
            <Button onPress={() => navigation.navigate('Edit' as never)} title="Edit transaction" />
        </View>
    );
}

export default Transactions;

const styles = StyleSheet.create({
    transactionsContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})