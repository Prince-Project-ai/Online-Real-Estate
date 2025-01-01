// const asyncHandler = (func) => {
//   return async (req, res, next) => {
//     try {
//       await func(req, res, next);
//     } catch (error) {
//       const statuss = error.code || error.status || 500;
//       res.status(statuss).json({
//         success: false,
//         message: error.message || "An unexpected error occurred",
//       });
//     }
//   };
// };

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
  };
};


