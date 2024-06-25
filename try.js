
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");
const fileList = document.getElementById("fileList");

fileSelect.addEventListener(
    "click",
    (e) => {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
        console.log('stopped')
    },
    false,
);

fileElem.addEventListener("change", handleFiles, false);
// fileElem.addEventListener("change", generateForAll, false);

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



function generateForAll(impfile,x,y) {
    document.getElementById('show-certificate').innerHTML = "";

    names.forEach((elem) => {

        console.log(elem.name.toUpperCase());

        let canvaAndDownloadLinkDiv = document.createElement('div');
        canvaAndDownloadLinkDiv.classList.add('canvaDiv');

        let canva_img = new Image();
        canva_img.src = URL.createObjectURL(impfile);
        canva_img.width = '1000';
        canva_img.height = '500';

        function handleImageLoad(e) {

            const canva = document.createElement('canvas');
            canva.classList.add('canva');

            const canva_ctx = canva.getContext("2d");

            canva.width = canva_img.width;
            canva.height = canva_img.height;



            canva_ctx.drawImage(canva_img, 0, 0, canva_img.width, canva_img.height);

            drawText(canva_ctx, elem.name, x,y);

            let downloadLink = document.createElement('a');
            downloadLink.href = canva.toDataURL("image/png");
            downloadLink.download = `${elem.name.toUpperCase()}_certificate.png`;
            downloadLink.innerText = `download ${elem.name}'s certificate`;
            downloadLink.classList.add('download-link');

            // downloadLink.addEventListener('click', (event) => {
            //     event.preventDefault();
            //     downloadLink.click();
            // });

            //printing name in it..
            canvaAndDownloadLinkDiv.append(canva, downloadLink);
            document.getElementById('show-certificate').append(canvaAndDownloadLinkDiv);

        }

        canva_img.addEventListener("load", handleImageLoad);
        canva_img.addEventListener("change", handleImageLoad);

    });
}


const fontSize = document.getElementById('fontSize').value + 'px';
const fontFamily = document.getElementById('fontFamily').value;

function drawText(canva_ctx, name, x, y) {

    canva_ctx.font = `${fontSize} ${fontFamily}`;
    canva_ctx.textAlign = 'center';
    canva_ctx.textBaseline = "bottom";
    canva_ctx.fillText(name.toUpperCase(), x, y);
}

function handleFiles() {

    if (!this.files.length) {
        fileList.innerHTML = "<h2>No files selected!</h2>";
    } else {
        fileList.innerHTML = "";

        const list = document.createElement("ul");
        fileList.appendChild(list);

        for (let i = 0; i < this.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");
            img.src = URL.createObjectURL(this.files[i]);
            img.height = 160;
            img.width = 260;

            img.addEventListener("click", (e) => {
                makingTestTemplate(img, this.files[i]);


            });

            // img.onload = () => {
            //     URL.revokeObjectURL(img.src);
            // };

            li.appendChild(img);
            const info = document.createElement("span");
            info.innerHTML = `${this.files[i].name}: ${this.files[i].size} bytes`;
            li.appendChild(info);
        }

        let msg = document.createElement('h1');
        msg.innerText = 'Please click one from the above images to be displayed on frame';
        msg.style.textAlign = "Center";
        fileList.appendChild(msg);

    }
}

function makingTestTemplate(imgFetchedFromTestTemplate, fileForGenerateForAll) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    var imgToDraw = new Image();
    imgToDraw.src = imgFetchedFromTestTemplate.src;

    imgToDraw.width = '1000';
    imgToDraw.height = '500';

    canvas.width = imgToDraw.width;
    canvas.height = imgToDraw.height;

    let x = canvas.clientWidth / 2, y = (canvas.clientHeight / 2) - 10;

    canvas.addEventListener('click', (event) => {
        // Get the coordinates relative to the element
        x = event.offsetX;
        y = event.offsetY;
        console.log(`X: ${x}, Y: ${y}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height);

        ctx.fillText('Your Name',x,y);
    });

    ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height);

    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = "bottom";
    ctx.fillText('Your Name',x,y);

    let downloadLink = document.createElement('a');
    downloadLink.classList.add('demo-download-link');
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = 'Demo.png';
    downloadLink.innerText = "download demo certificate";

    downloadLink.addEventListener('click', (event) => {
        // downloadLink.click();
        console.log('downloaded');
        // event.preventDefault();
    });


    let generateForAllBtn = document.createElement('button');
    generateForAllBtn.innerText = 'Generate for all';

    generateForAllBtn.onclick = function () { generateForAll(fileForGenerateForAll,x,y); }
    
    
    
    let downloadForAllBtn = document.createElement('button');
    downloadForAllBtn.innerText = 'Download Certificate For All Names';
    downloadForAllBtn.addEventListener('click', (event) => {

        event.preventDefault(); // Prevent default action
                downloadForAll();

        // const links = document.querySelectorAll('.download-link');
        // links.forEach(link => {
        //     const event = new MouseEvent('click', {
        //         view: window,
        //         bubbles: true,
        //         cancelable: true
        //     });
        //     link.dispatchEvent(event);
        // });
    });    
    
    
        let msg = document.createElement('h1');
        msg.innerText = 'Now click inside the image where you want to put \'Your Name\' text. Then Click on Generate For All Button... ';
        msg.style.textAlign = "Center";
    document.getElementById('btnAndLinkContainer').innerHTML = "";
    document.getElementById('btnAndLinkContainer').append(msg,downloadLink, generateForAllBtn,downloadForAllBtn);

}



function downloadForAll(){
    const links = document.querySelectorAll('.download-link');
            links.forEach(link => {
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                link.dispatchEvent(event);
            });
}






