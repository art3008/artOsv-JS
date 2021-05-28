
window.addEventListener("load", async () => {


  const requestAll = $fetch("https://60a1ede0745cd70017575b10.mockapi.io/test");
  const requestId3 = $fetch("https://60a1ede0745cd70017575b10.mockapi.io/test/3");


  const list = await requestAll;
  document.body.append(...list.map(showPerson));

  const person3 = await requestId3;
  document.body.append(showPerson(person3));


  const pesronNewInput = {
    "name": "Anton",
    "date": new Date(2021, 20, 12)
  };

  const personNew = await $fetch("https://60a1ede0745cd70017575b10.mockapi.io/test", "POST", pesronNewInput);

  document.body.append(showPerson(personNew));

  const personEdited = await $fetch("https://60a1ede0745cd70017575b10.mockapi.io/test/16", "PUT", pesronNewInput);

  document.body.append(showPerson(personEdited));

  
  const personDeleted = await $fetch("https://60a1ede0745cd70017575b10.mockapi.io/test/16", "DELETE");

  document.body.append(showPerson(personDeleted));

});

const showPerson = (person) => {
  const data = new Date(person.date);

  return $("div", {}, 
    $("div", {}, person.id + " " + person.name  + " " + data.toLocaleDateString()),
    $("img", { src: person.avatar})
  );
}