import { useReducer } from 'react';
import validator from 'validator';

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === 'BLUR') {
        return { value: state.value, isTouched: true };
    }
    if (action.type === 'RESET') {
        return { value: '', isTouched: false };
    }

    return state;
};

const useInput = ({ validators, value = '' }) => {
    const initialInputState = {
        value: value.toString(),
        isTouched: false,
    };

    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

    const isValid = validators.every(({ name, options = {}, args = [] }) => {
        if (name === 'isEmpty')
            return !validator[name](inputState.value.trim(), options);
        else return validator[name](inputState.value.trim(), ...args, options);
    });

    const hasError = !isValid && inputState.isTouched;

    const inputChangeHandler = (e) => {
        dispatch({ type: 'INPUT', value: e.target.value });
    };

    const inputBlurHandler = (e) => {
        dispatch({ type: 'BLUR' });
    };

    const resetHandler = (e) => {
        dispatch({ type: 'RESET' });
    };

    return {
        value: inputState.value,
        isValid,
        hasError,
        inputChangeHandler,
        inputBlurHandler,
        resetHandler,
    };
};

export default useInput;
