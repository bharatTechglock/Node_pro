import jwt  from 'jsonwebtoken';

const logingUser = (req, res) => {
    if (req.headers && req.headers["authorization"]) {
        let token = req.headers["authorization"].split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
            // console.log('heje',decoded);
            return decoded;
        } catch (e) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    return res.send(500);
};

export {logingUser}