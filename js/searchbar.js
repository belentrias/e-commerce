const productsList = document.getElementById('cat-list-container');
//const search = document.getElementById('search');
let hpProducts =[];
console.log(search);

search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredProducts = hpProducts.filter( products =>{
        return( 
            products.name.toLowerCase().includes(searchString) || products.description.toLowerCase().includes(searchString)
    );
    });
    displayProducts(filteredProducts);
});

const loadProducts = async () => {
    try{
        const res = await fetch('https://japdevdep.github.io/ecommerce-api/product/all.json');
        hpProducts = await res.json();
        displayProducts(hpProducts);
        console.log(hpProducts);
    }catch (err){
        console.error(err);
    }
};

const displayProducts = (product) =>{
    const htmlContentToAppend = product
    .map((products)=>{
return `
<a href="product-info.html" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ products.name +`</h4>
                <small> `+ products.soldCount +`</small>
            </div>
            <p class="mb-1">` + products.description + `</p>
            <small class="text-muted"><strong>` + products.cost + `</strong></small>
        </div> 
    </div>
</a>
`;
    })
.join('');
productsList.innerHTML = htmlContentToAppend;
};

loadProducts();
