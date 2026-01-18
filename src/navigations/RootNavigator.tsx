import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditTransaction from '../screens/EditTransaction';
import BottomTabs from './BottomTabNavigator';
import { StackParamsList } from './types';

const Stack = createNativeStackNavigator<StackParamsList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }}/>
            <Stack.Screen name='Edit' component={EditTransaction} />
        </Stack.Navigator>
    );
}

export default RootNavigator;