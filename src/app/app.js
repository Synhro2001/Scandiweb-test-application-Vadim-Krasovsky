import { Component } from 'react';

import AppHeader from '../app-header/app-header';
import AddCardList from '../add-card-list/add-card-list';
import MoneySwitcherList from '../money-switcher-list/money-switcher-list';
import AddBagList from '../add-bag-list/add-bag-list';
import CartItem from '../cart-item/cart-item';
import ProductDescriptionPage from '../product-description-page/product-description-page';

import './app.css';


class App extends Component{
    
    state = {
        inf: require("../data.json"),
        filter: 'all',
        switcher: false,
        switcherBag: false,
        switcherViewBag: false,
        switcherPDP: false,
        symbolFilter: '$',

        productsInBagCount: 0, // podschitivaet skok productov dobavleno 
        productsInBag: [],
        
        pdpItemID: '',

        totalCost: 0,

      
    }
    
    onAddProductToBag = (id) => {

        this.setState(({productsInBag, productsInBagCount}) => {

            const exist = productsInBag.findIndex(item => item.id === id);
            
            if(exist >= 0) {
                
                const newData = productsInBag.map(item => {
    
                    if(item.id === id) {
    
                        return {
    
                            id: id,
                            count: item.count + 1,

                        }
                        
                    }
                  
                    return item;
    
                });
                
                return ({

                    productsInBag: newData,
                    productsInBagCount: productsInBagCount + 1
                   
                })
                
            }
            
            return ({

                productsInBag: [...productsInBag, {id: id, count: 1}],
                productsInBagCount: productsInBagCount + 1

            })
         
        });
       
    }  

    onPDPswitcher = (id) => {
        this.setState(({pdpItemID, switcherPDP}) => {
            if(pdpItemID === id){
                return {
                    id: id,
                   
                }
            }
            return {
                pdpItemID: id,
                switcherPDP: !switcherPDP
            }
            
            
           
           
            
        })
    }
    
    

    onDeleteProductFromBag = (id) => {

        this.setState(({productsInBag, productsInBagCount}) => {

            const newProductsInBag = productsInBag.map(item => {

                if(item.id === id) {

                    return {

                        ...item,
                        count: item.count - 1

                    }

                }

                return item

            })

            return ({

                productsInBag: newProductsInBag.filter(item => item.count > 0),
                productsInBagCount: productsInBagCount - 1

            });

        });

    }


    //componentDidUpdate

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onCurrencySelect = (symbolFilter) => {
        this.setState({symbolFilter});
    }

    onLogoSwitcher = () => {
        this.setState((state) => {
            return {
                switcher: !state.switcher
            }
        })
   
    }

    onBagSwitcher = () => {
        this.setState((state) => {
            return {
                switcherBag: !state.switcherBag
            }
        })
    }

    onCardSwitcher = () => {
        this.setState((state) => {
            return {
                switcherViewBag: !state.switcherViewBag
            }
        })
    }
    
    

    render(){
        
        const {inf: {data}, filter, switcher, symbolFilter,
        switcherBag, productsInBag, productsInBagCount, switcherViewBag,
        switcherPDP, pdpItemID} = this.state;

        //console.log(pdpItemID)
        // console.log(this.state.pdpItems)
        const sumProduct = productsInBag.reduce((accumulator, currentValue) => 
            accumulator + currentValue.count, 0
        );
        

        const neededCategory = data.categories.filter(item => item.name === filter);
   
        const bagItemsMap = data.categories[0].products.map(item => {
            
            const foundIndex = productsInBag.findIndex(elem => elem.id === item.id);

            if(foundIndex >= 0){

                return item;

            }

            return null;

        });

        const pdpItemsMap = data.categories[0].products.map(item => {
            if(pdpItemID === item.id ) {
                return item;
            }
            return null
        })


        const bagItems = bagItemsMap.filter(item => item !== null);
        const pdpItems = pdpItemsMap.filter(item => item !== null);

        // console.log(pdpItems);
      
        const neededCategoryWithCurr = neededCategory[0].products.map(item => {

            return {
                ...item, prices: item.prices.filter(elem => elem.currency.symbol === symbolFilter)
            }

        })

        // console.log(neededCategoryWithCurr)

        const productPicture = bagItems.map(item => {
            return {
                id: item.id,
                gallery: item.gallery
            }
        })

        // console.log(productPicture)


        const categoryNames = data.categories.map(item => {
            return {
                name: item.name
            }
        })

        const currencyNames = data.categories[0].products[0].prices.map(item => {
            return {
                label: item.currency.label,
                symbol: item.currency.symbol
            }
        })
      
        const curSwitcher = 
                switcher ?
                    <MoneySwitcherList  
                    currencyNames = {currencyNames}
                    onCurrencySelect = {this.onCurrencySelect}
                    
                    /> :
                    null; 
    
        const bagSwitcher = 
                switcherBag ? 
                    <AddBagList
                    sumProduct = {productsInBagCount}
                    productsInBag = {productsInBag}
                    bagItems = {bagItems}
                    neededCategoryWithCurr = {neededCategoryWithCurr}
                    productsInBagCount={productsInBagCount}
                    currentSymbol={symbolFilter}

                    onAddProductToBag={this.onAddProductToBag}
                    onDeleteProductFromBag={this.onDeleteProductFromBag}
                    onCardSwitcher = {this.onCardSwitcher}
                    />
                    : null;

        const viewBagSwitcher = 
            switcherViewBag ? 
                <CartItem
                bagItems = {bagItems}
                neededCategoryWithCurr = {neededCategoryWithCurr}
                productsInBag = {productsInBag}
                sumProduct = {productsInBagCount}
                currentSymbol={symbolFilter}
                productPicture = {productPicture}

                onAddProductToBag={this.onAddProductToBag}
                onDeleteProductFromBag={this.onDeleteProductFromBag}

                />
                : null;

        const productDescriptionSwitcher = 
            switcherPDP ? 
                <ProductDescriptionPage
                pdpItems = {pdpItems}
                currentSymbol={symbolFilter}
                neededCurr = {neededCategoryWithCurr}

                />
                : <AddCardList
                neededCategory = {neededCategory}
                neededCategoryWithCurr = {neededCategoryWithCurr}
                filter = {filter}

                onAddProductToBag = {this.onAddProductToBag}
                onPDPswitcher = {this.onPDPswitcher}
                /> 
                

            

        return(
            
            <div className="app">
                <AppHeader
                    switcher = {switcher}
                    onFilterSelect={this.onFilterSelect}
                    categoryNames={categoryNames}
                    onLogoSwitcher={this.onLogoSwitcher}
                    onBagSwitcher={this.onBagSwitcher}
                    sumProduct = {sumProduct}
                   
                    
                />
                {viewBagSwitcher}
                {curSwitcher}
                {bagSwitcher}
                <div className='bgShadow'>

                {productDescriptionSwitcher}

                </div>
            </div>
        )
    }
}

export default App;