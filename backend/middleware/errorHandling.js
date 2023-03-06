export const globalErrorHandling = (err, req, res, next) => {
  console.log(err);
  res.status(404).json({
    status: "fail",
    error: `${err}`,
  });
};
