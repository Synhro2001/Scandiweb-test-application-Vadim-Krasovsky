import { Component } from "react";

import './cart-overlay.css'

import minusLogo from './image/minus.png'
import plusLogo from './image/plus.png'



class CartOverlay extends Component {
    render () {
        const {name, gallery, neededCategoryWithCurr,
        attributes, productsInBag, productId} = this.props
       
        
        const currentSymbol = neededCategoryWithCurr[0].prices[0].currency.symbol;
        
        const curProductCount = productsInBag[productsInBag.findIndex(elem => elem.id === productId)].count;

        const attributeItem = attributes.map((attribute) =>{
            return (
                <div key={attribute.id}>
                <p className="attribute-name"> {attribute.name} </p>
                <div className="attribute-filter">
                {attribute.items.map((item) => {
                    return (
                        
                        <div 
                        key = {item.id}
                        
                        style = {{backgroundColor: attribute.type === 'swatch' ? item.value : null}}
                                
                        className= "button-style"
                        >
                        <p>
                            {attribute.type === 'text' ? item.value : ''}

                        </p> 
                                          
                        </div>     
                        
                    )

                    })}

                </div>

                </div>
            )
        })

        return (
        <div id = 'flx-dir' className="item-box">
            <div className="item-param">
                <div className="name-and-price">
                <p> {name} <br>

                </br>
                {currentSymbol}
                {this.props.productPrice}
                {/* {prices.find((item) => 
                item.currency.symbol === currentSymbol).amount} */}
                    </p>
                </div>
                <div className="attribute-cointaner-box">

                    {attributeItem}

                </div>
     
            </div>
            
            <div className="add-or-delete">
                <a href='#!'><img src={plusLogo} 
                        alt="plusLogo" 
                        className='plus-logo'
                        onClick={this.props.onAddProductToBag}
                /></a>
                <p> {curProductCount}</p>
                <a href='#!'><img src={minusLogo} 
                        alt="minusLogo" 
                        className='minus-logo'
                        onClick={this.props.onDeleteProductFromBag}
                /></a>
            </div>
            <div className="photo-box">
                <a href='#!'><img src={gallery[0]} 
                        alt="gallery" 
                        className='imagine'/>
                </a>
             
            </div>

        </div>

        )
    }
}

export default CartOverlay