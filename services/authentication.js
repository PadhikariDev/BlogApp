
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const superKey = process.env.secreteKey;

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    };
    const token = JWT.sign(payload, superKey);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, superKey);
    return payload;
};

export {
    createTokenForUser, validateToken
}