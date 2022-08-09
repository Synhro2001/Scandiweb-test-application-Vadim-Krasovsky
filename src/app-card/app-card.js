import { Component } from 'react';

import './app-card.css';
import shopLogo from './shop-logo/shop-logo.png'


//<img url={firstCard} alt="fisrtCard" className='first-card'/>

// probuju sdelatj stilj photo exportiruja photo
// photo nado bratj s severa ! 
//after out of stock <img src={shopLogo} alt="shopLogo" className='shop-logo' />


class AppCard extends Component {
       
    render(){
    
        const {name, gallery, neededCategoryWithCurr,neededAmount, index, 
        inStock, onAddProductToBag, onPDPswitcher} = this.props; 
       
        const outOfStockClass = !inStock ? " out-of-stock" : "";
        const existOnAddBtn = outOfStockClass ? null : onAddProductToBag;

        return (
            <div className={`card-style ${outOfStockClass}`}>
                <div className={`photo-container`}>
                    <p className='out-of-stock-text'>OUT OF STOCK</p>
                    <img src={gallery[0]} alt='gallery'
                        className='make-gallery'
                        onClick={onPDPswitcher}
                     />	
                    <img 
                        src={shopLogo} 
                        alt='shopLogo' 
                        className="shop-logo"
                        onClick={existOnAddBtn} />

                </div>

                <div className="descriptionCard">
                    <p>{name}</p> 
                    <p >{neededCategoryWithCurr[0].prices[0].currency.symbol}
                     {neededAmount[index].amount}</p>
                </div>
  
            </div>
        )

    }
    
    

}

export default AppCard;



/* 

const AppCard = (props) => {

    const {name, gallery, prices} = props; 
    const {currency} = prices[0];
  
    return (
        <div className='card-style '>
            <div className="photo-container ">
            <img src={gallery[0]} alt='gallery' className='make-gallery'/>
               
                <p>OUT OF STOCK</p>
            </div>
            <div className="descriptionCard">
                <p>{name}</p> 
                <p >{currency.symbol}{prices[0].amount}</p>
            </div>
               



                
        </div>


    )
    

}
*/