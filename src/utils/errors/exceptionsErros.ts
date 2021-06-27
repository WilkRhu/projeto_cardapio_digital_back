import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionsErrors {
  public errors(data) {
    if (data.name === 'SequelizeUniqueConstraintError') {
      return new HttpException(
        {
          name: data.name,
          message: data.original.sqlMessage || data.original.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return new HttpException(
      {
        error: data,
      },
      data.status,
    );
  }
}
