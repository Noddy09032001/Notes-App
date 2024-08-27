import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import translation from "../../../locale/translation/translation";

interface TranslateState {
  result: {};
  isRtl: boolean;
  langDirection: string;
  langCode: string;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: TranslateState = {
  result: {},
  isRtl: false,
  langDirection: "ltr",
  langCode: "en_us",
  isLoading: false,
  isSuccess: false,
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    resetState(state) {
      state = initialState;
      state.isSuccess = true;
    },
    requestLoading(state) {
      state.isLoading = true;
    },
    requestSuccess(
      state,
      action: PayloadAction<{ result: {}; langCode: string; isRtl: boolean }>
    ) {
      state.result = action.payload.result;
      state.langCode = action.payload.langCode;
      state.isRtl = action.payload.isRtl;
      state.isLoading = false;
      state.isSuccess = true;
    },
    requestFailed(state) {
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

export const { resetState, requestLoading, requestSuccess, requestFailed } =
  translateSlice.actions;
type Value = keyof typeof translation | "en_us";
export const translateAction = (value: Value) => async (dispatch: any) => {
  dispatch(requestLoading());
  let data = translation[value];
  if (data) {
    const LANG_STATE = {
      result: data,
      isRtl: false,
      langDirection: "ltr",
      langCode: value,
      isLoading: false,
      isSuccess: false,
    };
    window.localStorage.setItem("translate", JSON.stringify(LANG_STATE));
    dispatch(requestSuccess({ result: data, langCode: value, isRtl: false }));
  } else {
    dispatch(requestFailed());
  }
};

export default translateSlice.reducer;
