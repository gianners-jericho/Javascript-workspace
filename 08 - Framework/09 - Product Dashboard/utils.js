const crypto = require('node:crypto')

class PasswordCrypto {
    hash_password(password){
        const salt = crypto.randomBytes(16).toString('hex');
        const buffer = crypto.scryptSync(password, salt, 64);
        return buffer.toString('hex') + "." + salt;
    }

    verify_hash(pw_hash, password){
        const [hash, salt] = pw_hash.split('.');
        const hash_buffer = Buffer.from(hash, 'hex');
        const pass_buffer = crypto.scryptSync(password, salt, 64)
        return crypto.timingSafeEqual(hash_buffer, pass_buffer)
    }
}

module.exports = new PasswordCrypto;