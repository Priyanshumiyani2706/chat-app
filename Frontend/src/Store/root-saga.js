import { all, call } from 'typed-redux-saga/macro';

import { userSagas } from './user/user.saga'
import { messageSagas } from './messages/message.saga';

export function* rootSaga() {
    yield* all([
        call(userSagas),
        call(messageSagas)
    ]);
}
