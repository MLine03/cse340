import { handleErrors } from "./errorHandler.js";
import * as accountModel from "../models/accountModel.js";
import * as inventoryModel from "../models/inventoryModel.js";
import * as classificationModel from "../models/classificationModel.js";

export { handleErrors };
export const { checkExistingEmail, registerAccount } = accountModel;
export const { getInventory, addInventory, updateInventory, deleteInventory } = inventoryModel;
export const { getClassifications } = classificationModel;