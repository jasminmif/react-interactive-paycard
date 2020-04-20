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

    const updateStateValues = ({ name: keyName, value }) => {
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

    let onCardElementClick = (key) => {
        focusFormFieldByKey(key);
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
        setState({
            ...state,
            currentFocusedElm: cardElementsRef[inputName],
        });
    };

    let onCardInputBlur = (event) => {
        setState({
            ...state,
            currentFocusedElm: null,
        });
    };

    return (
        <div className="wrapper">
            <CForm
                onUpdateStateValue={updateStateValues}
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
                    onCardElementClick={onCardElementClick}
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
