window.addEventListener("load", () => {
    const  form = document.forms["aviasales"];

    Array.from(form.elements).map(createField(form));

    const config = {

        "city_from": (stripWS,required,minLength(5)),
        "city_to": (stripWS,required,minLength(5)),
        "date_from": date,
        "date_to": date
    }

    const showFailure = input => state => {
        console.log(state, [input]);
        input.nextSibling.innerHTML = state.error;
    }
    const showSuccess = input => state => {
        console.log(state, [input]);
        input.nextSibling.innerHTML = "";
    }

    form.addEventListener("input", ev => {
        const { target } = ev; 
        const { name } = target;
    
        if (name in config) {
          let { value } = target; 
    
          Result.switch
            (state => (state.level >= Failure.LEVEL_INPUT) && showFailure(target) (state))
            (showSuccess(target))
            (validate (config[name]) (value));
        }
    });


    form.addEventListener("focusout", ev => {
        const { target } = ev; 
        const { name } = target;
        
        if (name in config) {
          let { value } = target;    
          Result.switch
            (showFailure(target))
            (state => {
              showSuccess(target)
              target.value = state.serialized;
            })
            (validate (config[name]) (value));
        }
      });
})


const createField = form => input => {

    if (input.tagName === "BUTTON") {
      return;
    }
  
    const field = $("label", {
      className: "field"
    });
    
    form.insertBefore(field, input);
    
    field.append(
      $("div", { className: "label" }, input.dataset.label),
      input,
      $("div", { className: "errors" })
    );
  }