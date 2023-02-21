import Redis from 'redis';


export async function connectToRedis() {
    // type url link inside createClient when it in the production
    const redisClient = Redis.createClient()
    await redisClient.connect()
    console.log('connected to redis server')
    return redisClient
}