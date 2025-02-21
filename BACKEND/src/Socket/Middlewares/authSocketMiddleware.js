import jwt from 'jsonwebtoken';

const getCookieValue = (cookieString, name) => {
    if (!cookieString) return;
    const match = cookieString.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? match[1] : null;
};

const authSocketMiddleware = (socket, next) => {
    const token = getCookieValue(socket?.handshake?.headers?.cookie, "accessToken");

    if (!token) {
        return next(new Error('Authentication error: Unauthorized Request.'));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        socket.user = decodedToken;
        next();
    } catch (err) {
        return next(new Error('Authentication error: Token Invalid.'));
    }
};

export default authSocketMiddleware;
