// Uso:
//   node reset-dispositivo.js <username>
//
// Limpia el device_id del usuario para que pueda registrar un nuevo dispositivo
// en el próximo login.

const path = require('path');
const Database = require('better-sqlite3');

const username = (process.argv[2] || '').trim();
if (!username) {
  console.error('Uso: node reset-dispositivo.js <username>');
  process.exit(1);
}

const dbPath = path.join(__dirname, 'db', 'usuarios.db');
const db = new Database(dbPath);

try {
  const r = db.prepare('UPDATE users SET device_id=NULL WHERE username=?').run(username);
  if (r.changes === 0) {
    console.log('No existe el usuario:', username);
    process.exit(2);
  }
  console.log('OK. device_id borrado para:', username);
} catch (e) {
  console.error('Error:', e.message);
  process.exit(3);
} finally {
  db.close();
}
