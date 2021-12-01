import { RootState } from "../../";

import { AlertState } from "./actions";

export const selectAlertState = (state: RootState): AlertState => state.public.alerts;
