import { capturePayment, createOrder } from "../config/paypal.js";
import { getCacheData, updateCacheMemory } from "../redis/redisFunction.js";
import { updatePlan } from "../services/Workspace.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res, next) => {
  const order = await createOrder(req.body);
  console.log(order.status);
  if (order.status == "CREATED") {
    console.log("Create Order");
    console.log({ userId: req.user._id });
    updateCacheMemory(`payment-${req.user._id}`, req.body);
  }
  res.json(order);
});

export const catchPayment = catchAsync(async (req, res, next) => {
  const { orderID } = req.body;
  const captureData = await capturePayment(orderID);
  if ((captureData.status = "COMPLETED")) {
    const order = await getCacheData(`payment-${req.user._id}`);
    await updatePlan(req.user._id, order.plan);
  }
  res.json({ captureData });
});
