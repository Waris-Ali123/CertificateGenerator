
const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");




fileSelect.addEventListener(
    "click",
    (e) => {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    },
    false,
);

fileElem.addEventListener("change", handleFiles, false);


let names = [{
    "name": "Iorgo khan"
}, {
    "name": "Mattias Kumar"
}, {
    "name": "Maison Jacksen"
}, {
    "name": "Barthel bahiillao"
}, {
    "name": "Nico Chaurasiya"
}];

// console.log(names[0].name)
































const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function handleFiles() {

    if (!this.files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";

        const list = document.createElement("ul");
        fileList.appendChild(list);

        for (let i = 0; i < this.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");
            img.src = URL.createObjectURL(this.files[i]);
            img.height = 60;
            img.addEventListener("load", (e) => {
                ctx.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
                console.log('imageid : ' + img);
                ctx.font = '30px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = "bottom";
                ctx.fillText('hello world', canvas.clientWidth / 2, (canvas.clientHeight / 2) - 10);

                let downloadLink = document.createElement('a');
                downloadLink.href = canvas.toDataURL("image/png");
                downloadLink.download = 'hello.png';
                downloadLink.innerText = "download certificate";
                document.getElementById('certificate-section').append(downloadLink);
                //printing name in it..
            });

            img.onload = () => {
                URL.revokeObjectURL(img.src);
            };
            
            li.appendChild(img);
            const info = document.createElement("span");
            info.innerHTML = `${this.files[i].name}: ${this.files[i].size} bytes`;
            li.appendChild(info);
        }
    }
}







