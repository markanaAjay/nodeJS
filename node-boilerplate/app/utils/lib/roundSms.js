// "1" for Promotional
// "2" for Transactional
// "3" for Promo SenderId

const querystring = require('querystring');

function RoundSMS() {
    //   this.verification = () => `5df1f9e7d6fc0563916f3a24`;
    //   this.forgotpassword = () => `5df1f9e7d6fc0563916f3a24`;
}

RoundSMS.prototype.sendOTP = function (body, callback) {
    if (process.env.NODE_ENV !== 'prod') return callback();
    return new Promise((resolve, reject) => {
        const qstr = querystring.stringify({
            authkey: process.env.ROUNDSMS_API_KEY,
            mobiles: body.sMobile.slice(1),
            message: body.nOTP,
            msg_id: null,
            sender: 'RROUND',
            type: 1,
            route: 2,
        });

        const options = {
            method: 'GET',
            url: `http://roundsms.com/api/sendhttp.php?${qstr}`,
            isSecure: true,
            headers: {
                'content-type': 'application/json',
            },
        };
        // const data = { company_name: 'RummyRound' };
        _.axios(options, (error, response) => {
            if (error) return callback ? callback(error) : reject(error);
            return callback ? callback(null, response) : resolve(response);
        });
    });
};

RoundSMS.prototype.verifyOTP = function (type, body, callback) {
    if (process.env.NODE_ENV !== 'prod') return callback();
    return new Promise((resolve, reject) => {
        const qstr = querystring.stringify({
            otp: body.nOTP,
            authkey: process.env.MSG91_API_KEY,
            mobile: body.sMobile.slice(3),
        });

        const options = {
            method: 'POST',
            hostname: 'api.msg91.com',
            port: null,
            path: `/api/v5/otp/verify?${qstr}`,
            headers: {},
        };

        const data = { company_name: 'Rummy24' };

        _.request(data, options, (error, response) => {
            if (error) return callback ? callback(error) : reject(error);
            return callback ? callback(null, response) : resolve(response);
        });
    });
};

RoundSMS.prototype.send = function (type, body, callback) {
    if (process.env.NODE_ENV !== 'prod') return callback();
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            hostname: 'api.msg91.com',
            path: '/api/v2/sendsms?country=91',
            headers: {
                authkey: process.env.MSG91_API_KEY,
                'content-type': 'application/json',
            },
        };

        const data = {
            sender: 'SOCKET',
            route: '4',
            country: '91',
            sms: [{ message: type(body), to: [body.sMobile.slice(3)] }],
        };

        _.request(data, options, (error, response) => {
            if (error) return callback ? callback(error) : reject(error);
            return callback ? callback(null, response) : resolve(response);
        });
    });
};

module.exports = new RoundSMS();
