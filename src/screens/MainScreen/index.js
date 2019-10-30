import React, { Component, useState, createRef } from 'react';
import CForm from './components/form';
import Card from './components/card';
import './MainScreen.scss';

const defaultCardNo = '#### #### #### ####';
const defaultCardHolderName = 'FULL NAME';
const defaultCardMonth = 'MM';
const defaultCardYear = 'YY';
const defaultCardCvv = '';

const MainScreen = ({}) => {
    const initialState = {
        cardNumber: defaultCardNo,
        cardHolder: defaultCardHolderName,
        cardMonth: defaultCardMonth,
        cardYear: defaultCardYear,
        cardCvv: defaultCardCvv,
        isCardFlipped: false
    };
    const [state, setState] = useState(initialState);

    const updateStateValue = ({ name, value }) => {
        console.log(name, value);
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

    let cvvRef = null;
    let focusCvvField = () => {
        cvvRef.focus();
    };

    let cardNumberRef;
    let focusCardNumberField = () => {
        cardNumberRef.focus();
    };

    return (
        <div className="wrapper">
            <CForm
                onUpdateStateValue={updateStateValue}
                cvvRef={node => (cvvRef = node)}
                cardNumberRef={node => (cardNumberRef = node)}
            >
                <Card
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    cardMonth={cardMonth}
                    cardYear={cardYear}
                    cardCvv={cardCvv}
                    isCardFlipped={isCardFlipped}
                    onCvvClick={focusCvvField}
                    onCardNumberClick={focusCardNumberField}
                ></Card>
            </CForm>
        </div>
    );
};

export default MainScreen;
