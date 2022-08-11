import { Component } from "react";

import CartOverlay from "../cart-overlay/cart-overlay";

import './cart-page.css'

class CartPage extends Component {
    render() {
        const {bagItems, neededCategoryWithCurr, productsInBag, currentSymbol, onCardSwitcher} = this.props
        

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
        // console.log(productsTotalCosts);

        const totalCost = parseFloat(productsTotalCosts.map(item => item.totalPrice).map(Number).reduce((accumulator, currentValue) => {

            return accumulator + currentValue;

        }, 0)).toFixed(2);
        // console.log("totalCost: ", totalCost);


      
        // const totalPrice = bagItems.reduce((accumulator, currentValue) => {

        //     return parseFloat(accumulator + currentValue.prices.find(item => 
        //         item.currency.symbol ===  currentSymbol).amount
        //         * productsInBag[productsInBag.findIndex(elem => elem.id === currentValue.id)].count).toFixed(2);

        // }, 0);
       
        const elements = bagItems.map((item, i) => {
            const {id, ...itemProps} = item;
            return (
               
                <CartOverlay  
                    index = {i}
                    key = {item.id}
                    productId={id}
                    {...itemProps}  
                    neededCategoryWithCurr = {neededCategoryWithCurr}
                    productPrice={productsTotalCosts[productsTotalCosts.findIndex(elem => elem.id === id)].totalPrice}
                    productsInBag = {productsInBag}
                    onAddProductToBag={() => this.props.onAddProductToBag(id)}
                    onDeleteProductFromBag={()=> this.props.onDeleteProductFromBag(id)}
                />
                
            )
        })
        
        
        
        return (
            <div className="add-bag-list">
                <div  className="add-bag">
                    <p className="bag-head">My bag, {this.props.sumProduct + ' items'}  </p> 
                    <div className="bag-list" id = "flx"> {elements} </div>
                  
                   
                </div>
                <div className="total-price-box">
                    <div className="total">
                        <p> Total: </p>
                    </div>
                    <div className="price">
                    <p>{currentSymbol} {totalCost} </p>
                    </div>
                 
                </div>
                <div className="view-bag-check-out">
                        <button className="view-bag" onClick={onCardSwitcher}><p>View bag</p></button>
                        <button className="check-out"><p>Check out</p></button>
                </div>
                    
            </div>
        )
    }
}

export default CartPage