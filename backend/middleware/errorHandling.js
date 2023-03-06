export const globalErrorHandling = (err, req, res, next) => {
  res.status(404).json({
    status: "fail",
    error: `${err}`,
  });
};
