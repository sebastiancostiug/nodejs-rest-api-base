const checkHeaders = function (headers) {
    let authData = {};
    let authHeader = '';
    switch (true) {
        case headers.hasOwnProperty('authorization') &&
            headers.authorization.startsWith('Basic'):
            authHeader = headers.authorization || '';
            let credentials = Buffer.from(
                authHeader.split(/\s+/).pop() || '',
                'base64'
            )
                .toString()
                .split(/:/);
            authData = {
                type: 'basic',
                email: credentials.shift(),
                password: credentials.join(':'),
            };
            break;
        case headers.hasOwnProperty('authorization') &&
            headers.authorization.startsWith('Bearer'):
            authHeader = headers.authorization || '';
            let token = authHeader.split(/\s+/).pop() || '';
            authData = {
                type: 'token',
                token: token,
            };
            break;
        case headers.hasOwnProperty('x-api-token'):
            authData = {
                type: 'token',
                token: headers.token['x-api-token'],
            };
            break;
        default:
            return null;
    }

    return authData;
};

const checkBody = function (body) {
    let authData = {};
    switch (true) {
        case body.hasOwnProperty('email') && body.hasOwnProperty('password'):
            authData = {
                type: 'basic',
                email: body.email,
                password: body.password,
            };
            break;
        case body.hasOwnProperty('token'):
            authData = {
                type: 'token',
                token: body.token,
            };
            break;
        default:
            return null;
    }

    return authData;
};

module.exports = {
    headers: checkHeaders,
    body: checkBody,
};
