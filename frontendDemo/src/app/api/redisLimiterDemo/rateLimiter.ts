import { createClient } from 'redis';

export const redisRateLimiter = async (
    limit: number,
    windowMs: number,
    req: Request
): Promise<{ status: number, error?: string }> => {
    const redis = await createClient({
        url: process.env.REDIS_URL
    }).connect();

    const _ip = req.headers.get('x-forwarded-for');
    const x_ip = req.headers.get('x-real-ip');
    const ip = x_ip ?? _ip

    if (!ip) {
        return { status: 500, error: `Can not find your IP address` }
    }

    const key = `rate_limit:${ip}`;

    try {
        /**
         * 
         * const [currentCount] = await redis
            .multi()          // 开启Redis事务
            .incr(key)        // 1. 将当前key的值+1（如果key不存在会自动创建并设为1）
            .expire(key, Math.ceil(windowMs / 1000), 'NX') // 2. 设置过期时间（仅在key不存在时设置）
            .exec();          // 执行事务
            说明：
                1. `multi()` 开启一个Redis事务，保证后续命令的原子性执行
                2. `incr(key)` 对当前key（基于IP）的计数器进行+1操作
                3. `expire()` 设置过期时间：`Math.ceil(windowMs / 1000)` 将毫秒转换为秒（向上取整）
                4. exec() 原子性执行事务中的所有命令
         */
        const [currentCount] = await redis
            .multi()
            .incr(key)
            .expire(key, Math.ceil(windowMs / 1000), 'NX')
            .exec();

        if (currentCount && typeof currentCount === "number" && currentCount > limit) {
            const ttl = await redis.ttl(key);
            return { status: 429, error: `Requests too frequent, please try again in ${ttl} seconds` }
        } else {
            console.log(currentCount);
            return { status: 200 }
        }
    } catch (error) {
        console.error('Redis error:', error);
        return { status: 500, error: `Internal server error` }
    }
};