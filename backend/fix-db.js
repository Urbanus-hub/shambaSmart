const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'rate6kik',
  database: 'smartShamba',
});
pool.query('ALTER TABLE field_updates ALTER COLUMN agent_id DROP NOT NULL')
  .then(() => { console.log("DB Updated"); process.exit(0); })
  .catch(e => { console.error(e); process.exit(1); });
