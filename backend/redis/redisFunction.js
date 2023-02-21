import { connectToRedis } from "./connect.js";



// function for get or set data from redis
export async function getOrSetFunction(key, cb) {
    const redisClient = await connectToRedis()
    const res = await redisClient.get(key)
    if (res != null) {
        console.log({ res })
        return JSON.parse(res)
    };
    const fetchData = await cb();
    redisClient.setEx(key, 3600, JSON.stringify(fetchData))
    console.log({ fetchData })
    return fetchData;
}


// update data
export async function updateCacheMemory(key, data) {
    const redisClient = await connectToRedis()
    const res = await redisClient.setEx(key, 3600, JSON.stringify(data))
    return res
}

