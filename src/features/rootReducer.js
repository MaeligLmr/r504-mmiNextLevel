import { combineReducers } from "redux";

import admin from "./admin/adminSlice";
import formation from "./formation/formationSlice";

export default combineReducers({ admin, formation });