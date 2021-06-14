// window.addEventListener("load", () => {
//     const  form = document.forms["aviasales"];

//     Array.from(form.elements).map(createField(form));

//     const config = {

//         "city_from": (stripWS,required,minLength(5)),
//         "city_to": (stripWS,required,minLength(5)),
//         "date_from": date,
//         "date_to": date
//     }

//     const showFailure = input => state => {
//         console.log(state, [input]);
//         input.nextSibling.innerHTML = state.error;
//     }
//     const showSuccess = input => state => {
//         console.log(state, [input]);
//         input.nextSibling.innerHTML = "";
//     }

//     form.addEventListener("input", ev => {
//         const { target } = ev; 
//         const { name } = target;
    
//         if (name in config) {
//           let { value } = target; 
    
//           Result.switch
//             (state => (state.level >= Failure.LEVEL_INPUT) && showFailure(target) (state))
//             (showSuccess(target))
//             (validate (config[name]) (value));
//         }
//     });


//     form.addEventListener("focusout", ev => {
//         const { target } = ev; 
//         const { name } = target;
        
//         if (name in config) {
//           let { value } = target;    
//           Result.switch
//             (showFailure(target))
//             (state => {
//               showSuccess(target)
//               target.value = state.serialized;
//             })
//             (validate (config[name]) (value));
//         }
//       });
// })


// const createField = form => input => {

//     if (input.tagName === "BUTTON") {
//       return;
//     }
  
//     const field = $("label", {
//       className: "field"
//     });
    
//     form.insertBefore(field, input);
    
//     field.append(
//       $("div", { className: "label" }, input.dataset.label),
//       input,
//       $("div", { className: "errors" })
//     );
//   }


window.addEventListener("load", async () => {
  const db = await DbContext.open();

  await db.seed(mockAirports);

  const input_from = document.forms["aviasales"].elements["city_from"];
  const input_to = document.forms["aviasales"].elements["city_to"];

  const renderAirportsFrom = _renderAirportsFrom(document.getElementById("cities_from"));
  const renderAirportsTo = _renderAirportsTo(document.getElementById("cities_to"));
  
  
  const search = _search(db);
  const handleInputFrom = _handleInputFrom(search, renderAirportsFrom);
  const handleInputTo = _handleInputFrom(search, renderAirportsTo);
  
  //const air = document.getElementById("cities");

  handleLocation(handleInputFrom, input_from);
  handleLocation(handleInputTo,input_to);

  window.addEventListener("popstate", () =>{
    console.log(window.location.search);
    handleLocation(handleInputFrom, input_from);
    handleLocation(handleInputTo,input_to);

  });

  input_from.addEventListener("input", async e => {
    const query = sanitizeQuery(input_from.value);
    updateHistory(query);
    await handleInputFrom(query);
  });

  input_to.addEventListener("input", async e => {
    const query = sanitizeQuery(input_to.value);
    updateHistory(query);
    await handleInputTo(query);
  });

  console.log(db);

});

const _renderAirpo = container => airports => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  container.append(...airports.map(renderAirportsFrom)); 

  console.log(airports.length);
};



const sanitizeQuery = query => query.trim();

const updateHistory = query => {
  window.document.title = "Поиск: " + query;
  window.history.pushState(null, "Поиск: " + query, "?query=" + window.encodeURIComponent(query));
}

const _handleInputFrom = (search, renderAirportsFrom) => async query  => {
  renderAirportsFrom(await search(query));
}

const _search = db => async query => {

  if (!query) {
    return [];
  }

  const randMatch = query.match(/^rand (\d+)$/i)
  if (randMatch) {
    return await db.listRandom(parseInt(randMatch[1]));
  }

  // validation
  // разобрать сложный запрос

  let predicate;
  if (query.search(/^\+?\d+$/) >= 0) {
    predicate = contact => {
      return contact.phone.includes(query);
    };
  } else {
    query = query.toUpperCase();
    predicate = airport => {
      return airport.name.toUpperCase().includes(query);
    };
  }

  return await db.findContacts(predicate);
}

const _renderAirportsFrom = container => airports => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  container.append(...airports.map(renderAirportsFrom)); 

  console.log(airports.length);
};

const _renderAirportsTo = container => airports => {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  container.append(...airports.map(renderAirportsTo)); 

  console.log(airports.length);
};




const renderAirportsFrom = airport => {
  return $("div", {className:"list", onclick: () => {
    const inp = document.getElementById("city_from");
    const air = document.getElementById("cities_from");
    inp.value = airport.name;
    console.log(airport.name);
    air.classList.add("blk-hidden");
    //document.body.removeChild(air);

  }}, [airport.name]);
}

const renderAirportsTo = airport => {
  return $("div", {className:"list", onclick: () => {
    const inpt = document.getElementById("city_to");
    const air = document.getElementById("cities_to");
    inpt.value = airport.name;
    console.log(airport.name);
    air.classList.add("blk-hidden");
    //document.body.removeChild(air);

  }}, [airport.name]);
}




const handleLocation = (handleInputFrom, input) => {
  const query = getHrefQuery()["query"];

  if (query) {
    input.value = query;
    handleInputFrom(query);
  }

}


const getHrefQuery = () => {
  const queryString = window.location.search.slice(1);

  console.log(queryString);

  return Object.fromEntries(
    queryString.split("&")
    .map(pair => pair.trimStart())
    .map(pair => {
      const i = pair.indexOf("=");

      let key = pair.slice(0, i);

      try {
        key = window.decodeURIComponent(key);
      } catch (e) {}

      let value = pair.slice(i + 1);
      
      try {
        value = window.decodeURIComponent(value);
      } catch (e) {}

      return [key, value];
    }));
}