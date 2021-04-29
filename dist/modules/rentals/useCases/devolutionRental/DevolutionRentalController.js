"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalService = require("./DevolutionRentalService");

class DevolutionRentalController {
  async handle(request, response) {
    const {
      id: user_id
    } = request.user;
    const {
      id
    } = request.params;

    const devolutionRentalUseCase = _tsyringe.container.resolve(_DevolutionRentalService.DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id
    });
    return response.status(200).json(rental);
  }

}

exports.DevolutionRentalController = DevolutionRentalController;