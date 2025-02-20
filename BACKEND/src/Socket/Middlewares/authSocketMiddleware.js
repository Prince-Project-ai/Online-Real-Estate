import jwt from 'jsonwebtoken';

const getCookieValue = (cookieString, name) => {
    const match = cookieString.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? match[1] : null;
};

const authSocketMiddleware = (socket, next) => {
    // console.log(socket?.handshake?.headers);
    // const token = socket?.handshake?.headers?.cookie?.accessToken || "";

    const token = getCookieValue(socket?.handshake?.headers?.cookie, "accessToken");


    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Authentication error: Invalid token'));
        }

        socket.user = decoded;
        next();
    });
};

export default authSocketMiddleware;