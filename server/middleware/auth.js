import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //isCustomAuth is true if the token is ours.
        let decodedData;
        if (token && isCustomAuth) {
            //In case the auth used is ours
            decodedData = jwt.verify(token, 'testSecret');

            req.userId = decodedData?.id;   
        } else {
            //In case the auth used is Google's
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;   
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;