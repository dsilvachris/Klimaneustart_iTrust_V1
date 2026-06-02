import rateLimit from 'express-rate-limit';

// Strict limiter for authentication endpoints to mitigate credential
// brute-forcing and token-guessing (login / refresh).
// Counts failed attempts per IP within the window; successful logins
// do not count against the limit.
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: Number(process.env.AUTH_RATE_LIMIT || 5),
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { error: 'Too many attempts. Please try again later.' },
});
