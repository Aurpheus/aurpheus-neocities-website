let loginOk = false
let passwordOK = false

const prompt = document.getElementById("prompt")
prompt.addEventListener("keydown",(e) =>{
    if (e.key === "Enter"){
        execute(prompt.value)
    }
} )

const consoleOutput = document.getElementById("console_output")

function execute(string){
    if (string === "clear"){
        consoleOutput.innerText = ""
    }
    else if (string === "0012446" && !loginOk){
        consoleOutput.innerText += "\n\n"+prompt.value +"\n\nLogin Okay !  \nInput your password !"
        prompt.value = ""
        loginOk = true
    }else if (loginOk && ! passwordOK && string === "m4nt1s2"){
        consoleOutput.innerText += "\n\n"+prompt.value +"\n\nPassword Okay !  \nLoading File manager..."
        prompt.value = ""
        passwordOK = true
        sleep(1000).then(() => {
            consoleOutput.innerText += " \n\nFile manager online ! \n\n Type the name of the file you want to view.\n" +
                "root --- Aurpheus.txt\n"+
                "|---------- %%$$$$%%2023.txt"

        });
    }else if (loginOk && passwordOK){
        if(string === "Aurpheus.txt"){
            consoleOutput.innerText += "\n\n"+prompt.value +"\n\nSecret Information:\n" +
                "This information is for your eyes and your eyes only.\n\n" +
                "Aurpheus was a man in his 20s when entering the laboratory, he was the test subject of multiple injections. \n" +
                "The result of it is mutation of his body to look more mantis like, he seems to either not have noticed it. \n" +
                "He seemed to have blended good enough after his mutation.\n\n" +
                "possible hazards:\n" +
                "His shedding have DNA altering properties, however he seems to not care much about it when he decides to get rid of it. \n" +
                "Victims: unknown\n\n" +
                "Visits the lab every now and then.\n\n"+
                "root --- Aurpheus.txt\n"+
                "|---------- %%$$$$%%2023.txt"
            prompt.value = ""
        }else if(string === "%%$$$$%%2023.txt"){
            consoleOutput.innerText += "\n\n"+prompt.value +"\n\nYou need an administrator access to view that file...\n\n"+
            "root --- Aurpheus.txt\n"+
            "|---------- %%$$$$%%2023.txt"
            prompt.value = ""
        }else if(string === "sudo %%$$$$%%2023.txt"){
            prompt.value = ""
            consoleOutput.innerText += "\n\n"+prompt.value +"\n\nWe made a mistake... The beast is out,and hides itself waiting to turn us into them...\n"
            sleep(1000).then(() => {consoleOutput.innerText +=   "Whoever is reading this... Flee before it's too late...\n\n"+
            "root --- Aurpheus.txt\n"+
            "|---------- %%$$$$%%2023.txt"})
        }
    }
    else {
        if (!loginOk){
            consoleOutput.innerText += "\n\n"+prompt.value +"\n\nLogin Error !\nInput your login !"
            prompt.value = ""
        }
        if(loginOk && !passwordOK){
            consoleOutput.innerText += "\n\n"+prompt.value +"\n\nPassword Error !\nInput your password !"
            prompt.value = ""
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let horror = false
let death = false

if (!horror){
    setTimeout(function (){
        horror = true
        document.body.classList.add("horror")
        consoleOutput.innerHTML += "<h3 style='color: red'> RUN HUMAN. </h3>"
        setTimeout(function (){
            document.body.classList.remove("horror")
            document.body.classList.add("death")
            consoleOutput.innerHTML += "<h3 style='color: red'> TOO LATE FOR YOU HUMAN.</h3>"
            setTimeout(function (){
                window.location.replace("../not_found.html");
            },2000)
        },60000)
    },300000)
}
