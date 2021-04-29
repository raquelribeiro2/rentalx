"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateUsersRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");

const authenticateUsersRoutes = (0, _express.Router)();
exports.authenticateUsersRoutes = authenticateUsersRoutes;
const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
authenticateUsersRoutes.post('/sessions', authenticateUserController.handle);
authenticateUsersRoutes.post('/refresh-token', refreshTokenController.handle);