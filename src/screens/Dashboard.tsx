import { StyleSheet, View, Text, Button } from 'react-native'

const Dashboard = () => {
    return (
        <View style={styles.dashboardContainer}>
            <Text>Dashboard screen</Text>
        </View>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    dashboardContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})