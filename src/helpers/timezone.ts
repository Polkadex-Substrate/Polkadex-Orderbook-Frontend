// TODO: Replace Moment - deprecated lib

import moment from "moment-timezone";

const timezone = "";
export const getTimezone = () => (timezone.length > 0 ? timezone : moment.tz.guess());
