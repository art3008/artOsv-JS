let container = null;
let currentItem = null;
let currentPlaceholder = null;
let placeholderIndex = 0;
let innerX = 0;
let innerY = 0;

window.addEventListener("load", () => {

  container = $("div", {
    className: "drag-n-drop",
  },
    ...createArray(createItem)(30)
  );

  document.body.append(container);

  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("mousemove", drag);

});


const createItem = (index) => {
  const item = $("div", { 
      className: "drag-n-drop__item",
      dataset: {
        index
      },
      onmousemove: dragOver,
    }
  );

  const content = $("div", { 
      className: "drag-n-drop__content",
      onmousedown: startDrag(item),
    }, index);

  item.append(content);

  return item;
}


const createPlacehodler = (height, width, index) => {
  const item = $("div", { 
      className: "drag-n-drop__placeholder",
      style: {
        width: width + "px",
        height: height + "px",
      }

    }
  )

  const content = $("div", { 
      className: "drag-n-drop__placeholder-content ",
    });

  item.append(content);

  return item;
}


const startDrag = (item) => (event) => {
  currentItem = item;
  
  const width = currentItem.offsetWidth;
  const height = currentItem.offsetHeight;
  currentPlaceholder = createPlacehodler(height, width);
  placeholderIndex = currentItem.dataset.index;
  
  innerX = item.offsetLeft - event.pageX;
  innerY = item.offsetTop - event.pageY;
  

  currentItem.style.width = width + "px";
  currentItem.style.hepight = height + "px";

  currentItem.classList.add("drag-n-drop__item_dragging");
  


  container.insertBefore(currentPlaceholder, currentItem);
  
  
  let x = event.pageX + innerX;
  let y = event.pageY + innerY;

  
  currentItem.style.transform = "translate(" + x + "px," + y + "px)";
}

const drag = (event) => {
  
  if (currentItem === null) {
    return;
  } 
  
  event.preventDefault(); // чтобы выключить выделение текста

  let x = event.pageX + innerX ;
  let y = event.pageY + innerY;

  
  if (container.offsetLeft >= currentItem.offsetLeft) {
    
    console.log(container.offsetLeft, currentItem.offsetLeft);
  }


  if (container.offsetTop >= currentItem.offsetTop) {
    
    console.log(container.offsetTop, currentItem.offsetTop);
  }


  console.log(x, y);

  const maxX = container.clientWidth - currentItem.offsetWidth + 40;
  
  
  const maxY = container.clientHeight - currentItem.offsetHeight + 40;
  
    
  
  x = Math.max(0, Math.min(maxX,x - 40)) + 40;
  
  
  y = Math.max(0, Math.min(maxY,y - 40)) + 40;


  console.log(container.clientWidth - currentItem.offsetWidth)
  
  currentItem.style.transform = "translate(" + x + "px," + y + "px)";


}

const dragOver = (event) => {
  if (currentItem === null) {
    return;
  }

  const item = event.currentTarget;
  const itemIndex = item.dataset.index;
  console.log(placeholderIndex, item.dataset.index);

  if (itemIndex < placeholderIndex) {
    container.insertBefore(currentPlaceholder, item);
    placeholderIndex = item.dataset.index;
  } else {
    container.insertBefore(currentPlaceholder, item.nextSibling);
    placeholderIndex = item.dataset.index + 1;
  }

}

const stopDrag = (event) => {
  if (currentItem === null) {
    return;
  }

  innerX = 0;
  innerY = 0;
  currentItem.classList.remove("drag-n-drop__item_dragging");
  currentItem.style.transform = null;

  currentItem.style.width = null;
  currentItem.style.hepight = null;
  
  container.insertBefore(currentItem, currentPlaceholder);
  currentPlaceholder.remove();
  placeholderIndex = 0;
  
  Array.from(container.children).forEach((item, index) => {
    item.dataset.index = index;
  });
  
  currentItem = null;
  currentPlaceholder = null;
}