import { PayloadAction } from "@reduxjs/toolkit";
import { SliceStatus } from "../globals";

export const statusHandlerReducer = {
  initialize: (state: any, action: PayloadAction) => {
    state.status.state = SliceStatus.LOADING;
  },
  error: (state: any, action: PayloadAction) => {
    state.status.state = SliceStatus.ERROR;
  },
  success: (state: any, action: PayloadAction) => {
    state.status.state = SliceStatus.SUCCESS;
  },
};
