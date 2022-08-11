import { Component } from "react";

import './product-description-page.css'

class ProductDescriptionPage extends Component {
    render() {
        const {pdpItems, currentSymbol} = this.props;
        const pdpAttributes = pdpItems[0].attributes;
        const pdpGallery = pdpItems[0].gallery
        // console.log(pdpItems[0].attributes)

        const pdpGalleryItem = pdpGallery.map((picture) => {
            return (
                <div className="several-picture-box"><img src={picture} alt="pictures" className="picture-size"></img></div>
            )
        })
   
        const pdpAttributesItem = pdpAttributes.map((attribute) => {
            return (
                <div key={attribute.id}>
                <p className="pdp-attribute-name"> {attribute.name} </p>
                <div className="pdp-attribute-filter">
                {attribute.items.map((item) => {
                    return (
                        
                        <div 
                        key = {item.id}
                        
                        style = {{backgroundColor: attribute.type === 'swatch' ? item.value : null}}
                                
                        className= "pdp-button-style"
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
            <div className="product-description-page">
                {pdpGalleryItem}
                <div className="product-description-box">
             
                    <div className="product-picture">
                        <img src={pdpItems[0].gallery[0]} alt="gallery" className='picture' />
                    </div>
                    <div className="pdp-items-box">
                        <div className="pdp-items-name">
                            <p>{pdpItems[0].name}</p>
                        </div>
                        <div className="pdp-items-attribute">
                            {pdpAttributesItem}
                        </div>
                        <div className="pdp-prices">
                            <p className="prices">Prices</p>
                            <div className="pdp-item-price">
                                <p>{currentSymbol}{pdpItems[0].prices.find((item) => 
                                item.currency.symbol === currentSymbol).amount}</p>
                            </div>
                        </div>
                        <div className="pdp-add-to-card">
                            <button className="add-to-card-btn"><p>Add to card</p></button>

                        </div>
                        <div className="product-description"
                        dangerouslySetInnerHTML = {{__html: pdpItems[0].description}}>
                            
                        </div>   

                    </div>

                </div>
            </div>
        )
    }
}

export default ProductDescriptionPage;
