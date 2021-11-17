import { AlertState } from "@polkadex/web-modules";

import { RootState } from "../..";

export const selectAlertState = (state: RootState): AlertState => state.public.alerts;
