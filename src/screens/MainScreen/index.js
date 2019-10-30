import React from 'react';
import CForm from './components/form';
import Card from './components/card';
import './MainScreen.scss';

const defaultCardNo = '#### #### #### ####';
const defaultCardHolderName = 'FULL NAME';
const defaultCardMonth = 'MM';
const defaultCardYear = 'YY';
const defaultCardCvv = '';

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            cardNumber: defaultCardNo,
            cardHolder: defaultCardHolderName,
            cardMonth: defaultCardMonth,
            cardYear: defaultCardYear,
            cardCvv: defaultCardCvv,
            isCardFlipped: false
        };

        this.state = this.initialState;
    }

    updateStateValue = ({ name, value }) => {
        console.log(name, value);
        this.setState({
            [name]: value || this.initialState[name]
        });
    };

    render() {
        let {
            cardNumber,
            cardHolder,
            cardMonth,
            cardYear,
            cardCvv,
            isCardFlipped
        } = this.state;
        return (
            <div className="wrapper">
                <CForm onUpdateStateValue={this.updateStateValue}>
                    <Card
                        cardNumber={cardNumber}
                        cardHolder={cardHolder}
                        cardMonth={cardMonth}
                        cardYear={cardYear}
                        cardCvv={cardCvv}
                        isCardFlipped={isCardFlipped}
                    ></Card>
                </CForm>
            </div>
        );
    }
}
