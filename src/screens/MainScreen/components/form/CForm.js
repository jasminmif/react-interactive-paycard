import React, { Component } from 'react';

class CForm extends Component {
    constructor(props) {
        super(props);

        const currentYear = new Date().getFullYear();
        this.state = {
            cardNumber: '',
            cardMonth: '',
            cardYear: '',
            monthsArr: Array.from(new Array(12), (x, i) => {
                const month = i + 1;
                return month <= 9 ? '0' + month : month;
            }),
            yearsArr: Array.from(new Array(9), (x, i) => currentYear + i)
        };
    }

    updateMainState = (name, value) => {
        this.props.onUpdateStateValue({
            name,
            value
        });
    };

    handleFormChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
        this.updateMainState(name, value);
    };

    replaceMissingChars = cardNumber => {
        let cardNumberTmp = '#### #### #### ####';
        cardNumberTmp = cardNumberTmp.split('');
        let cardNumberArr = cardNumber.split('');

        let maskedCardNumber = [];
        cardNumberTmp.forEach((val, index) => {
            cardNumberArr[index]
                ? maskedCardNumber.push(cardNumberArr[index])
                : maskedCardNumber.push(val);
        });

        return maskedCardNumber.join('');
    };

    onCardNumberChange = event => {
        let { value, name } = event.target;
        let cardNumber = value;
        value = value.replace(/\D/g, '');
        if (/^3[47]\d{0,13}$/.test(value)) {
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
            // diner's club, 14 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        } else if (/^\d{0,16}$/.test(value)) {
            // regular cc number, 16 digits
            cardNumber = value
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        }

        this.setState({ [name]: cardNumber.trimRight() });
        this.updateMainState(name, cardNumber);
    };

    onCvvFocus = event => {
        this.updateMainState('isCardFlipped', true);
    };

    onCvvBlur = event => {
        this.updateMainState('isCardFlipped', false);
    };

    getSnapshotBeforeUpdate() {
      return this.props.cardNumberRef.current.selectionStart;
    }

    /* Modifying the cardNumber input anywhere but the end of
    the line causes the cursor to jump to the end. This is
    because the value is reformatted with different spacing
    (ie. react doesn't know what to do with the cursor for
    changes between re-renders)

    https://github.com/facebook/react/issues/955#issuecomment-150714427

    This issue is fixed by manually repositioning the cursor
    to account for any additional spacing that is added/removed
    */
    componentDidUpdate(prevProps, prevState, cursorIdx) {
      const node = this.props.cardNumberRef.current;
      const { cardNumber: cardNum } = this.state;
      const { cardNumber: prevCardNum } = prevState;
      if (
        cardNum.length > prevCardNum.length &&
        cardNum[cursorIdx - 1] === " "
      ) {
        cursorIdx += 1;
      } else if (prevCardNum[cursorIdx - 1] === " ") {
        cursorIdx -= 1;
      }
      node.selectionStart = node.selectionEnd = cursorIdx;
    }

    render() {
        const { cardMonth, cardYear, monthsArr, yearsArr } = this.state;
        const {
            cardNumberRef,
            cardHolderRef,
            cardDateRef,
            cardCvvRef,
            onCardInputFocus,
            onCardInputBlur
        } = this.props;
        return (
            <div className="card-form">
                <div className="card-list">{this.props.children}</div>
                <div className="card-form__inner">
                    <div className="card-input">
                        <label
                            htmlFor="cardNumber"
                            className="card-input__label"
                        >
                            Card Number
                        </label>
                        <input
                            type="tel"
                            name="cardNumber"
                            className="card-input__input"
                            autoComplete="off"
                            onChange={this.onCardNumberChange}
                            maxLength="19"
                            ref={cardNumberRef}
                            onFocus={e => onCardInputFocus(e, 'cardNumber')}
                            onBlur={onCardInputBlur}
                            value={this.state.cardNumber}
                        />
                    </div>

                    <div className="card-input">
                        <label htmlFor="cardName" className="card-input__label">
                            Card Holder
                        </label>
                        <input
                            type="text"
                            className="card-input__input"
                            autoComplete="off"
                            name="cardHolder"
                            onChange={this.handleFormChange}
                            ref={cardHolderRef}
                            onFocus={e => onCardInputFocus(e, 'cardHolder')}
                            onBlur={onCardInputBlur}
                        />
                    </div>

                    <div className="card-form__row">
                        <div className="card-form__col">
                            <div className="card-form__group">
                                <label
                                    htmlFor="cardMonth"
                                    className="card-input__label"
                                >
                                    Expiration Date
                                </label>
                                <select
                                    className="card-input__input -select"
                                    value={cardMonth}
                                    name="cardMonth"
                                    onChange={this.handleFormChange}
                                    ref={cardDateRef}
                                    onFocus={e =>
                                        onCardInputFocus(e, 'cardDate')
                                    }
                                    onBlur={onCardInputBlur}
                                >
                                    <option value="" disabled>
                                        Month
                                    </option>

                                    {monthsArr.map((val, index) => (
                                        <option key={index} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="cardYear"
                                    className="card-input__input -select"
                                    value={cardYear}
                                    onChange={this.handleFormChange}
                                    onFocus={e =>
                                        onCardInputFocus(e, 'cardDate')
                                    }
                                    onBlur={onCardInputBlur}
                                >
                                    <option value="" disabled>
                                        Year
                                    </option>

                                    {yearsArr.map((val, index) => (
                                        <option key={index} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="card-form__col -cvv">
                            <div className="card-input">
                                <label
                                    htmlFor="cardCvv"
                                    className="card-input__label"
                                >
                                    CVV
                                </label>
                                <input
                                    type="tel"
                                    className="card-input__input"
                                    maxLength="4"
                                    autoComplete="off"
                                    name="cardCvv"
                                    onChange={this.handleFormChange}
                                    onFocus={this.onCvvFocus}
                                    onBlur={this.onCvvBlur}
                                    ref={cardCvvRef}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CForm;
