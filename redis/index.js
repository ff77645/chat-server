import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

// await client.set('key', 'value2');
// const value = await client.get('key');
// await client.disconnect();


export default client