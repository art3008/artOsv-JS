window.addEventListener("load", async () => {
  const db = await DbContext.open();

  const id = 2;

  const currentUserNameContainer = document.getElementById("user_input__name");
  const currentUserAvatarContainer = document.getElementById("user_input__img");
  let currentUser = null;

  const validationErrorContainer = document.getElementById("validation_error");
  validationErrorContainer.style.display = "none";

  let isFormValid = false;

  const commentsContainer = document.getElementById("users_comments");
  const request = $fetch("https://60b4b2c14ecdc10017481313.mockapi.io/test");
  const listOfComments = await request;

  Array.from(listOfComments).forEach(element => {
    if (parseInt(element.id) === id) {
      currentUser = element;
      console.log(currentUser);
      currentUserNameContainer.append(
        element.name
      );
      currentUserAvatarContainer.append(
        $("img", { src: element.avatar })
      );
    }
  });

  // listOfComments.map(elem => {
  //     console.log(elem);
  // });
  await db.addCommentsFromFile(Array.from(listOfComments));

  commentsContainer.append(...listOfComments.map(loadComment));

  const form = document.forms["new_comment"];
  const textarea = form.elements["comment"];

  textarea.addEventListener("input", () => {
    if (textarea.value.length === 0) {
      validationErrorContainer.innerText = "Комментарий не должен быть пустым!";
      validationErrorContainer.style.display = "block";
      isFormValid = false;
    } else if (textarea.value.match(/<\/?.+>/gmi)) {
      validationErrorContainer.innerText = "Ваш текст содержит недопустимые значения!";
      validationErrorContainer.style.display = "block";
      isFormValid = false;
    } else {
      validationErrorContainer.style.display = "none";
      isFormValid = true;
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isFormValid) {
      const personNewInput = {
        "name": currentUser.name,
        "avatar": currentUser.avatar,
        "comment": textarea.value,
        "date": new Date().toLocaleDateString(),
      }
      const newComment = await $fetch("https://60b4b2c14ecdc10017481313.mockapi.io/test/" + id, "PUT", personNewInput);
      const newCommentContainer = loadComment(newComment);
      newCommentContainer.style.backgroundColor = "rgb(174, 255, 255)";

      commentsContainer.insertBefore(newCommentContainer, Array.from(commentsContainer.children)[0]);

      await db.addNewComment(personNewInput);

      const timeout = setTimeout(() => {
        newCommentContainer.style.backgroundColor = "rgb(61, 224, 224)";
        clearTimeout(timeout);
      }, 5000);
    }
  });


});

const loadComment = (user) => {
  const date = new Date(user.date);
  return $("div", { className: "user" },
    $("div", { className: "user__avatar" },
      $("div", { className: "avatar__img" },
        $("img", { src: user.avatar })
      ),
      $("div", { className: "avatar__name" },
        user.name
      ),
      $("div", { className: "date_of_publication" },
        date.toLocaleDateString()
      )
    ),
    $("div", { className: "user__text" },
      $("span", {}, user.comment)
    )
  );
}