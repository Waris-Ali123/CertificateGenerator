
const fileSelect = document.getElementById("fileSelect");
const fileElem = document.getElementById("fileElem");  //input tag
const fileList = document.getElementById("fileList");

fileSelect.addEventListener(
    "click",
    (e) => {
        if (fileElem) {
            fileElem.click();
            // console.log('fileElem')
        }
        e.preventDefault(); // prevent navigation to "#"
    },
    false,
);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {

    if (!this.files.length) {
        fileList.innerHTML = "<h2>No files selected in handle file!</h2>";
        alert('select a file first');
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
            console.log(img.src);

            img.addEventListener("click", (e) => {
                makingTestTemplate(img, this.files[i]);
            });

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
        // console.log(`X: ${x}, Y: ${y}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height);

        ctx.fillText('Your Name',x,y);
        downloadLink.href = canvas.toDataURL("image/png");
    });

    ctx.drawImage(imgToDraw, 0, 0, imgToDraw.width, imgToDraw.height);

     
    const fontSize = document.getElementById('fontSize').value + 'px';
    const fontFamily = document.getElementById('fontFamily').value;

    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = "bottom";
    ctx.fillText('Your Name',x,y);

    let downloadLink = document.createElement('a');
    downloadLink.classList.add('demo-download-link');
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = 'Demo.png';
    downloadLink.innerText = "download demo certificate";


    let generateForAllBtn = document.createElement('button');
    generateForAllBtn.innerText = 'Generate for all';

    generateForAllBtn.onclick = function () { generateForAll(fileForGenerateForAll,x,y); }
    
    
    
    let downloadForAllBtn = document.createElement('button');
    downloadForAllBtn.innerText = 'Download Certificate For All Names';
    downloadForAllBtn.addEventListener('click', (event) => {

        event.preventDefault(); // Prevent default action
                downloadForAll();
    });    
    
    
        let msg = document.createElement('h1');
        msg.innerText = 'Now click inside the image where you want to put \'Your Name\' text. Then Click on Generate For All Button... ';
        msg.style.textAlign = "Center";
    document.getElementById('btnAndLinkContainer').innerHTML = "";
    document.getElementById('btnAndLinkContainer').append(msg,downloadLink, generateForAllBtn,downloadForAllBtn);

}


let columns = { 'name' : [] } ;



function generateForAll(impfile,x,y) {
    

    document.getElementById('show-certificate').innerHTML = "";

    columns.name.forEach((elem) => {

        console.log(elem.toUpperCase());

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

            drawText(canva_ctx, elem, x,y);

            let downloadLink = document.createElement('a');
            downloadLink.href = canva.toDataURL("image/png");
            downloadLink.download = `${elem.toUpperCase()}_certificate.png`;
            downloadLink.innerText = `download ${elem}'s certificate`;
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


function drawText(canva_ctx, name, x, y) {
    
    const fontSize = document.getElementById('fontSize').value + 'px';
    const fontFamily = document.getElementById('fontFamily').value;
    
    canva_ctx.font = `${fontSize} ${fontFamily}`;
    canva_ctx.textAlign = 'center';
    canva_ctx.textBaseline = "bottom";
    canva_ctx.fillText(name.toUpperCase(), x, y);
}


function downloadForAll(){
    const links = document.querySelectorAll('.download-link');
    
    links.forEach(link => {
        console.log(fileElem.files[0]);
        const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                link.dispatchEvent(event);
            });
}


//handling excel input

function fetchAndReadExcelFile() {
    document.getElementById('excelInput').addEventListener('change', readingColumnData);
    document.getElementById('NameColumn').addEventListener('input', readingColumnData);

    function readingColumnData(e) {
        if (e.target.id === 'NameColumn' && !document.getElementById('excelInput').files.length) {
            console.log('No file chosen yet.');
            return;
        }
        
        columns.name = [];
        console.log('readingColumnData called');
        
        let excelFile = document.getElementById('excelInput').files[0];
        if (!excelFile) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);  // since the xlsx library does not support array buffer, convert it into a typed array of bits
            const workbook = XLSX.read(data, { type: 'array' });
            const ourSheetName = workbook.SheetNames[0];
            const ourSheetUnreadable = workbook.Sheets[ourSheetName];
            let JsonData = XLSX.utils.sheet_to_json(ourSheetUnreadable, { header: 1 });
            JsonData = JsonData.slice(1);

            let columnNoInput = document.getElementById('NameColumn');
            let columnNoValue = columnNoInput.value - 1;

            JsonData.forEach((row) => {
                if (row[columnNoValue] !== undefined) {
                    columns.name.push(row[columnNoValue]);
                }
            });

            console.log(columns);
        };

        reader.readAsArrayBuffer(excelFile);
    }
}

fetchAndReadExcelFile();