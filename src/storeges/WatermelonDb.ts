import {appSchema, Database, Model, tableSchema} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {field} from '@nozbe/watermelondb/decorators';

const TABLE = 'User';

class TestModel extends Model {
  static table = TABLE;

  @field('user') user?: string;
}

const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TABLE,
      columns: [{name: 'user', type: 'string'}],
    }),
  ],
});

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema: schema,
});

const database = new Database({
  adapter: adapter,
  modelClasses: [TestModel],
});

const table = database.collections.get(TABLE);

interface TestModel extends Model {
  user?: string;
}

const promise = database.write(async () => {
  await database.unsafeResetDatabase();
  try {
    const entry = await table.create((model: TestModel) => {
      model._raw.id = 'elliot';
      model.user = 'elliot';
    });
    return entry;
  } catch (e) {
    console.error('WatermelonDB: Failed to set value!', e);
  }
});
let isCreated = false;

export async function getFromWatermelonDB(): Promise<string | null> {
  if (!isCreated) {
    await promise;
    isCreated = true;
  }
  const row: TestModel = await table.find('elliot');
  return row.user ?? null;
}
