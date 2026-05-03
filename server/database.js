const Database = require('better-sqlite3');
const db = new Database('token_monitor.db');

db.exec(`
    CREATE TABLE IF NOT EXiSTS models ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT , 
    name TEXT NOT NULL , 
    provider TEXT NOT NULL ,
    cost_per_token REAL NOT NULL 
    );
    CREATE TABLE IF NOT EXISTS api_calls(
    
    id INTEGER PRIMARY KEY AUTOINCREMENT , 
    model_id INTEGER NOT NULL ,
    tokens_used INTEGER NOT NULL , 
    cost REAL NOT NULL , 
    note TEXT , 
    created_at TEXT DEFAULT ( datetime('now'))
    FOREIGN KEY (model_id) REFERENCES models(id)
    );
    `);

    const count = db.prepare('SELECT COUNT(*) as count FROM models').get();
    if(count.count === 0 ) {
        const insert = db.prepare(`INSERT INTO models (name , provider , cost_per_1k_tokens) VALUES (? , ? , ?));
            `);
            insert.run('gpt-4o' , 'OpenAI' , 0.005);
            insert.run('claude-3-5-sonnet' , 'Anthropic' , 0.003);
            insert.run('deepseek-chat' , 'DeepSeek' , 0.0002);
    }
    module.exports = db;