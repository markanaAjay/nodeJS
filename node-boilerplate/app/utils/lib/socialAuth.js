const services = {};

services.googleLogin = ({ idToken }, callback) => {
    const options = {
        method: 'GET',
        hostname: `oauth2.googleapis.com`,
        path: `/tokeninfo?id_token=${idToken}`,
        headers: { 'Content-Type': 'application/json' },
        isSecure: true,
        rejectUnauthorized: false,
    };

    _.request({}, options, (error, response) => {
        if (error) return callback(error);
        const userData = {
            sEmail: response.email,
            sGoogleId: response.sub,
        };
        callback(null, userData);
    });
};

services.facebookLogin = ({ facebookId, accessToken }, callback) => {
    const options = {
        method: 'GET',
        hostname: `graph.facebook.com`,
        headers: { 'Content-Type': 'application/json' },
        path: `/v7.0/${facebookId}?fields=name,email&access_token=${accessToken}`,
        isSecure: true,
        rejectUnauthorized: false,
    };
    // `/v7.0/debug_token?input_token=${inputToken}`
    _.request({}, options, (error, response) => {
        if (error) return callback(error);
        log.yellow('response :: ', response);
        const userData = {
            sEmail: response.email,
            sFacebookId: response.id,
        };
        callback(null, userData);
    });
};

module.exports = services;
