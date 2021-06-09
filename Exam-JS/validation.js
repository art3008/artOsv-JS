const identity = x => x;

class Result {
  input

  constructor(input) {
    this.input = input;
  }
}

Result.from = input =>
  new Success(input,input,input);

Result.switch = f => g => state => {
  switch(state.constructor) {
    case Failure: return f(state);
    case Success: return g(state);
  }
}

Result.merge = a => b =>
  Result.switch
    (state => new Failure(b.input, state.error, state.level))
    (state => new Success(b.input, state.error, state.serialized))
    (a)

Result.continue = Result.switch (identity);

Result.bichain = f => g => 
  Result.switch
    (state => Result.merge (f(state.error)) (state))
    (state => Result.merge (g(state.value)) (state));

Result.chain = g =>
  Result.continue 
    (state => Result.merge (g(state.value)) (state));

Result.map = g =>
  Result.continue 
    (state => Result.merge (Success.of(g(state.value))) (state));
  
Result.mapError = f =>
  Result.switch 
    (state => Result.merge (Failure.of(f(state.error))) (state))
    (identity);

class Success extends Result {
  serialized
  value
    
  constructor(input, value, serialized) {
    super(input);
    this.value = value;
    this.serialized = serialized;
  }
}

Success.of = (value, serialized) => 
  new Success(null, value, serialized || value);

class Failure extends Result {
  level
  error
  
  constructor(input, error, level) {
   super(input);
   this.error = error;
   this.level = level;
  }
}

Failure.LEVEL_CHANGE = 0;
Failure.LEVEL_INPUT = 1;


Failure.of = (error, level) => 
  new Failure(null, error, typeof level === "undefined" ? Failure.LEVEL_INPUT : level);

const validate = validator => input => 
  validator(Result.from(input));

  const chain = (...validators) => 
  Result.continue 
    (initialState => 
      validators.reduce(
        (state, validator) => 
          Result.continue(Result.merge (validator(state))) (state), 
        initialState))

const any = (...validators) => 
  Result.continue 
    (initialState => {
      let state = null;
      // let errors = [];
      return validators.find(validator => {
              state = validator(initialState);
              return state instanceof Success;
            }) 
            ? Result.merge (state) (initialState)
            : Result.merge (Failure.of("Ошибка")) (initialState);
    });

const map = f => validator =>
  Result.continue
    (state => Result.map(f) (validator(state)));

const mapError = f => validator =>
  Result.continue
    (state => Result.mapError(f) (validator(state)));

/////

const required =  
  Result.chain
    (value => (value === 0 || (value && (!Array.isArray(value) || value.length > 0))) 
            ? Success.of(value) 
            : Failure.of("Обязательное поле"));

const length = maxLength => minLength => 
  Result.chain
    (value => (value.length < minLength && value !== "")
            ? Failure.of(`Длина должна быть не меньше ${minLength}`)
            : value.length > maxLength
            ? Failure.of(`Длина должна быть не больше ${maxLength}`)
            : Success.of(value));
          
const minLength = length (Number.MAX_VALUE);
const maxLength = maxLength => length (maxLength) (0);

const date = 
Result.chain
  (value => {
    if (value === "") {
      return Success.of(value);
    }
    // Добавить собственный парсер даты
    const d = new Date(value);
    
    return isNaN(d.getDate()) 
         ? Failure.of(`Значение должно быть датой`)
         : Success.of(d,d.toLocaleDateString());
  });


const reMultiWs = /\s{2,}/g;

const reg = /\/\d{2}(-|\/)\d{2}\1\d{4}/g;

const stripWS =
  Result.chain
    (value => Success.of(
      value.trim(" ").replace(reMultiWs, " ")
    ));

