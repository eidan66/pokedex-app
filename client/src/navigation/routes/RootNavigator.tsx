import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackTypes } from './types';
import { Cards } from '../../components/Card/data';
import { SplashScreen } from '../../components/SplashScreen';
import { COLORS } from '../../constants/colors';
import { Abilities, Homepage, Items, Locations, Moves, Pokedex, TypeCharts } from '../../pages';

export type RootStackParamList = {
  SplashScreen: undefined;
  Homepage: undefined;
  [Cards.Pokedex]: undefined;
  [Cards.Moves]: undefined;
  [Cards.Abilities]: undefined;
  [Cards.Items]: undefined;
  [Cards.Locations]: undefined;
  [Cards.TypeCharts]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <RootStack.Navigator
    initialRouteName={RootStackTypes.SplashScreen}
    screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.white } }}
  >
    <RootStack.Screen name={RootStackTypes.SplashScreen} key={RootStackTypes.SplashScreen} component={SplashScreen} />
    <RootStack.Screen name={RootStackTypes.Homepage} key={RootStackTypes.Homepage} component={Homepage} />

    {/* Cards Group */}
    <RootStack.Group screenOptions={{ headerBackVisible: true, headerShown: true }}>
      <RootStack.Screen name={Cards.Pokedex} component={Pokedex} />
      <RootStack.Screen name={Cards.Moves} component={Moves} />
      <RootStack.Screen name={Cards.Abilities} component={Abilities} />
      <RootStack.Screen name={Cards.Items} component={Items} />
      <RootStack.Screen name={Cards.Locations} component={Locations} />
      <RootStack.Screen name={Cards.TypeCharts} component={TypeCharts} />
    </RootStack.Group>
  </RootStack.Navigator>
);
