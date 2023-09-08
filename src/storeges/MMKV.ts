import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

storage.clearAll();

const key = 'username';

storage.set(key, 'Elliot');

export const getFromMMKV = () => storage.getString(key);
