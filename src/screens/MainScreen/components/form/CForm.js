import React, { Component, createRef } from 'react';

class CForm extends Component {
    constructor(props) {
        super(props);

        const currentYear = new Date().getFullYear();
        this.state = {
            cardMonth: '',
            cardYear: '',
            monthsArr: Array.from(new Array(12), (x, i) => {
                const month = i + 1;
                return month <= 9 ? '0' + month : month;
            }),
            yearsArr: Array.from(new Array(9), (x, i) => currentYear + i)
        };

        // this.ref = createRef();
    }

    updateMainState = (name, value) => {
        this.props.onUpdateStateValue({
            name,
            value
        });
    };

    handleFormChange = event => {
        const { name, value } = event.target;

        if (name === 'cardNumber') {
        }

        this.setState({ [name]: value });

        this.updateMainState(name, value);
    };

    onCvvFocus = event => {
        this.updateMainState('isCardFlipped', true);
    };

    onCvvBlur = event => {
        this.updateMainState('isCardFlipped', false);
    };

    render() {
        const { cardMonth, cardYear, monthsArr, yearsArr } = this.state;
        const { cardNumberRef, cvvRef } = this.props;
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
                            type="text"
                            name="cardNumber"
                            className="card-input__input"
                            autoComplete="off"
                            onChange={this.handleFormChange}
                            maxLength="16"
                            ref={cardNumberRef}
                        />
                    </div>

                    <div className="card-input">
                        <label htmlFor="cardName" className="card-input__label">
                            Card Name
                        </label>
                        <input
                            type="text"
                            className="card-input__input"
                            autoComplete="off"
                            name="cardHolder"
                            onChange={this.handleFormChange}
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
                                    ref={cvvRef}
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
