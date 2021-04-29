/**
 * 
 * @param {*} tag 
 * @param {*} attributes 
 * @param  {...any} children 
 * @returns {HTMLElement}
 */
 const $ = (tag, attributes = {}, ...children) => {
    const element = document.createElement(tag);
  
    Object.entries(attributes)
      .forEach(([key, value]) => {
        if (key === "style") {
          Object.entries(value).forEach(([cssKey, cssValue]) => {
            element.style[cssKey] = cssValue;
          });
        } else if (key.startsWith("on")) { // Строка начинается с "on" 
          element.addEventListener(key.slice(2), value);
        } else if (key === "dataset") {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue;
          });
        } else {
          element[key] = value;
        }
  
      });
  
    element.append(...children);
  
    return element;
  }
  