import React, { Component } from 'react';
import {
    CSSTransition,
    TransitionGroup,
    SwitchTransition
} from 'react-transition-group';
import './styles.scss';

const CARDS = {
    visa: '^4',
    amex: '^(34|37)',
    mastercard: '^5[1-5]',
    discover: '^6011',
    unionpay: '^62',
    troy: '^9792'
};

// this is used so Sandbox can read the github images
const staticFilesUrl =
    process.env.PUBLIC_URL ||
    'https://raw.githubusercontent.com/jasminmif/react-interactive-paycard/master/public/';

class Card extends Component {
    constructor() {
        super();

        const backgroundImgname = this.cardBackgroundName();
        this.state = {
            style: {},
            counter: 0,
            backgroundImgname: backgroundImgname
        };
    }

    // Url for Background from git
    // process.ENV.PUBLIC_URL is null than get the images from
    // https://raw.githubusercontent.com/jasminmif/react-interactive-paycard/master/public/card-background/1.jpeg
    // for the sandbox to work

    cardType = () => {
        const number = this.props.cardNumber;
        let re;
        for (const [card, pattern] of Object.entries(CARDS)) {
            re = new RegExp(pattern);
            if (number.match(re) != null) {
                return card;
            }
        }

        return 'visa'; // default type
    };

    cardBackgroundName = () => {
        let random = Math.floor(Math.random() * 25 + 1);
        return `${random}.jpeg`;
    };

    removeEmptySpaces = cardNumber => {
        return cardNumber.replace(/\s+/g, '');
    };

    shouldMaskNumber = (cardNumber, index) => {
        if (cardNumber.length === 15) {
            return index > 4 && index < 12;
        } else {
            return index > 4 && index < 13;
        }
    };

    outlineElementStyle = element =>
        element
            ? {
                  width: `${element.offsetWidth}px`,
                  height: `${element.offsetHeight}px`,
                  transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`
              }
            : null;

    componentDidUpdate(prevProps) {
        const { currentFocusedElm } = this.props;
        if (
            currentFocusedElm &&
            currentFocusedElm !== prevProps.currentFocusedElm
        ) {
            const style = this.outlineElementStyle(currentFocusedElm);
            this.setState({ style });
        }
    }

    maskCardNumber(cardNumber) {
        let cardNumberArr = cardNumber.split('');
        cardNumberArr.forEach((val, index) => {
            if (index > 4 && index < 14) {
                if (cardNumberArr[index] !== ' ') {
                    cardNumberArr[index] = '*';
                }
            }
        });

        return cardNumberArr;
    }

    render() {
        let {
            cardHolder,
            cardNumber,
            cardMonth,
            cardYear,
            cardCvv,
            isCardFlipped,
            currentFocusedElm,
            onCardElementClick,
            cardNumberRef,
            cardHolderRef,
            cardDateRef
        } = this.props;

        const cardHolderArr = cardHolder.split('');
        const cardNumberArr = this.maskCardNumber(cardNumber);
        cardCvv = cardCvv.split('');

        return (
            <div className={'card-item ' + (isCardFlipped ? '-active' : '')}>
                <div className="card-item__side -front">
                    <div
                        className={`card-item__focus ${
                            currentFocusedElm ? `-active` : ``
                        }`}
                        style={this.state.style}
                    />
                    <div className="card-item__cover">
                        <img
                            alt=""
                            src={
                                staticFilesUrl +
                                `/card-background/${this.state.backgroundImgname}`
                            }
                            className="card-item__bg"
                        />
                    </div>

                    <div className="card-item__wrapper">
                        <div className="card-item__top">
                            <img
                                src={staticFilesUrl + '/chip.png'}
                                alt=""
                                className="card-item__chip"
                            />
                            <div className="card-item__type">
                                <img
                                    alt={this.cardType()}
                                    src={
                                        staticFilesUrl +
                                        `/card-type/${this.cardType()}.png`
                                    }
                                    className="card-item__typeImg"
                                />
                            </div>
                        </div>

                        <label
                            className="card-item__number"
                            ref={cardNumberRef}
                            onClick={() => onCardElementClick('cardNumber')}
                        >
                            <TransitionGroup
                                className="slide-fade-up"
                                component="div"
                            >
                                {cardNumber ? (
                                    cardNumberArr.map((val, index) => (
                                        <CSSTransition
                                            classNames="slide-fade-up"
                                            timeout={250}
                                            key={index}
                                        >
                                            <div className="card-item__numberItem">
                                                {val}
                                            </div>
                                        </CSSTransition>
                                    ))
                                ) : (
                                    <CSSTransition
                                        classNames="slide-fade-up"
                                        timeout={250}
                                    >
                                        <div className="card-item__numberItem">
                                            #
                                        </div>
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                        </label>
                        <div className="card-item__content">
                            <label
                                className="card-item__info"
                                onClick={() => onCardElementClick('cardHolder')}
                                ref={cardHolderRef}
                            >
                                <div className="card-item__holder">
                                    Card Holder
                                </div>
                                <div className="card-item__name">
                                    <TransitionGroup
                                        className="slide-fade-up"
                                        component="div"
                                    >
                                        {cardHolder === 'FULL NAME' ? (
                                            <CSSTransition
                                                classNames="slide-fade-up"
                                                timeout={250}
                                            >
                                                <div>FULL NAME</div>
                                            </CSSTransition>
                                        ) : (
                                            cardHolderArr.map((val, index) => (
                                                <CSSTransition
                                                    timeout={250}
                                                    classNames="slide-fade-right"
                                                    key={index}
                                                >
                                                    <span className="card-item__nameItem">
                                                        {val}
                                                    </span>
                                                </CSSTransition>
                                            ))
                                        )}
                                    </TransitionGroup>
                                </div>
                            </label>
                            <div
                                className="card-item__date"
                                onClick={() => onCardElementClick('cardDate')}
                                ref={cardDateRef}
                            >
                                <label className="card-item__dateTitle">
                                    Expires
                                </label>
                                <label className="card-item__dateItem">
                                    <SwitchTransition in-out>
                                        {!cardMonth ? (
                                            <CSSTransition
                                                classNames="slide-fade-up"
                                                timeout={250}
                                                key={cardMonth}
                                            >
                                                <span>MM</span>
                                            </CSSTransition>
                                        ) : (
                                            <CSSTransition
                                                classNames="slide-fade-up"
                                                timeout={250}
                                                key={cardMonth}
                                            >
                                                <span>{cardMonth}</span>
                                            </CSSTransition>
                                        )}
                                    </SwitchTransition>
                                </label>
                                /
                                <label
                                    htmlFor="cardYear"
                                    className="card-item__dateItem"
                                >
                                    <SwitchTransition out-in>
                                        {!cardYear ? (
                                            <CSSTransition
                                                classNames="slide-fade-up"
                                                timeout={250}
                                                key={cardYear}
                                            >
                                                <span>YY</span>
                                            </CSSTransition>
                                        ) : (
                                            <CSSTransition
                                                classNames="slide-fade-up"
                                                timeout={250}
                                                key={cardYear}
                                            >
                                                <span>
                                                    {cardYear
                                                        .toString()
                                                        .substr(-2)}
                                                </span>
                                            </CSSTransition>
                                        )}
                                    </SwitchTransition>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-item__side -back">
                    <div className="card-item__cover">
                        <img
                            alt=""
                            src={
                                staticFilesUrl +
                                `/card-background/${this.state.backgroundImgname}`
                            }
                            className="card-item__bg"
                        />
                    </div>
                    <div className="card-item__band" />
                    <div className="card-item__cvv">
                        <div className="card-item__cvvTitle">CVV</div>
                        <div className="card-item__cvvBand">
                            <TransitionGroup>
                                {cardCvv.map((val, index) => (
                                    <CSSTransition
                                        classNames="zoom-in-out"
                                        key={index}
                                        timeout={250}
                                    >
                                        <span>*</span>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </div>
                        <div className="card-item__type">
                            <img
                                alt="card-type"
                                src={staticFilesUrl + '/card-type/visa.png'}
                                className="card-item__typeImg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
