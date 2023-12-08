import { Request, Response } from 'express';
import ResponseHelper from '~/helpers/response.helper';

class AuthController {
  login = async (req: Request, res: Response) => {
    return ResponseHelper.ok({
      test: '123',
    }).sendJson(res);
  };
}

export default new AuthController();
