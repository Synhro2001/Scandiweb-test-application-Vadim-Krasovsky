import { Component } from "react";

import './cart-item-list.css'

import plusItems from './image/plusItems.png'
import minusItems from './image/minusItems.png'

import leftArrows from './image/leftArrows.png'
import rightArrows from './image/rightArrows.png'

class CartItemList extends Component {
    state = {
        currentPicture: 0    
    }

    onRightSlide (length) {
        if(this.state.currentPicture === length - 1){
            this.setState({
                currentPicture: 0,
            })
        } else {
            this.setState({currentPicture: this.state.currentPicture + 1})
        }
    }

    onLeftSlide (length) {
        if(this.state.currentPicture === 0){
            this.setState({
                currentPicture: length - 1
            })
        } else {
            this.setState({
                currentPicture: this.state.currentPicture - 1
            })
        }
    }

    render () {
        const {name, neededCategoryWithCurr, productPrice, 
        productsInBag, productId, attributes, productCurPicture} = this.props
     
        const currentSymbol = neededCategoryWithCurr[0].prices[0].currency.symbol;
        // console.log(this.onRightSlide)
        const productCurPictureLength = productCurPicture.length

        const curProductCount = productsInBag[productsInBag.findIndex(elem => elem.id === productId)].count;
        
        const attributeItem = attributes.map((attribute) =>{
            return (
                <div key={attribute.id}>
                <p className="cart-attribute-name"> {attribute.name} </p>
                <div className="cart-attribute-filter">
                {attribute.items.map((item) => {
                    return (
                        
                        <div 
                        key = {item.id}
                        
                        style = {{backgroundColor: attribute.type === 'swatch' ? item.value : null}}
                                
                        className= "cart-button-style"
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
            <div id = 'cart-item-flex-list' className="cart-item-box-list">
                <hr className="make-line"/>
                    <div className="cart-items-name">
                    <p>{name}</p>
                    </div>
                    <div className="cart-items-price">
                    <p>{currentSymbol} {productPrice}</p>
                    </div>
                    <div className="cart-items-attribute">

                    {attributeItem}

                    </div>

                    <div className="cart-items-counter">
                    <a href='#!'><img src={plusItems} 
                        alt="plus" 
                        onClick={this.props.onAddProductToBag}
                        className='cart-items-plus'
                    /></a>
                    <p className="items-counter items-style">{curProductCount}</p>
                    <a href='#!'><img src={minusItems} 
                        alt="minus" 
                        onClick={this.props.onDeleteProductFromBag}
                        className='cart-items-minus'
                    /></a>
                    </div>
                    <div className="cart-items-photo">
                   
                        <a href='#!'><img src={productCurPicture[this.state.currentPicture]} 
                            alt="photoFromGallery" 
                            className='photoMake'
                        /></a>
                        <div className="cart-items-arrows">
                            <a href='#!'><img src={leftArrows} 
                                alt="leftArrows" 
                                className='leftArrows'
                                onClick={() => this.onLeftSlide(productCurPictureLength)}
                            /></a>
                            <a href='#!'><img src={rightArrows} 
                                alt="rightArrows" 
                                onClick={() => this.onRightSlide(productCurPictureLength)}
                                className='rightArrows'
                            /></a>
                        </div>
                    </div>
                <hr className="make-line-down"/>

            </div>
            
        )
    }
}

export default CartItemList