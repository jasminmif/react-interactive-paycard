import React, { useContext, useState } from 'react';

export const DEFAULT_CARD_STATE = {
    cardNumber: '"#### #### #### ####',
    cardHolder: 'FULL NAME',
    cardMonth: '',
    cardYear: '',
    cardCVV: '',
    isFlipped: false,
    currentFocusedElm: null,
};

export const cardContext = React.createContext(DEFAULT_CARD_STATE);

export const useCard = () => {
    const [cardNumber, setCardNumber] = useState(DEFAULT_CARD_STATE.cardNumber);
    const [cardHolder, setCardHolder] = useState(DEFAULT_CARD_STATE.cardHolder);
    const [cardMonth, setCardMonth] = useState(DEFAULT_CARD_STATE.cardMonth);
    const [cardYear, setCardYear] = useState(DEFAULT_CARD_STATE.cardYear);
    const [cardCVV, setCardCVV] = useState(DEFAULT_CARD_STATE.cardCVV);
    const [isFlipped, setIsFlipped] = useState(DEFAULT_CARD_STATE.isFlipped);
    const [currentFocusedElm, setCurrentFocusedElm] = useState(
        DEFAULT_CARD_STATE.currentFocusedElm
    );
};

export const useCardState = () => {};
