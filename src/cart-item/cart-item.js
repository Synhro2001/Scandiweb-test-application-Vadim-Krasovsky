import { Component } from "react";

import CartItemList from "../cart-item-list/cart-item-list";

import './cart-item.css'

class CartItem extends Component {
    render () {
        const {bagItems, neededCategoryWithCurr, productsInBag,
        currentSymbol, productPicture} = this.props
        
        const productsTotalCosts = bagItems.map(item => {

            const product = productsInBag.filter(elem => elem.id === item.id);
            // console.log("product: ", product);
            const productCost = item.prices.filter(elem => elem.currency.symbol === currentSymbol)[0].amount;
            // console.log("productCost: ", productCost);
            const productTotalCost = productCost * product[0].count;

            return {
                id: product[0].id,
                totalPrice: parseFloat(productTotalCost).toFixed(2)
            };

        });

        const totalCost = parseFloat(productsTotalCosts.map(item => item.totalPrice).map(Number).reduce((accumulator, currentValue) => {

            return accumulator + currentValue;

        }, 0)).toFixed(2);

        // console.log(totalCost)

        const tax = parseFloat(totalCost * 0.21).toFixed(2);

        const elements = bagItems.map((item, i) => {
            const {id, ...itemProps} = item;
            return (
            
                <CartItemList  
                    index = {i}
                    key = {item.id}
                    productId={id}
                    {...itemProps} 
                    neededCategoryWithCurr = {neededCategoryWithCurr}
                    productPrice={productsTotalCosts[productsTotalCosts.findIndex(elem => elem.id === id)].totalPrice}
                    productCurPicture = {productPicture[productPicture.findIndex(elem => elem.id === id )].gallery}
                   
                    productsInBag = {productsInBag}

                    onAddProductToBag={() => this.props.onAddProductToBag(id)}
                    onDeleteProductFromBag={()=> this.props.onDeleteProductFromBag(id)}

                />
                
            )
        })

        return (
            <div className="cart-item-cover">
                <div className="cart-name"><p>Cart</p></div>
                <div className="cart-item-list" id = "cart-flx">
                    {elements}
                </div>
            <div className="cart-item-result-box">
                <ul >
                    <li className="tax-sum"><p>Tax 21%: {currentSymbol} {tax}</p></li>
                    <li className="quantity-sum"><p>Quantity: {this.props.sumProduct + ' items'}</p></li>
                    <li className="price-sum"><p>Total: {currentSymbol} {totalCost}</p></li>
                </ul>
                <button className="cart-item-order">Order</button>

            </div>
            </div>
        )
    }
}

export default CartItem;