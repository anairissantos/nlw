function populateUFS(){
    const ufSelect = document.querySelector("select[name=uf")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then (states => {

        for ( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`
        }
    })
}

populateUFS()


function getCities(event) {
    
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value
    //pegar qualquer numero selecionado
    const indexOfSelecetdState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelecetdState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML="<option value> Selecione a cidade</option>"

    citySelect.disabled = true

    fetch (url)
    .then( res => res.json() )
    .then (cities => {
        
        for ( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`
        }
        citySelect.disabled = false
    })
    
}

document
.querySelector("select[name=uf]")
//passando getcities por referencia
.addEventListener("change", getCities)

//itens de coleta
// pegar todos os li's
//buscar todos que estiverem dentro do items-grid li
const itemsToCollet = document.querySelectorAll(".items-grid li")
//para cada um deles vc vai fazer uma coisa, add o ouvidor de eventos (addEventListener)
for (const item of itemsToCollet){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

// quais são os items selecionados estão vazios
let selectedItems = []

function handleSelectedItem(event) {
    //const itemId = event.target.dataset.id
    const itemLi = event.target
     //add or remove uma classe com java script na lista de classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    //verificar se existe itens selecionados
    // se sim pegar os itens selecionados - função vai procurar por um index
    // função anonima que vai retornar um verdadeiro ou falso
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })
    
    // se ja estiver selecionado 
    if( alreadySelected >= 0 ){
        //tirar da seleção - filtered um novo array 
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false 
            return itemIsDifferent
        })
         selectedItems = filteredItems   
    }else {
        // se não estiver selecionado addicinar a seleção
        selectedItems.push(itemId)
    }
    //atualizar o campo escondido com os dados(itens) selecionados
    collectedItems.value = selectedItems
}
