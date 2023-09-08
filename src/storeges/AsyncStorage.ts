import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'user';

AsyncStorage.clear();
AsyncStorage.setItem(KEY, 'elliot');

export const getFromAsyncStorage = async (): Promise<string | null> =>
  AsyncStorage.getItem(KEY);
