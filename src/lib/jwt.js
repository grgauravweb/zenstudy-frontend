import jwt from 'jsonwebtoken'
export function signJwtToken(payload, options={}){
    const secret= process.env.JWT_SECRET;
    const token= process.sign(payload, secret, options);
    return token;
}
export function VerifyJwtToken(token){
    try {
    const secret= process.env.JWT_SECRET;
    const payload= jwt.verify(token, secret);
    } catch (error) {
        console.error(error);
        return null;
    }
}