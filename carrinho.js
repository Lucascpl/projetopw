var carrinho=0;
var quant=0;

function btnProduto(x){
    carrinho += parseFloat(x)
    var resultado = carrinho.toFixed(2);
    quant++;
    atualizarCarrinho();
}
function atualizarCarrinho(){
    var pcarrinho = document.getElementsByClassName("qtdCar")
    for (let i = 0; i < pcarrinho.length; i++) {pcarrinho[i].innerHTML = quant}
   
    // pcarrinho[1].innerHTML = quant
    // pcarrinho[1].innerHTML = quant
}

var btnsCarrinho = document.getElementsByClassName('botao')
for (var i = 0; i < btnsCarrinho.length; i++) {
    var button = btnsCarrinho[i]
    button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('card-title')[0].innerText
    var price = shopItem.getElementsByClassName('preco')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
    btnProduto(price)
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('tableItens')
    var cartItems = document.getElementsByClassName('tablebody')[0]

    var cartItemNames = cartItems.getElementsByClassName('titulo-car')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

var cartRowContents = `
                            <th scope="row"></th>
                            <td> <img src="${imageSrc}"width="99" height="99"> <span class="titulo-car">${title}</span></td>
                            <td class="itemPreco">${price}</td>
                            <td><input class="cart-quantidade-input" type="number" value="1">
                            <button class="btn btn-retirar" type="button">Retirar</button></td>
                        `

        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)

        cartRow.getElementsByClassName('btn-retirar')[0].addEventListener('click', retirarCartItem)
        cartRow.getElementsByClassName('cart-quantidade-input')[0].addEventListener('change', quantidadeMudou)
}
function retirarCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantidadeMudou(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('tablebody')[0]
    var cartRows = cartItemContainer.getElementsByClassName('tableItens')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('itemPreco')[0]
        console.log()
        var quantityElement = cartRow.getElementsByClassName('cart-quantidade-input')[0]
        var price = parseFloat(priceElement.innerText.replace('R$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
document.getElementsByClassName('compra')[0].addEventListener('click', compraClicked)
function compraClicked() {
    alert('Obrigado pela preferencia :)')
    var cartItems = document.getElementsByClassName('tablebody')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}