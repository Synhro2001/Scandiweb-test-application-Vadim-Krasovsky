import { Component } from 'react';

import './product-listing-card.css';

import shopLogo from './shop-logo/shop-logo.png'

//<img url={firstCard} alt="fisrtCard" className='first-card'/>

class ProductListingCard extends Component {
       
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

export default ProductListingCard;
