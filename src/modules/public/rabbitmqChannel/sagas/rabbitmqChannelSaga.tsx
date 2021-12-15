import { put, select, take } from "redux-saga/effects";
import {selectRabbitmqChannel} from '../selectors';
import { alertPush } from "../../alertHandler";


export function* rabbitmqChannelSaga() {
  try {
    const channel = yield select(selectRabbitmqChannel);
    while (true && channel) {
      const msg = yield take(channel);
      console.log("inside while true", msg);
    }
  } catch (error) {
    console.log("error in rabbitmq", error);
    return;
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
