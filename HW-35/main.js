window.addEventListener("load", () => {

const form = $("form",{
    name: "myForm"
},
    $("input",{type:"text",name:"field-1"}),
    $("div",{name:"field-1"}),

)

document.body.append(form);

console.log([form])

const text = form.elements["field-1"];

text.addEventListener("change", (event) => {
    //console.log(event);
    let a = text.value.split("+");
    
    console.log(parseInt(a[0]) + parseInt(a[1]));


  });

});