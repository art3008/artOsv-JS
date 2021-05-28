
const mock = () => {
  let sections = createArray(index => [
    $("h1", {}, "Header " + (index + 1)),
    $("section", {
      style: {
        height: randomInt(500, 2000) + "px"
      }
    })
  ]) (7);

  document.body.append(...sections.flat());

};


window.addEventListener("load", () => {

  mock();

  const documentHeight = document.body.offsetHeight - window.innerHeight;

  const headerPositions = Array.from(document.querySelectorAll("h1")).map(element => element.offsetTop);

  console.log(headerPositions);

  const checkpoints = headerPositions.map(position => 
    $("div", { 
        className: "progress-bar__checkpoint",
        style: {
          left: (position * 100 / documentHeight) + "%"
        },
        onclick: () => {
          // window.scrollBy - прокручивает НА Y пикселей от текущей позиции скорла 
          window.scrollTo({
            left: 0,
            top: position,
            behavior: "smooth"
          });
        }
      })
  );

  const progressBar = $("div", {
    className: "progress-bar__bar"
  })

  const progressContainer = $("div", {
    className: "progress-bar"
  }, progressBar, ...checkpoints);

  document.body.append(progressContainer);

  const throttledHandler = throttle(() => {
    
    let lastIndex = headerPositions.findIndex(position => window.scrollY < position);
    if (lastIndex < 0) {
      lastIndex = checkpoints.length;
    }


    checkpoints.forEach((checkpoint, index) => {
      if (index < lastIndex) {
        checkpoint.classList.add("progress-bar__checkpoint_active");
      } else {
        checkpoint.classList.remove("progress-bar__checkpoint_active");
      }
    })


    console.log(window.scrollY, document.body.offsetHeight - window.innerHeight);

    progressBar.style.width = (window.scrollY * 100 / (document.body.offsetHeight - window.innerHeight)) + "%";


    
  }) (100);

  window.addEventListener("scroll", throttledHandler);


});