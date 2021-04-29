"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _index.default)('localhost');
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)('admin', 8);
  await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'XXXXXX', 'now()')
    `);
  await connection.close;
}

create().then(() => console.log('User admin created!'));