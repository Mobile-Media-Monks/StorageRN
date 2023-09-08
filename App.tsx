import React, {useCallback} from 'react';
import {benchmark, useState, waitForGC} from './src/utils';
import {getFromMMKV} from './src/storeges/MMKV';
import {getFromRealm} from './src/storeges/Realm';
import {geFroSqlLite} from './src/storeges/SQlite';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getFromAsyncStorage} from './src/storeges/AsyncStorage';
import {getFromWatermelonDB} from './src/storeges/WatermelonDb';

type Title = {
  mmkv?: string;
  watermelon?: string;
  sqlite?: string;
  realm?: string;
  async?: string;
};

function App(): JSX.Element {
  const [state, setState] = useState<Title>({
    mmkv: '',
    watermelon: '',
    sqlite: '',
    realm: '',
    async: '',
  });

  const runBenchmarks = useCallback(async () => {
    await waitForGC();
    await benchmark('MMKV', getFromMMKV, text => setState({mmkv: text}));
    await waitForGC();
    await benchmark('WatermelonDB', getFromWatermelonDB, text =>
      setState({watermelon: text}),
    );
    await waitForGC();
    await benchmark('SQLite', geFroSqlLite, text => setState({sqlite: text}));
    await waitForGC();
    await benchmark('Realm', getFromRealm, text => setState({realm: text}));
    await waitForGC();
    await benchmark('AsyncStorage', getFromAsyncStorage, text =>
      setState({async: text}),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Run Benchmarks" onPress={() => runBenchmarks()} />
      {Object.values(state).map((value, index) => {
        return (
          <Text
            key={value}
            style={{
              textTransform: 'capitalize',
            }}>
            {value}
          </Text>
        );
      })}
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
