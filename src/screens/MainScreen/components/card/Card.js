import React, { Component, useEffect } from 'react';
import './styles.scss';

const Card = ({
    cardHolder,
    cardNumber,
    cardMonth,
    cardYear,
    cardCvv,
    isCardFlipped,
    onCvvClick,
    onCardNumberClick
}) => {
    let cardType = () => {
        const number = cardNumber;

        let re = new RegExp('^4');
        if (number.match(re) != null) return 'visa';

        re = new RegExp('^(34|37)');
        if (number.match(re) != null) return 'amex';

        re = new RegExp('^5[1-5]');
        if (number.match(re) != null) return 'mastercard';

        re = new RegExp('^6011');
        if (number.match(re) != null) return 'discover';

        re = new RegExp('^62');
        if (number.match(re) != null) return 'unionpay';

        re = new RegExp('^9792');
        if (number.match(re) != null) return 'troy';

        return 'visa'; // default type
    };

    let removeEmptySpaces = cardNumber => {
        return cardNumber.replace(/\s+/g, '');
    };

    let shouldMaskNumber = (cardNumber, index) => {
        if (cardNumber.length == 15) {
            return index > 4 && index < 12;
        } else {
            return index > 4 && index < 13;
        }
    };

    const cardHolderArr = cardHolder.split('');
    const cardNumberArr = cardNumber.split('');
    cardCvv = cardCvv.split('');
    const cardNumberTrimmed = removeEmptySpaces(cardNumber.trim(' '));

    useEffect(() => {});

    return (
        <div className={'card-item ' + (isCardFlipped ? '-active' : '')}>
            <div className="card-item__side -front">
                <div className="card-item__focus"></div>
                <div className="card-item__cover">
                    <img
                        src={process.env.PUBLIC_URL + '/card-background/5.jpeg'}
                        className="card-item__bg"
                    />
                </div>

                <div className="card-item__wrapper">
                    <div className="card-item__top">
                        <img
                            src={process.env.PUBLIC_URL + '/chip.png'}
                            alt=""
                            className="card-item__chip"
                        />
                        <div className="card-item__type">
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    `/card-type/${cardType()}.png`
                                }
                                className="card-item__typeImg"
                            />
                        </div>
                    </div>

                    <label className="card-item__number">
                        <span>
                            <div
                                name="slide-fade-up"
                                onClick={onCardNumberClick}
                            >
                                {cardNumberArr.map((val, index) => (
                                    <div
                                        key={index}
                                        className="card-item__numberItem"
                                    >
                                        {val}
                                    </div>
                                ))}
                            </div>
                        </span>
                    </label>
                    <div className="card-item__content">
                        <label className="card-item__info">
                            <div className="card-item__holder">Card Holder</div>

                            <div className="card-item__name" key="2">
                                {cardHolderArr.map((val, index) => (
                                    <span
                                        key={index}
                                        className="card-item__nameItem slide-fade-right-enter-active"
                                    >
                                        {val}
                                    </span>
                                ))}
                            </div>
                        </label>
                        <div className="card-item__date" onClick={onCvvClick}>
                            <label className="card-item__dateTitle">
                                Expires
                            </label>
                            <label className="card-item__dateItem">
                                <span>{cardMonth}</span>
                            </label>
                            /
                            <label
                                htmlFor="cardYear"
                                className="card-item__dateItem"
                            >
                                <span key="2">
                                    {cardYear.toString().substr(-2)}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-item__side -back" onClick={onCvvClick}>
                <div className="card-item__cover">
                    <img
                        src={process.env.PUBLIC_URL + '/card-background/5.jpeg'}
                        className="card-item__bg"
                    />
                </div>
                <div className="card-item__band"></div>
                <div className="card-item__cvv">
                    <div className="card-item__cvvTitle">CVV</div>
                    <div className="card-item__cvvBand">
                        {cardCvv.map((val, index) => (
                            <span key={index}>*</span>
                        ))}
                    </div>
                    <div className="card-item__type">
                        <img
                            src={process.env.PUBLIC_URL + '/card-type/visa.png'}
                            className="card-item__typeImg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
