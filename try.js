
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
fileElem.addEventListener("change", generateForAll, false);

let names1 = [{
    "name": "Iorgo khan"
}, {
    "name": "Mattias Kumar"
}, {
    "name": "Maison Jacksen"
}, {
    "name": "Barthel bahiillao"
}, {
    "name": "Nico Chaurasiya"
}, {
    "name": "Evelyn Harris"
}, {
    "name": "Oliver Smith"
}, {
    "name": "Liam Johnson"
}, {
    "name": "Noah Williams"
}, {
    "name": "Sophia Brown"
}, {
    "name": "Isabella Garcia"
}, {
    "name": "Mia Martinez"
}, {
    "name": "Amelia Rodriguez"
}, {
    "name": "Harper Davis"
}, {
    "name": "Evelyn Moore"
}, {
    "name": "Avery Thomas"
}, {
    "name": "Ella White"
}, {
    "name": "Scarlett Lopez"
}, {
    "name": "Grace Lee"
}, {
    "name": "Aria Gonzalez"
}, {
    "name": "Chloe Harris"
}, {
    "name": "Victoria Clark"
}, {
    "name": "Zoey Lewis"
}, {
    "name": "Lily Robinson"
}, {
    "name": "Layla Walker"
}, {
    "name": "Riley Perez"
}, {
    "name": "Nora Hall"
}, {
    "name": "Brooklyn Young"
}, {
    "name": "Hannah Allen"
}, {
    "name": "Leah King"
}, {
    "name": "Zoe Wright"
}, {
    "name": "Stella Scott"
}, {
    "name": "Hazel Green"
}, {
    "name": "Ellie Adams"
}, {
    "name": "Paisley Baker"
}, {
    "name": "Audrey Nelson"
}, {
    "name": "Skylar Carter"
}, {
    "name": "Violet Mitchell"
}, {
    "name": "Claire Perez"
}, {
    "name": "Bella Roberts"
}, {
    "name": "Aurora Turner"
}, {
    "name": "Lucy Phillips"
}, {
    "name": "Anna Campbell"
}, {
    "name": "Samantha Parker"
}, {
    "name": "Caroline Evans"
}, {
    "name": "Genesis Edwards"
}, {
    "name": "Aubrey Collins"
}, {
    "name": "Madelyn Stewart"
}, {
    "name": "Serenity Morris"
}, {
    "name": "Kennedy Rogers"
}];



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



function generateForAll() {
    document.getElementById('show-certificate').innerHTML = "";


    for (let i = 0; i < this.files.length; i++) {


        names.forEach((elem) => {

            console.log(elem.name.toUpperCase());

            let canvaAndDownloadLinkDiv = document.createElement('div');
            canvaAndDownloadLinkDiv.classList.add('canvaDiv');

            let canva_img = new Image();
            canva_img.src = URL.createObjectURL(this.files[i]);
            canva_img.width = '1000';
            canva_img.height = '500';

            function handleImageLoad (e){

                const canva = document.createElement('canvas');
                canva.classList.add('canva');

                const canva_ctx = canva.getContext("2d");

                canva.width = canva_img.width;
                canva.height = canva_img.height;



                canva_ctx.drawImage(canva_img, 0, 0, canva_img.width, canva_img.height);

                drawText(canva_ctx,elem.name,canva_img.width / 2, (canva_img.height / 2) - 10);

                let downloadLink = document.createElement('a');
                downloadLink.href = canva.toDataURL("image/png");
                downloadLink.download = `${elem.name.toUpperCase()}_certificate.png`;
                downloadLink.innerText = `download ${elem.name}'s certificate`;
                downloadLink.classList.add('download-link');

                //printing name in it..
                canvaAndDownloadLinkDiv.append(canva, downloadLink);
                document.getElementById('show-certificate').append(canvaAndDownloadLinkDiv);

            }

            canva_img.addEventListener("load",handleImageLoad);
            canva_img.addEventListener("change",handleImageLoad);

        });
    }

}


function drawText(canva_ctx, name, x, y) {
    
    
    const fontSize = document.getElementById('fontSize').value + 'px' ;
    const fontFamily  = document.getElementById('fontFamily').value;

    canva_ctx.font = `${fontSize} ${fontFamily}`;
    canva_ctx.textAlign = 'center';
    canva_ctx.textBaseline = "bottom";
    canva_ctx.fillText(name.toUpperCase(), x, y);
}



























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
                // generateForAll();
                //printing name in it..
            });

            // img.onload = () => {
            //     URL.revokeObjectURL(img.src);
            // };

            li.appendChild(img);
            const info = document.createElement("span");
            info.innerHTML = `${this.files[i].name}: ${this.files[i].size} bytes`;
            li.appendChild(info);
        }
    }
}







