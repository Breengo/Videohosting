import ApiError from '../error/ApiError.js';

import jwt from 'jsonwebtoken';

export default function isAuth(req, res, next) {
  const { auth } = req.headers;
  if (!auth) return next(ApiError.forbidden('Unathorized'));
  const rightToken = jwt.verify(auth, process.env.SECRET_KEY);
  if (!rightToken) return next(ApiError.forbidden('Unathorized'));
  req.token = rightToken;
  next();
}
