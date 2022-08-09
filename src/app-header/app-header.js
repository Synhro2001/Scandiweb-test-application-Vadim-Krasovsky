import { Component } from 'react';

import './app-header.css';

import headerLogo from './image/svg3.png'
import currencyDown from './image/money.png'
import marketLogo from './image/market.png'
import currencyUp from './image/money_switch.png'

class AppHeader extends Component {

    onclick () {
        window.location.assign('http://localhost:3000/');
    }


    render(){
        const {categoryNames, onFilterSelect, 
             onLogoSwitcher,onBagSwitcher, 
             switcher, sumProduct} = this.props;
        
        const logo = switcher ? currencyUp : currencyDown;

        

        return (
            <header className="app-header">
                <div className="head-filter">
                    <nav className="nav-box">
                        <ul className ="nav-filter">
                            <li className="nav-item" onClick={() => onFilterSelect(categoryNames[0].name)}>{categoryNames[0].name}</li>
                            <li className="nav-item" onClick={() => onFilterSelect(categoryNames[1].name)}>{categoryNames[1].name}</li>
                            <li className="nav-item" onClick={() => onFilterSelect(categoryNames[2].name)}>{categoryNames[2].name}</li>
                        </ul>
                        
                    </nav>
                        
                    <img src={headerLogo} alt="headerLogo" onClick={(e) => this.onclick(e)} className='header-logo'/>

                    <div className="market-filter">
                        <a href='#!'><img src={logo} 
                        alt="moneyLogo" 
                        className='money-logo'
                        onClick={onLogoSwitcher}/></a>
                        <a href='#!'><img src={marketLogo} 
                        alt="marketLogo"
                        className='market-logo' 
                        onClick={onBagSwitcher}/>   
                        <span className="circle">{sumProduct}</span></a>

                    </div>
                 
                </div>
              
            </header>
        )
    }
    
}

export default AppHeader

