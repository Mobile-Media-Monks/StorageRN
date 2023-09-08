import React, {useCallback} from 'react';
import {benchmark, waitForGC} from './src/utils';
import {getFromMMKV} from './src/storeges/MMKV';
import {getFromRealm} from './src/storeges/Realm';
import {geFroSqlLite} from './src/storeges/SQlite';
import {Button, StyleSheet, View} from 'react-native';
import {getFromAsyncStorage} from './src/storeges/AsyncStorage';
import {getFromWatermelonDB} from './src/storeges/WatermelonDb';

function App(): JSX.Element {
  const runBenchmarks = useCallback(async () => {
    await waitForGC();
    await benchmark('MMKV                 ', getFromMMKV);
    await waitForGC();
    await benchmark('WatermelonDB                 ', getFromWatermelonDB);
    await waitForGC();
    await benchmark('SQLite                 ', geFroSqlLite);
    await waitForGC();
    await benchmark('Realm                 ', getFromRealm);
    await waitForGC();
    await benchmark('AsyncStorage                 ', getFromAsyncStorage);
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Run Benchmarks" onPress={() => runBenchmarks()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
