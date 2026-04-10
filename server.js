import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: 'postgresql://postgres:sb_secret_g7DAi-3P9eGzrZSvhhJeAQ_I0BYxD2X@db.qlxjbwuaxgbdooyupvnx.supabase.co:5432/postgres'
});

async function initDB() {
  try {
    // Table for student submissions
    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        student_email TEXT,
        class_id TEXT,
        meeting_num INTEGER,
        section_name TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Table for transcribed module content
    await pool.query(`
      CREATE TABLE IF NOT EXISTS module_content (
        id SERIAL PRIMARY KEY,
        module_num INTEGER,
        section_title TEXT,
        sub_title TEXT,
        content_type TEXT,
        body_text TEXT,
        page_num INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database tables initialized properly.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}
initDB();

app.get('/api/submissions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM submissions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/submissions', async (req, res) => {
  try {
    const { student_email, class_name, meeting_num, section_name, content } = req.body;
    const result = await pool.query(
      'INSERT INTO submissions (student_email, class_name, meeting_num, section_name, content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [student_email, class_name, meeting_num, section_name, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
