import { Component } from "react";

import AppCard from "../app-card/app-card";

import './add-card-list.css';

class AddCardList  extends Component {


    render(){
        const {neededCategoryWithCurr, onAddProductToBag,neededCategory,
        filter, onPDPswitcher} = this.props;
        const neededAmount = neededCategoryWithCurr.map(item => {
            return{
                amount: item.prices[0].amount
            }
        })
        const elements = neededCategory[0].products.map((item, i) => {
            const {id, ...itemProps} = item;
            return(
                    <AppCard
                        index = {i}
                        key = {item.id}
                        {...itemProps}
                        neededCategoryWithCurr = {neededCategoryWithCurr}
                        neededAmount = {neededAmount}
                        onAddProductToBag = {() => onAddProductToBag(id)}
                        onPDPswitcher = {() => onPDPswitcher(id)}
                       
                    />       

            )
        })

        return (
            <div>
                 <div className='category-name'>
                    <p>{filter}</p>
                </div>
                <main className="main">  
                    {elements}
                </main>
            </div>
           
        )

    }
    
}

export default AddCardList;



