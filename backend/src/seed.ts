import pool from './db/pool';
import { hashPassword } from './utils/password';

async function seed() {
  const adminPassword = await hashPassword('admin123');
  const agentPassword = await hashPassword('agent123');

  try {
    console.log('Seeding demo data...');

    // Clear existing to avoid unique constraint issues
    await pool.query('DELETE FROM field_updates');
    await pool.query('DELETE FROM fields');
    await pool.query('DELETE FROM users');
    
    // Insert Admin
    const adminRes = await pool.query(`
      INSERT INTO users (id, name, email, password, role, employee_id)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)
      RETURNING id
    `, ['Admin User', 'admin@shambasmart.com', adminPassword, 'ADMIN', 'ADM-001']);

    // Insert Agents
    const agent1Res = await pool.query(`
      INSERT INTO users (id, name, email, password, role, employee_id)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)
      RETURNING id
    `, ['Demo Agent 1', 'agent1@shambasmart.com', agentPassword, 'AGENT', 'EMP-001']);

    const agent2Res = await pool.query(`
      INSERT INTO users (id, name, email, password, role, employee_id)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)
      RETURNING id
    `, ['Demo Agent 2', 'agent2@shambasmart.com', agentPassword, 'AGENT', 'EMP-002']);

    const adminId = adminRes.rows[0].id;
    const agent1Id = agent1Res.rows[0].id;

    // Seed some fields for Agent 1 to test with
    await pool.query(`
      INSERT INTO fields (id, name, crop_type, planting_date, growth_duration_days, stage, assigned_agent_id)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6)
    `, ['North Plot 01', 'Maize', '2026-03-01', 90, 'GROWING', agent1Id]);

    await pool.query(`
      INSERT INTO fields (id, name, crop_type, planting_date, growth_duration_days, stage, assigned_agent_id)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6)
    `, ['South Plot 02', 'Beans', '2026-04-01', 60, 'PLANTED', agent1Id]);

    console.log('\n✅ Demo data seeded successfully!\n');
    console.log('--- DEMO LOGINS ---');
    console.log('Admin account:');
    console.log('  Email:    admin@shambasmart.com');
    console.log('  Password: admin123\n');
    
    console.log('Agent 1 account:');
    console.log('  Email:    agent1@shambasmart.com');
    console.log('  Password: agent123\n');

    console.log('Agent 2 account:');
    console.log('  Email:    agent2@shambasmart.com');
    console.log('  Password: agent123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seed();
