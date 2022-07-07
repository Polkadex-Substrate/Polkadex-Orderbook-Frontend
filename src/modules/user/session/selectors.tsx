import { RootState } from "../..";

import { UserSessionPayload } from ".";

export const selectUserSession = (state: RootState): UserSessionPayload => state.user.session;
