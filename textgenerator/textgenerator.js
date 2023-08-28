console.log("jebou");

async function data() {
    const response = await fetch("../data/generator.json");
    return response.json();
}

                            //replace,with,from
const changeReferences =    (r,w,f,elType,elClass) => {
    //console.log(w);
    const n = "<" + elType + " class='"+elClass+"'>" +w+"</"+elType+">"
    return f.replaceAll(r,n)
}

const shuffleArray = (array) => { //thanks to: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

let stage = "must_have"
const generate = (command) => {
    data().then((data)=>{
        //console.log(stage);

        const grades = data[0];
        const other = data[1];
        //console.log(grades);
        for (const key in grades) {
            //console.log(key);
            const content = grades[key]

            let contentMustHave = content[stage]
            
            document.getElementById("must_have2").classList.remove("selected");
            document.getElementById("must_have3").classList.remove("selected");

            if(command == "must_have2"){
                stage = command
                contentMustHave = content["must_have2"]
            }else if(command == "must_have3"){
                stage = command
                contentMustHave = content["must_have3"]
            }

            document.getElementById(stage).classList.add("selected");

            document.getElementById(key).innerHTML = ""

            //console.log(command);
            if(command == "suffle"){
                contentMustHave = shuffleArray(contentMustHave);
            }

            for(i=0; i<contentMustHave.length; i++) {
                let newContent = changeReferences("#", document.getElementById("topic").value,contentMustHave[i], "span", "added-topic")
                if(command == "keywords"){
                    let highlighted = newContent;

                    other["keywords"].forEach(el => {
                        //console.log(el);
                        highlighted = changeReferences(el, el, highlighted, "span", "highlighted-keyword")
                    });
                    
                    newContent = highlighted;
                }
                



                document.getElementById(key).innerHTML += newContent + "<br>";
            }        
        }
    })
}
generate(stage)

const copyToClipboard = (e) => {
    var copyText = document.getElementById(e.target.id.split("_")[0]);
    //console.log(copyText);

    let text =  copyText.innerText;
    let safeCopy = text.replaceAll(/<\/?[^>]+(>|$)/gi, "");

    // Copy the text inside the text field
    navigator.clipboard.writeText(safeCopy);
}

for (let i = 1; i <= 3; i++) {
    document.getElementById("grade"+i+"_action").addEventListener("click",copyToClipboard)
}

const settings = (e,setting) => {
    /*
    console.log(e.target.dataset.spellcheck, setting);
    let val = (e.target.dataset.spellcheck == "true") ? "false" : "true";
    e.target.dataset.spellcheck = val
    console.log(val);

    if(setting=="spellcheck"){
        for (let i = 1; i <= 3; i++) {
            
            if(e.target.dataset.spellcheck=="true")
                document.getElementById("grade"+i).setAttribute("data-ms-editor","true");
            else
            document.getElementById("grade"+i).removeAttribute("data-ms-editor");
        }
    }
    */
} 


//document.getElementById("update").addEventListener("click",generate);
//document.getElementById("suffle").addEventListener("click",() => generate("suffle"))
document.getElementById("keywords").addEventListener("click",() => generate("keywords"))
//document.getElementById("stage").addEventListener("click",() => generate("stage"))
document.getElementById("must_have2").addEventListener("click",() => generate("must_have2"))
document.getElementById("must_have3").addEventListener("click",() => generate("must_have3"))

document.getElementById("topic").addEventListener("keyup",()=>generate(stage))

//document.getElementById("spellcheck").addEventListener("click",(e)=>settings(e,"spellcheck"))



