"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProvider;
describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      name: 'Blanche Evans',
      email: 'blanchevans@example.com',
      password: '123456',
      driver_license: '1096937528'
    });
    await sendForgotPasswordMailUseCase.execute('blanchevans@example.com');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not ble able to send an email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('blanchevans@example.com')).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');
    usersRepositoryInMemory.create({
      name: 'Blanche Evans',
      email: 'blanchevans@example.com',
      password: '123456',
      driver_license: '1096937528'
    });
    await sendForgotPasswordMailUseCase.execute('blanchevans@example.com');
    expect(generateTokenMail).toBeCalled();
  });
});