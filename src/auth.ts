import jwt, { GetTokenCallback } from 'express-jwt';
import keys from './config/keys';
import { RequestHandler } from 'express';

const handleErrorMiddleware: RequestHandler = (req, res, next) => {
  return res.status(200).send({ user: 'not authorized' });
}

const getHttpOnlyToken: GetTokenCallback = (req) => {
  const { token } = req.cookies;
  if (token && token.split(' ')[0] === 'Token') {
    return token.split(' ')[1];
  }
  return null;
};
const getToken: GetTokenCallback = (req) => {
  const { token2 } = req.cookies;
  if (token2 && token2.split(' ')[0] === 'Token') {
    return token2.split(' ')[1];
  }
  return null;
};

const auth = {
  required: [
    jwt({
      secret: keys.jwtHttpOnlyKey,
      userProperty: 'user',
      getToken: getHttpOnlyToken,
    }),
    jwt({
      secret: keys.jwtKey,
      userProperty: 'user',
      getToken,
    }),
    handleErrorMiddleware
  ],
  optional: [
    jwt({
      secret: keys.jwtHttpOnlyKey,
      userProperty: 'user',
      getToken: getHttpOnlyToken,
      credentialsRequired: false,
    }),
    jwt({
      secret: keys.jwtKey,
      userProperty: 'user',
      getToken,
      credentialsRequired: false,
    }),
  ],
};

export default auth;
