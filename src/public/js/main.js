const deleteBtns = document.querySelectorAll("#deleteBtn");
const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");
const errorDiv = document.querySelector(".error");
const logoutBtn = document.querySelector("#logout");

logoutBtn?.addEventListener("click", async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  } catch (error) {
    console.error(error);
  }
});
registerForm?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    errorDiv.textContent = "";
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
    window.location.href = "/";
  } catch (error) {
    errorDiv.textContent = error.message;
    console.error("Error during registration:", error);
  }
});

loginForm?.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    errorDiv.textContent = "";
    const formData = new FormData(loginForm);
    const inputData = Object.fromEntries(formData);
    console.log(inputData);

    const response = await fetch("/api/auth/login", {
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
    window.location.href = "/";
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
