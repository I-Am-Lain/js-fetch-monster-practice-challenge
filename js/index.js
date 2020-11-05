const URL = 'http://localhost:3000/monsters?_limit=50&_page=' 
const container = document.querySelector("#monster-container")
const formDiv = document.querySelector("#create-monster")
const back = document.querySelector("#back")
const forward = document.querySelector("#forward")
let counter = 1


function fetchMonsters(){
    fetch(`${URL}${counter}`)
    .then(resp => resp.json())
    .then(json => renderMonsters(json))
}

function renderMonsters(json){
    json.forEach(monster => {
        renderMon(monster)
    })
}

function renderMon(monster){
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const h4 = document.createElement("h4")
    const p = document.createElement("p")

    h2.innerText = monster.name
    h4.innerText = monster.age
    p.innerText = `Bio: ${monster.description}`

    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(p)
    

    container.appendChild(div)
}

function renderSearch(){
    const form = document.createElement("form")
    form.id = ("create-monster-form")

    const field1 = document.createElement("input")
    field1.type = "text"
    field1.id = "name"
    field1.placeholder = '...name'

    const field2 = document.createElement("input")
    field2.type = "text"
    field2.id = "age"
    field2.placeholder = '...age'

    const field3 = document.createElement("input")
    field3.type = "text"
    field3.id = "description"
    field3.placeholder = '...description'

    const button = document.createElement("button")
    button.innerText = 'Create'


    form.innerHTML = field1.outerHTML + field2.outerHTML + field3.outerHTML + button.outerHTML
    formDiv.appendChild(form)
}

function formListener(){
    formDiv.addEventListener("submit", event => {
        event.preventDefault()
        createMonster(event)
    })
}

function createMonster(event){
    const monObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: event.target[0].value,
          age: event.target[1].value,
          description: event.target[2].value
        })
    }

    fetch(URL, monObj)
    .then(resp => resp.json())
    .then(json => console.log(json.name))  // just log response, we're not refreshing or showing the returned monster
}

function pageListener(){
    forward.addEventListener("click", event => {
        container.innerHTML = ''
        counter += 1
        fetchMonsters(counter)
    })

    back.addEventListener("click", event => {
        container.innerHTML = ''
        if (counter > 1){     // only if they are on page 2, will we decrement the "global" page count
            counter -= 1
        }
        fetchMonsters()         // take user to the page of the current "global" page count
    })
}
function main(){
    fetchMonsters()
    renderSearch()
    formListener()
    pageListener()
}


main()