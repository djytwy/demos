const jwt = require("jsonwebtoken")

const secretKey = `-----BEGIN PRIVATE KEY-----

-----END PRIVATE KEY-----`;

const payload = {
    sub: 'uuid',
};
const token = jwt.sign(payload, secretKey, {
    algorithm: 'RS256',
    expiresIn: '7d',
    keyid: 'ambrus_account_center'
});

console.log(token);