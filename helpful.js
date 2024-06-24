function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
            continue;
        }

        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

  
//   Here our loop handling the user - selected files looks at each file's type attribute to see if its MIME type begins with the string "image/"). For each file that is an image, we create a new img element. CSS can be used to establish any pretty borders or shadows and to specify the size of the image, so that doesn't need to be done here.

// Each image has the CSS class obj added to it, making it easy to find in the DOM tree.We also add a file attribute to each image specifying the File for the image; this will let us fetch the images for actual upload later.We use Node.appendChild() to add the new thumbnail to the preview area of our document.

//     Next, we establish the FileReader to handle asynchronously loading the image and attaching it to the img element.After creating the new FileReader object, we set up its onload function and then call readAsDataURL() to start the read operation in the background.When the entire contents of the image file are loaded, they are converted into a data: URL which is passed to the onload callback.Our implementation of this routine sets the img element's src attribute to the loaded image which results in the image appearing in the thumbnail on the user's screen.


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


// If the FileList object passed to handleFiles() is null, we set the inner HTML of the block to display "No files selected!". Otherwise, we start building our file list, as follows:

// A new unordered list (<ul>) element is created.
// The new list element is inserted into the <div> block by calling its Node.appendChild() method.
// For each File in the FileList represented by files:
// Create a new list item (<li>) element and insert it into the list.
// Create a new image (<img>) element.
// Set the image's source to a new object URL representing the file, using URL.createObjectURL() to create the blob URL.
// Set the image's height to 60 pixels.
// Set up the image's load event handler to release the object URL since it's no longer needed once the image has been loaded. This is done by calling the URL.revokeObjectURL() method and passing in the object URL string as specified by img.src.
// Append the new list item to the list.


















// Object URLs can be used for other things than just images! They can be used to display embedded PDF files or any other resources that can be displayed by the browser.

// In Firefox, to have the PDF appear embedded in the iframe (rather than proposed as a downloaded file), the preference pdfjs.disabled must be set to false Non-standard.
<iframe id="viewer"></iframe>
const obj_url = URL.createObjectURL(blob);
const iframe = document.getElementById("viewer");
iframe.setAttribute("src", obj_url);
URL.revokeObjectURL(obj_url);
