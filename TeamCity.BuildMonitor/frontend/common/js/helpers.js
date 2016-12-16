'use strict';

var helpers = {
    throttleCall: (func, ms, lastExecute) => {
        lastExecute = typeof lastExecute == 'boolean' ? lastExecute : true;
        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {
            if (isThrottled) {
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments);

            isThrottled = true;

            setTimeout(() => {
                isThrottled = false;
                if (savedArgs) {
                    if (lastExecute) {
                        wrapper.apply(savedThis, savedArgs);
                    }
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    },

    debounceCall: (f, ms) => {
        var state = null;
        var cooldown = 1;

        return () => {
            if (state) {
                return;
            }

            f.apply(this, arguments);

            state = cooldown;
            setTimeout(() => {
                state = null;
            }, ms);
        }
    }
}

export default helpers;