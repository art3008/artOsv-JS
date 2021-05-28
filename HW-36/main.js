const $fetch = async (url, method = "GET", body = null) => {
  const response = await fetch(url, {
    method,
    body: body //? JSON.stringify(body) : null
  }); 

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return response.status + " " + response.statusText;
  }
}

window.addEventListener("load", async () => {

  const form = document.forms["test"];

  const inputFile = form.elements["file"];

  let fileQueue = [];

  inputFile.addEventListener("change", e => {
    fileQueue = fileQueue.concat(Array.from(inputFile.files));
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(form);
    data.append("extra", 123);
    data.delete("file");

    fileQueue.forEach((file, index) => {
      data.append("file[" + index + "]", file, "file" + index + ".jpg");
    });


    // console.log(fileQueue);

    console.log(
      await $fetch("test.json", "POST", 
        data
      )
    );  
  })

  // const form = new FormData();
  // form.append("name", "myname");
  // console.log(
  //   await $fetch("test.json", "POST", 
  //     form
  //   )
  // );
    
  // console.log(
  //   await $fetch("test2.json")
  // );
  
})

  
// console.log(
//   fetch("https://logbook.itstep.org/")
//   .then(response => console.log(response))
//   );