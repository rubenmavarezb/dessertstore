// "ShoppingBasket" constructor

class ShoppingBasket {
    constructor() {
        this.basket = []; //an empty array that will be use as my shopping "cart"
        
        let total = 0 //Variable for the this.calculateTotal() method

        /** Method that will initialize the class ShoppingBasket and created with the localStorage */
        this.populate = () => this.basket = (localStorage.getItem('basket')) ? JSON.parse(localStorage.getItem('basket')) : [];

        /** Method that will initialize the class Products. 
        *Params object dessert - a specific object created in the data.json */
        this.add = (dessert) => {
            this.basket.push(dessert);
            localStorage.setItem('basket', JSON.stringify(this.basket));
            this.buildBasket('.cart-container');
            this.cartLength('#cart-length');
            this.calculateTotal()
        }

        /** Method for personal use only */       
        this.get = () => this.basket;

        /** Method that build the HTML structure of a list of the items the user is going to buy and return it
        * in the button tag has an onclick event calling the deleteItem() function 
        */
        this.buildCartList = () => {
            let html = '';
            this.basket.forEach(dessert => {
                html += `
                    <div class="column is-3 card div-cart-list">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${dessert.img}" alt="">
                            </figure>
                        </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4"><span class="title-gradient">${dessert.name}</span></p>
                                <p class="subtitle is-4">${dessert.price}$</p>
                            </div>
                        </div>
                    <div class="buttons trash-btn_div">
                        <button class="trash-btn" onclick='deleteItem("${dessert.id}")'><i class="fas fa-trash"></i></button>
                    </div>
                    </div>
                </div>`;
            });
            return html
        }

        /** Method that will create the HTML structure of the shopping cart modal and render it. 
         * in the button tags you can find the callling of the function emptyTheCart and clickBuyButton
        *Params string divID - An element from the DOM 
        */
        this.buildBasket = (divID) => {
            let container = sE(divID);
            container.innerHTML = '';
            let html = `
                    <div class='column is-12 is-centered'>
                        <h2>Carrito de compras (${this.basket.length})</h2>
                    </div>
                    <div>
                        <ul class="items-in-cart columns is-multiline is-centered">
                            ${ this.buildCartList() }
                        </ul>
                        <div class="price-container"><span>Total:</span><span class="total"></span></div>
                        <div class="buttons">
                            <button id="empty-cart" onclick="emptyTheCart()" class="button is-primary" value="Clear cart">Clear cart</button> 
                            <button class="button is-link is-light" id='buy-cart-btn' onclick="clickBuyBtn(event)">Buy</button>  
                        </div>
                    </div>`
            container.innerHTML = html;
            this.calculateTotal()
        }

        /** Method that will create the HTML structure of the length of the shopping cart and render it. 
        *Params string divID - An element from the DOM */
        this.cartLength = (divID) => {
            let span = sE(divID);
            span.innerhtml = '';
            let html = `<span class='length-transition'>${this.basket.length}</span><i class="fas fa-shopping-cart"></i> Cart`
            span.innerHTML = html;
        }

        /** Method that will remove the product from the this.basket array and the localstorage and update it. 
        *Params  id - the specified object you want to delete */
        this.removeDessert = (id) => {
            this.basket = (localStorage.getItem('basket') === null) ? [] : JSON.parse(localStorage.getItem('basket'));
            let dessertIndex = this.basket.findIndex(x => x.id === id.id);
            this.basket.splice(dessertIndex, 1);
            localStorage.setItem('basket', JSON.stringify(this.basket));
            this.buildBasket('.cart-container');
            this.cartLength('#cart-length');
            this.calculateTotal()
        }

        /** Method that will remove all the data from the this.basket array and the localStorage */
        this.emptyCart = () => {
            this.basket = [];
            localStorage.removeItem('basket')
            this.buildBasket('.cart-container');
            this.cartLength('#cart-length');
            sE('#buy-cart-btn').disabled = true;
        }

        /** Method that will render the result of the this.calculateTotal method. 
        *Params  number t - the total of the prices of the elements in the array
        *Params string divID - An element from the DOM */
        this.renderPrice = (t, divID) => {
            let span = sE(divID);
            span.innerText = `${t}$`;
        }

        /** Method that will calculate the total price of the prices in the this.basket array */
        this.calculateTotal = () => {
            total = 0;
            this.basket.forEach(function(dessert){
                total +=  dessert.price;
            });
            this.renderPrice(total, '.total');
        }

    }
}

///////////////////////////////////////////////////////////////////////////////////////