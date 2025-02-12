const deleteBtns = document.querySelectorAll("#deleteBtn");
const registerForm = document.querySelector("#register-form");
const errorDiv = document.querySelector(".error");
registerForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const inputData = Object.fromEntries(formData);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(inputData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    console.log(response);
  } catch (error) {
    errorDiv.textContent = error.message;
    console.error("Error during registration:", error);
  }
});

const removeVehicle = async (id) => {
  const response = await fetch(`/api/vehicles/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
};

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    await removeVehicle(e.target.dataset.id);
    location.reload();
  });
});
