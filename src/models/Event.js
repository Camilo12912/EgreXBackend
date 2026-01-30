const db = require('../config/db');

class Event {
    static async findAll() {
        const query = 'SELECT id, title, description, date, location, image_url, image_data, form_questions FROM events ORDER BY date ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async create(event) {
        const { title, description, date, location, imageUrl, imageData, formQuestions } = event;
        const query = `
      INSERT INTO events (id, title, description, date, location, image_url, image_data, form_questions)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
        const values = [title, description, date, location, imageUrl, imageData, JSON.stringify(formQuestions || [])];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async update(id, event) {
        const { title, description, date, location, imageUrl, imageData, formQuestions } = event;

        const updates = [];
        const values = [id];
        let paramIndex = 2;

        if (title !== undefined) { updates.push(`title = $${paramIndex++}`); values.push(title); }
        if (description !== undefined) { updates.push(`description = $${paramIndex++}`); values.push(description); }
        if (date !== undefined) { updates.push(`date = $${paramIndex++}`); values.push(date); }
        if (location !== undefined) { updates.push(`location = $${paramIndex++}`); values.push(location); }
        if (imageUrl !== undefined) { updates.push(`image_url = $${paramIndex++}`); values.push(imageUrl); }
        if (imageData !== undefined) { updates.push(`image_data = $${paramIndex++}`); values.push(imageData); }
        if (formQuestions !== undefined) {
            updates.push(`form_questions = $${paramIndex++}`);
            values.push(JSON.stringify(formQuestions));
        }

        // Add revision timestamp if table supports it, or just return if no updates
        if (updates.length === 0) return null;

        const query = `
            UPDATE events 
            SET ${updates.join(', ')}
            WHERE id = $1
            RETURNING *;
        `;

        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async findById(id) {
        const query = 'SELECT * FROM events WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Event;
