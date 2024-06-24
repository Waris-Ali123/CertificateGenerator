
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

function generateForAll() {

    
    for (let i = 0; i < this.files.length; i++) {

        
        names.forEach((elem) => {
            
        
        
        
        // console.log(canva_img.src);
        
        let canva_img = new Image();
        canva_img.src = URL.createObjectURL(this.files[i]);
        canva_img.width = '1000';
        canva_img.height = '500';

        // canva_img.classList.add('canva_img');
   
        canva_img.addEventListener("load",(e)=>{
            
            const canva = document.createElement('canvas');
        // canva.classList.add('canva');

        const canva_ctx = canva.getContext("2d");

        canva.width = canva_img.width;
                        canva.height = canva_img.height;

            
            
            canva_ctx.drawImage(canva_img, 0, 0, canva_img.width, canva_img.height  );

        console.log('imageid : ' + canva_img);
        canva_ctx.font = '30px Arial';
        canva_ctx.textAlign = 'center';
        canva_ctx.textBaseline = "bottom";
        canva_ctx.fillText(elem.name,  canva_img.width / 2, (canva_img.height  / 2) - 10);
        
        let downloadLink = document.createElement('a');
        downloadLink.href = canva.toDataURL("image/png");
        downloadLink.download = `${elem.name}_certificate.png`;
        downloadLink.innerText = `download ${elem.name}'s certificate`;
        
        //printing name in it..
        document.getElementById('show-certificate').append(canva, downloadLink);
    });
    
    
    
});
}

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







