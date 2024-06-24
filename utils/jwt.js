import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const jwt = jsonwebtoken;

const genAuthToken = (user) => {
    const token = jwt.sign({ user_id: user.user_id, org_id: user.org_id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

function verifyAuthToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
}

export default { genAuthToken, verifyAuthToken };