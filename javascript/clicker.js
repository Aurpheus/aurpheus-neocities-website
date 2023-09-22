
const button = document.getElementsByClassName("test");

let clicks = 0
const pictures = [
    "pics/clickerpics/whitegoowolf.gif"
]

const upgrades = [
{"name":"autoclick",
    "unlocked":false,
    "selectable":true,
    "price":2000},
{"name":"speed up 1",
    "unlocked":false,
    "selectable":false,
    "price":200000},
{"name":"speed up 2",
    "unlocked":false,
    "selectable":false,
    "price":400000},
{"name":"speed up 3",
    "unlocked":false,
    "selectable":false,
    "price":800000}
]


let i = 0
let cards= []
let current_m = 1
let current_a = 0
let current_timer= 0
let next_pallier = 1
let goono = 0
let money = 0;
let initialized = false;
let seconds_til_autoclick = 0
let base_autoclick = 2000;
let pw = 0;

if (!initialized){
    updateUpgrades()
    initialized = true
}

function updateUpgrades(){
    const elem = document.getElementById("upgrade_container");
    elem.innerHTML = ""

    console.log("flushed cards")
    let i = 0
    for (let upgrade of upgrades){
        let style = ""
        if (!upgrade["selectable"]){
            style = `style="color:grey"`
        }

        if (upgrade["unlocked"]===false){
            let html = `<div id="card" onclick="buyUpgrade(`+i+`)">
            <span id="effect" `+style+` >`+upgrade["name"]+`</span>
            <span id="value" `+style+`>`+upgrade["price"]+`$</span>
            </div>`
            elem.innerHTML += html

        }
        i++
    }
}


function buyUpgrade(upgrade){
    if (money > upgrades[upgrade]["price"] && upgrades[upgrade]["selectable"]){
        upgrades[upgrade]["unlocked"] = true
        money -= upgrades[upgrade]["price"]
        upgrades[upgrade+1]["selectable"] = true
        upgrades[upgrade]["selectable"] = false
        const m = document.getElementById("money");
        console.log(m)
        m.innerHTML = money.toString();
        updateUpgrades()
        pw++;
    }
}




function update_click(){
    clicks += (current_a+1)*current_m;
    money += (current_a+1)*current_m
    const elem = document.getElementById("sum");
    console.log(elem)
    elem.innerHTML = clicks.toString() + " / " + 2000 * Math.pow(2,next_pallier);
    const m = document.getElementById("money");
    console.log(m)
    m.innerHTML = money.toString();
    if(clicks > 2000 * Math.pow(2,next_pallier)){
        next_pallier += 1
        if (pictures.length < i-1){
            i++
        }
        const elem = document.getElementById("clicker_pic");
        elem.src = pictures[i]
    }
}

document.getElementById("clicker_pic").onclick = userClicked

function userClicked(event) {
    update_click()
    let image = document.createElement("img")
    image.src = "pics/splash_3x.gif"
    image.id ="gooBall" + goono
    image.onclick = update_click

    let gooBalls = document.getElementById("gooBalls").appendChild(image)
    let x = event.clientX;
    let y = event.clientY;
    let snowball = document.getElementById("gooBall"+goono);
    snowball.style.display = '';
    snowball.style.position = 'absolute';
    snowball.style.left = x - 36 + 'px';
    snowball.style.top = y - 36 + 'px';
    goono++

    setTimeout(()=>{
        snowball.remove()
    },720)
}




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function get_card(){
    if (cards.length >= 10){
        return
    }
    let v = getRandomInt(2)
    let effect = null
    if (v === 0) {
        effect = "x"
    }else{
        effect = "+"
    }

    let card = {
        "effect" : effect,
        "value" : getRandomInt(21)+1
    }
    cards = cards.concat([card])
    add_html_cards()
    console.log(cards)
}

function add_html_cards(){
    const elem = document.getElementById("container");
    elem.innerHTML = ""
    console.log("flushed cards")
    let i = 0
    for (let card of cards){
        let html = `<div id="card" onclick="use_card(`+i+`)">
            <span id="effect">`+card["effect"]+`</span>
            <span id="value">`+card["value"]+`</span>
        </div>`
        elem.innerHTML += html
        i++
    }
}

function use_card(index){
    current_timer = 0
    const elem = document.getElementById("timer");
    elem.innerText = 10 - current_timer/1000

    let card = cards[index]
    if (card["effect"] === "x"){
        current_m *= card["value"]
    }else{
        current_a += card["value"]
    }
    if (index > -1) { // only splice array when item is found
        cards.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(cards)
    add_html_cards()
    update_interface()
}

function flush_effects(){
    current_m = 1
    current_a = 0
    update_interface()
}

function update_interface(){
    let elem = document.getElementById("x");
    elem.innerHTML = current_m
    elem = document.getElementById("+")
    elem.innerHTML = current_a

}

function update_time(){
    current_timer += 100
    if (current_timer >= 5000){
        current_timer = 0
        flush_effects()
    }
    const elem = document.getElementById("timer");
    elem.innerText = parseFloat(5 - current_timer/1000).toFixed(2)
}

function autoclick(){
    seconds_til_autoclick += 100
    if (upgrades[0]["unlocked"]){
        if (base_autoclick/getPw() <= seconds_til_autoclick){
            update_click()
            seconds_til_autoclick = 0
        }
    }

}

function getPw(){
    return pw
}

//check out how to set up intervan
setInterval(autoclick, 100);
setInterval(get_card, 10000);
setInterval(update_time, 100);