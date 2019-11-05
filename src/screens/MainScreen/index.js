import React, { Component, useState, createRef } from 'react';
import CForm from './components/form';
import Card from './components/card';
// import './MainScreen.scss';

const defaultCardNo = '#### #### #### ####';
const defaultCardHolderName = 'FULL NAME';
const defaultCardMonth = '';
const defaultCardYear = '';
const defaultCardCvv = '';

const MainScreen = ({}) => {
    const initialState = {
        cardNumber: defaultCardNo,
        cardHolder: defaultCardHolderName,
        cardMonth: defaultCardMonth,
        cardYear: defaultCardYear,
        cardCvv: defaultCardCvv,
        isCardFlipped: false,
        currentFocusedElm: null
    };
    const [state, setState] = useState(initialState);

    const updateStateValue = ({ name, value }) => {
        setState({
            ...state,
            [name]: value || initialState[name]
        });
    };

    const {
        cardNumber,
        cardHolder,
        cardMonth,
        cardYear,
        cardCvv,
        isCardFlipped
    } = state;
    var { currentFocusedElm } = state;

    // References for the Form Inputs
    let formFieldsRefObj = {
        cardNumber: null,
        cardHolder: null,
        cardDate: null,
        cardCvv: null
    };

    let onCardElementClick = key => {
        focusFormFieldByKey(key);
    };

    let focusFormFieldByKey = key => {
        formFieldsRefObj[key].focus();
    };

    // This are the references for the Card DIV elements
    let cardElementsRef = {
        cardNumber: null,
        cardHolder: null,
        cardDate: null
    };

    let onCardFormInputFocus = (_event, inputName) => {
        setState({
            ...state,
            currentFocusedElm: cardElementsRef[inputName]
        });
    };

    let onCardInputBlur = event => {
        setState({
            ...state,
            currentFocusedElm: null
        });
    };

    return (
        <div className="wrapper">
            <CForm
                onUpdateStateValue={updateStateValue}
                cardNumberRef={node => (formFieldsRefObj['cardNumber'] = node)}
                cardHolderRef={node => (formFieldsRefObj['cardHolder'] = node)}
                cardDateRef={node => (formFieldsRefObj['cardDate'] = node)}
                onCardInputFocus={onCardFormInputFocus}
                onCardInputBlur={onCardInputBlur}
            >
                <Card
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    cardMonth={cardMonth}
                    cardYear={cardYear}
                    cardCvv={cardCvv}
                    isCardFlipped={isCardFlipped}
                    currentFocusedElm={currentFocusedElm}
                    onCardElementClick={onCardElementClick}
                    cardNumberRef={node =>
                        (cardElementsRef['cardNumber'] = node)
                    }
                    cardHolderRef={node =>
                        (cardElementsRef['cardHolder'] = node)
                    }
                    cardDateRef={node => (cardElementsRef['cardDate'] = node)}
                ></Card>
            </CForm>
        </div>
    );
};

export default MainScreen;
