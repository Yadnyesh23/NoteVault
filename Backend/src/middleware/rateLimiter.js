import rateLimit from "../config/upstash.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const rateLimiter = async(req, res, next) => {
    try {
        const {success} = await rateLimit.limit(',y-limit-key');

        if(!success){
            return res.status(429).json(new ApiResponse(429, "Too many requests, Try again later."))
        }   
        
        next();
    } catch (error) {
        console.log(`Rate Limit Error : `, error.message);
        next(error)
    }
}

export default rateLimiter