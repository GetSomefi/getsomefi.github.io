console.log("jebou");

async function data() {
    const response = await fetch("../data/generator.json");
    return response.json();
}

                            //replace,with,from
const changeReferences =    (r,w,f) => {
    const n = "<span class='added-topic'>" +w+"</span>"
    return f.replace(r,n)
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

const generate = (suffle) => {
    data().then((data)=>{
        
        const grades = data[0];
        console.log(grades);
        for (const key in grades) {
            console.log(key);
            const content = grades[key]
            let contentMustHave = content["must_have"]
            document.getElementById(key).innerHTML = ""

            if(suffle){
                contentMustHave = shuffleArray(contentMustHave);
            }

            for(i=0; i<contentMustHave.length; i++) {
                const newContent = changeReferences("#", document.getElementById("topic").value,contentMustHave[i])
                document.getElementById(key).innerHTML += newContent + "<br>";
            }        
        }
    })
}
generate()

document.getElementById("update").addEventListener("click",generate)
document.getElementById("suffle").addEventListener("click",() => generate(true));
document.getElementById("topic").addEventListener("keyup",generate)

const copyToClipboard = (e) => {
    var copyText = document.getElementById(e.target.id.split("_")[0]);
    console.log(copyText);

    let text =  copyText.innerText;
    let safeCopy = text.replaceAll(/<\/?[^>]+(>|$)/gi, "");

    // Copy the text inside the text field
    navigator.clipboard.writeText(safeCopy);
}

for (let i = 1; i <= 3; i++) {
    document.getElementById("grade"+i+"_action").addEventListener("click",copyToClipboard)
}

