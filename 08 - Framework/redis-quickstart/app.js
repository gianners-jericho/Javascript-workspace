import { createClient } from 'redis';

const client = createClient({
    url: 'redis://default:LinkedRulings@localhost:6379'
});
await client.connect();
client.on('error', err => console.log('Redis Client Error', err));

await client.hSet('session:2', {
    "id": 2,
    "sess_string": "askdljhasdljhas"
})
const value = await client.hGetAll('session:2');
console.log(value);
