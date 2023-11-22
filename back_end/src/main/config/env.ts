export default {
    port: process.env.PORT || 5050,
    bcryptSalt: process.env.BCRYPTSALT || 12,
    jwtSecret: process.env.JWT_SECRET || 'secret,'
}