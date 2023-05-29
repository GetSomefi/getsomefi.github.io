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

const generate = () => {
    data().then((data)=>{
        
        const grades = data[0];
        console.log(grades);
        for (const key in grades) {
            console.log(key);
            const content = grades[key]
            const contentMustHave = content["must_have"]
            document.getElementById(key).innerHTML = ""

            for(i=0; i<contentMustHave.length; i++) {
                const newContent = changeReferences("#", document.getElementById("topic").value,contentMustHave[i])
                document.getElementById(key).innerHTML += newContent + "<br>";
            }        
        }
    })
}
generate()

document.getElementById("update").addEventListener("click",generate)
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

