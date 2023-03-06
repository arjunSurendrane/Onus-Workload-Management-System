import { connectToRedis } from "./connect.js";

// function for get or set data from redis
export async function getOrSetFunction(key, cb) {
  const redisClient = await connectToRedis();
  const res = await redisClient.get(key);
  if (res != null) {
    console.log("from redis");
    return JSON.parse(res);
  }
  const fetchData = await cb();
  redisClient.setEx(key, process.env.REDIS_EXPIRE, JSON.stringify(fetchData));
  return fetchData;
}

// update data
export async function updateCacheMemory(key, data) {
  const redisClient = await connectToRedis();
  const res = await redisClient.setEx(
    key,
    process.env.REDIS_EXPIRE,
    JSON.stringify(data)
  );
  return res;
}

export async function deleteCache(key) {
  const redisClient = await connectToRedis();
  const del = await redisClient.del(key);
  return del;
}

export async function getCacheData(key) {
  const redisClient = await connectToRedis();
  const data = await redisClient.get(key);
  return JSON.parse(data);
}
