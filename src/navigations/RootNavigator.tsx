import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EditTransaction from '../screens/EditTransaction';
import BottomTabs from './BottomTabNavigator';
import { StackParamsList } from './types';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<StackParamsList>();

const RootNavigator = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name='Edit' component={EditTransaction} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default RootNavigator;