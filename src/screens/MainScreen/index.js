import React, { useState, useRef } from 'react';
import CForm from './components/form';
import Card from './components/card';

const initialState = {
    cardNumber: '#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
    isCardFlipped: false,
    currentFocusedElm: null,
};

const MainScreen = () => {
    const [state, setState] = useState(initialState);

    const updateStateValues = (keyName, value) => {
        setState({
            ...state,
            [keyName]: value || initialState[keyName],
        });
    };

    // References for the Form Inputs
    let formFieldsRefObj = {
        cardNumber: useRef(),
        cardHolder: useRef(),
        cardDate: useRef(),
        cardCvv: useRef(),
    };

    let focusFormFieldByKey = (key) => {
        formFieldsRefObj[key].current.focus();
    };

    // This are the references for the Card DIV elements
    let cardElementsRef = {
        cardNumber: null,
        cardHolder: null,
        cardDate: null,
    };

    let onCardFormInputFocus = (_event, inputName) => {
        const refByName = cardElementsRef[inputName];
        setState({
            ...state,
            currentFocusedElm: refByName,
        });
    };

    let onCardInputBlur = () => {
        setState({
            ...state,
            currentFocusedElm: null,
        });
    };

    return (
        <div className="wrapper">
            <CForm
                cardMonth={state.cardMonth}
                cardYear={state.cardYear}
                onUpdateState={updateStateValues}
                cardNumberRef={formFieldsRefObj.cardNumber}
                cardHolderRef={formFieldsRefObj.cardHolder}
                cardDateRef={formFieldsRefObj.cardDate}
                onCardInputFocus={onCardFormInputFocus}
                onCardInputBlur={onCardInputBlur}
            >
                <Card
                    cardNumber={state.cardNumber}
                    cardHolder={state.cardHolder}
                    cardMonth={state.cardMonth}
                    cardYear={state.cardYear}
                    cardCvv={state.cardCvv}
                    isCardFlipped={state.isCardFlipped}
                    currentFocusedElm={state.currentFocusedElm}
                    onCardElementClick={focusFormFieldByKey}
                    cardNumberRef={(node) =>
                        (cardElementsRef['cardNumber'] = node)
                    }
                    cardHolderRef={(node) =>
                        (cardElementsRef['cardHolder'] = node)
                    }
                    cardDateRef={(node) => (cardElementsRef['cardDate'] = node)}
                ></Card>
            </CForm>
        </div>
    );
};

export default MainScreen;
