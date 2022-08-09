import { Component } from "react";

import './money-switcher.css'

class MoneySwitcher extends Component {
    render () {
        const {currencyNames, onCurrencySelect} = this.props
        const elements = currencyNames.map(item => {

            return (

                <li 
                    className="currentCourse" 
                    onClick={() => onCurrencySelect(item.symbol)}>
                    {item.symbol} {item.label}</li>

            );

        })

        return (
            <ul>
                {elements}
            </ul>
        )
    }
}

export default MoneySwitcher;