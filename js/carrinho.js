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
    button.addEventListener('click', addCarClicado)
}

function addCarClicado(event) {
    var button = event.target
    var prodt = button.parentElement.parentElement
    var title = prodt.getElementsByClassName('card-title')[0].innerText
    var price = prodt.getElementsByClassName('preco')[0].innerText
    var imageSrc = prodt.getElementsByClassName('card-img-top')[0].src
    btnProduto(price)
    addCar(title,price,imageSrc)
    attCarTotal()
}
function addCar(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('tableItens')
    var carPdt = document.getElementsByClassName('tablebody')[0]

    var carPdtNome = carPdt.getElementsByClassName('titulo-car')
    for (var i = 0; i < carPdtNome.length; i++) {
        if (carPdtNome[i].innerText == title) {
            alert('Este produto já está no carrinho')
            return
        }
    }

var cartRowctd = `
                            <th scope="row"></th>
                            <td> <img src="${imageSrc}"width="99" height="99"> <span class="titulo-car">${title}</span></td>
                            <td class="itemPreco">${price}</td>
                            <td><input class="cart-quantidade-input" type="number" value="1">
                            <button class="btn btn-danger btn-retirar" type="button">Retirar</button></td>
                        `

        cartRow.innerHTML = cartRowctd
        carPdt.append(cartRow)

        cartRow.getElementsByClassName('btn-retirar')[0].addEventListener('click', retirarCartItem)
        cartRow.getElementsByClassName('cart-quantidade-input')[0].addEventListener('change', quantidadeMudou)
}
function retirarCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    attCarTotal()
}
function quantidadeMudou(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    attCarTotal()
}

function attCarTotal() {
    var carpdtContainer = document.getElementsByClassName('tablebody')[0]
    var cartRows = carpdtContainer.getElementsByClassName('tableItens')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var elementoPreco = cartRow.getElementsByClassName('itemPreco')[0]
        console.log()
        var elementoQtd = cartRow.getElementsByClassName('cart-quantidade-input')[0]
        var price = parseFloat(elementoPreco.innerText.replace('R$', ''))
        var quantidade = elementoQtd.value
        total = total + (price * quantidade)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('precoTotal')[0].innerText = '$' + total
}
document.getElementsByClassName('compra')[0].addEventListener('click', compraClicked)
function compraClicked() {
    alert('Obrigado pela preferencia :)')
    var carPdt = document.getElementsByClassName('tablebody')[0]
    while (carPdt.hasChildNodes()) {
        carPdt.removeChild(carPdt.firstChild)
    }
    attCarTotal()
}