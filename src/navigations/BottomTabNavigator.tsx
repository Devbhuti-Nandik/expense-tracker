import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/Dashboard';
import Transactions from '../screens/Transactions';
import AddTransaction from '../screens/AddTransaction';
import { TabParamsList } from './types';

const Tabs = createBottomTabNavigator<TabParamsList>();

const BottomTabs = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name='Dashboard' component={Dashboard} />
            <Tabs.Screen name='Transactions' component={Transactions} />
            <Tabs.Screen name='Add' component={AddTransaction} />
        </Tabs.Navigator>
    );
}

export default BottomTabs;