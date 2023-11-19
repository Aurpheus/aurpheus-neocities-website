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
            consoleOutput.innerText += "\n\nError ! \n\nFile manager offline, wait for future updates..."
        });
    }else {
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