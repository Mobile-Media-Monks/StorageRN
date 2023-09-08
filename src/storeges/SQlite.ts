import {open} from 'react-native-quick-sqlite';

const db = open({
  name: 'myDb.sqlite',
});

db.execute('DROP TABLE IF EXISTS Benchmark', []);
db.execute('CREATE TABLE IF NOT EXISTS Benchmark(value VARCHAR(30))', []);
db.execute('INSERT INTO Benchmark (value) VALUES (:value)', ['hello']);

export const geFroSqlLite = () => {
  let {rows} = db.execute('SELECT * FROM `Benchmark`', []);

  if (rows == null || rows.length < 1) {
    throw new Error(`Failed to get Values! ${JSON.stringify(rows)}`);
  }

  const row = rows.item(0);
  return row.value;
};
