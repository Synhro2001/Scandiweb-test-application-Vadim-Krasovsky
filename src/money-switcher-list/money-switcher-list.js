import { Component } from "react";

import MoneySwitcher from "../money-switcher/money-switcher";

import './money-switcher-list.css'


class MoneySwitcherList extends Component {
    render() {
        const {currencyNames, onCurrencySelect} = this.props;
        return (
            <div className="money-switcher">
                <MoneySwitcher
                    currencyNames = {currencyNames}
                    onCurrencySelect = {onCurrencySelect}
                    

                />
            </div>
        )

    }

}


export default MoneySwitcherList;