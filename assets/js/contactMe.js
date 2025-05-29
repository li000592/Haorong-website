;(function () {
  emailjs.init("user_Tot1NFsaIjpE5ZxGMs9ns")
})()

window.onload = function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault()

    const formValue = {
      name: document.getElementById("to_name").value,
      email: document.getElementById("from_email").value,
      message: document.getElementById("message").value,
    }
    // check the forms is filled
    if (!(formValue.name.length > 2 && formValue.email.length > 2, formValue.message.length > 2)) {
      alert("Please fill in all required fields!")
      return
    }
    // check the email input value is email
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formValue.email)) {
      alert("Please type the right format of email address")
      return
    }

    // these IDs from the previous steps
    emailjs.sendForm("service_uaok5lo", "template_0ohckku", this).then(
      function () {
        alert("SUCCESS!")
      },
      function (error) {
        alert("FAILED...", error)
      }
    )
  })
}
