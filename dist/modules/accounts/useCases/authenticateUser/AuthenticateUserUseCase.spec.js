"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let createUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dateProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123456',
      driver_license: '000123'
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'false@test.com',
      password: '123456'
    })).rejects.toEqual(new _AppError.AppError('Incorrect email/password combination.'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      password: '123456',
      driver_license: '000123'
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'incorrectPassword'
    })).rejects.toEqual(new _AppError.AppError('Incorrect email/password combination.'));
  });
});