async function validateForm() {
    const name = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    const email = document.getElementById("email").value;

    const nameError = document.getElementById("name-error");
    const apiError = document.getElementById("api-error");
    const emailError = document.getElementById(
        "email-error"
    );

    nameError.textContent = "";
    emailError.textContent = "";


    let isValid = true;

    if (name === "" || /\d/.test(name)) {
        nameError.textContent =
            "Please enter your name properly.";
        isValid = false;
    }

    if (email === "" || !email.includes("@")) {
        emailError.textContent =
            "Please enter a valid email address.";
        isValid = false;
    }

    if (isValid) {
        try {
            const myBody = {
                "name": name,
                "email": email,
                "phone": phone,
                "message": message
            }
            const response = await fetch('https://api.yaazh.in/api/mail', {
                method: 'POST',
                body: myBody, // string or object
                headers: {
                    accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const myJson = await response.json()
            console.log("myJson---->", myJson)
        } catch (e) {
            apiError.textContent =
                "Some error occurred while sending the message. Please send a mail to sales@yaazh.in or try again later";
        }
    }
}