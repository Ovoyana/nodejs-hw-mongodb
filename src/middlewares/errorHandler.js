import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
          status: err.status,
          message: err.name,
          data: err,
        });
        return;
      }

    res.json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });

    // res.json({
    //     status:404,
    //     message: 'Contact not found',
    //     data: err.message,
    // })
  };
