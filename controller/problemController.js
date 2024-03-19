const { problem_router } = require("../problem_router");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
exports.solve = (req, res) => {
  try {
    const input = req.body.input;
    const problem_id = req.body.problemId;
    const result = problem_router[`${problem_id}`](input);
    res.send(result);
  } catch (err) {
    return next(new ErrorHander(err.message, 400));
  }
};
