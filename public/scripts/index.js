// quando uso All estou devolvendo uma lista de itens/elementos funciona no elemento
const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
// quando clicar no A
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})
// quando clicar no a executa uma função anonima
close.addEventListener("click", () => {
    modal.classList.add("hide")
})