    // Dando função aos botões.
var btnsCarrinho = document.getElementsByClassName('botao')
for (var i = 0; i < btnsCarrinho.length; i++) {
    var button = btnsCarrinho[i]
    button.addEventListener('click', addCarClicado)
}
// Pegando detalhes do produto e rodando algumas funções que estão relacionadas.
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
//Adicionando os produtos ao carrinho
function addCar(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('tableItens')
    var carPdt = document.getElementsByClassName('tablebody')[0]
    var carPdtNome = carPdt.getElementsByClassName('titulo-car')
    for (var i = 0; i < carPdtNome.length; i++) {
        // Mandando um alerta caso o produto escolhido esteja no carrinho.
        if (carPdtNome[i].innerText == title) { 
            alert('Este produto já está no carrinho')
            return
        }
    }
                                    // Colocando os produtos a serem exibidos na tela, e mandando pro html.
var cartRowctd = `                
                            <th scope="row"></th>
                            <td> <img src="${imageSrc}"width="99" height="99"> <span class="titulo-car">${title}</span></td>
                            <td class="itemPreco">${price}</td>
                            <td><input class="cart-quantidade-input" type="number" value="1">
                            <button class="btn btn-danger btn-retirar" type="button">Retirar</button></td>
                        `

        //Pegando os botões de retirar e mudar a quantidade de produtods.
        cartRow.innerHTML = cartRowctd
        carPdt.append(cartRow)
        cartRow.getElementsByClassName('btn-retirar')[0].addEventListener('click', retirarCartItem)
        cartRow.getElementsByClassName('cart-quantidade-input')[0].addEventListener('change', quantidadeMudou)
}
// Dando a funcionalidade de retirar produtos
function retirarCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    attCarTotal()
}
//Adicionar mais quantidades do mesmo produto.
function quantidadeMudou(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    attCarTotal()
}
// Pegando e calculando o valor do produto que esta dentro do carrinho.
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
    document.getElementsByClassName('precoTotal')[0].innerText = '$' + total // Pega a string $ e coloca na tela
}
// Faz com que depois que o usuário faça a compra apareça uma string. Retira todos os produtos após a compra.
document.getElementsByClassName('compra')[0].addEventListener('click', compraClicked)
function compraClicked() {
    alert('Obrigado pela preferencia :)')
    var carPdt = document.getElementsByClassName('tablebody')[0]
    while (carPdt.hasChildNodes()) {
        carPdt.removeChild(carPdt.firstChild)
    }
    attCarTotal()
}