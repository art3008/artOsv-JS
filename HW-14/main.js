// Переменные как константы . промежуточные переменные 
// Функции - в математическом смысле. чистые функция
// Объекты - неизменяемые, данные (POJO), Модули - набор функционала (префикс), 

// React - функционального: компонент - функция

// username - обязательное, не меньше 5 символов
// passwrods - обязательное, не меньше 8 символов, (содержит символ !) (содержит большую букву и цифру)
// age - число, целое, (0, 150)

let validForm = {
    username: "anton",
    password: "anton!anton",
    age: "20",
    height: "100",
  };
  
  let invalidForm = {
    username: "anto",
    password: "anto",
    age: "20a",
    height: "500"
  };
  
  
  // string -> ValidationState
  const createValidationState = (value) => ({
    value, // string - Исходное значение поля
    result: value, // any - Чистое значение поля
    isValid: true, //bolean - Флаг валидности поля
    error: null // string - Ошибка (если есть )
  });
  
  const withError = (state, error) => ({
    value: state.value,
    result: state.result,
    isValid: false,
    error
  })
  
  // ValidationState -> required -> length(8) -> hasChar(ExclamationMark) -> ValidationState
  // ValidationState -> required -> isNumber() -> isInRange(0, 150) -> ValidationState
  
  const required = (state) => {
    if (!state.isValid) {
      return state;
    }
  
    return state.result.length > 0 ? state : withError(state, "Обязательное поле");
  }
  
  const length = (minLength) => (state) => {
    if (!state.isValid) {
      return state;
    }
  
    return state.result.length >= minLength ? state : withError(state, "Длина должна быть не меньше " + minLength);
  }
  
  const validate = (...validators) => (initialState) => 
    validators.reduce((state, validator) => validator(state), initialState);
  
  
  let UserFormValidation = {
    username: validate(required, length(5)),
    password: validate(required, length(8), contains("!")),
    age: (state) => [true,]
    // age: validateAge,
    // height: validateHeight,
  };
  
  const validateFiled = key => value => {
    const state = createValidationState(value);
  
    return (
      UserFormValidation.hasOwnProperty(key)
      ? UserFormValidation[key](state)
      : state
    );
  }
    // UserFormValidation[key] ? UserFormValidation[key](value) : UserFormValidation["_default"](value);
  
  // UserForm = { string: string }
  // Errors = { string: string }
  // Maybe<User> = User | null
  // UserForm -> [boolean, Errors, Maybe<User>]
  // form -> validateFields -> isFormValid -> 
  //                        ----------------> [isValid, errors, createUser]
  // pipe(form, validateFileds, isFormValid, createResult)
  const validateUserForm = form => {
  
    const validationStates = 
      Object.entries(form)
        .map(([key, value]) => [key, validateFiled(key)(value)])
        .filter(([, state]) => !state.isValid); // [ [key, ValidationState] ]
  
    const isValid = validationStates.length == 0;
  
    return [
      isValid, 
      Object.fromEntries(
        validationStates.map(([key, state]) => [key, state.error])
      ), 
      isValid && createUser(form)
    ];
  }
  
  const createUser = ({
    username,
    password,
    age
  }) => ({
    username,
    password,
    age,
    dateOfRegistration: new Date()
  });
  
  // UserForm -> void (Побочный эффект)
  // Пограничная функция между миром чистых функций и миром побочных эффектов
  const handleSubmit = (form) => {
    // проверка типов данных 
    const [isValid, errors, user] = validateUserForm(form);
  
    if (isValid) {
      // отправить форму 
      console.log("Создаем пользователя", user);
    } else {
      // отображаем ошибки в форме
      console.log("Форма заполнена с ошибками", errors, form);
    }
  }
  
  /// 
  
  handleSubmit(validForm);
  console.log("-----");
  handleSubmit(invalidForm);