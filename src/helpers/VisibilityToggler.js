export default function handleToggle(e, toggleVariable, elementID, setter) {
  e.preventDefault();
  if (toggleVariable) {
    document.querySelector(`#${elementID}`).type = "password";
    setter(!toggleVariable);
  } else {
    document.querySelector(`#${elementID}`).type = "text";
    setter(!toggleVariable);
  }
}
