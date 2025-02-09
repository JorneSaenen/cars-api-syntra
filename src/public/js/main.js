const deleteBtns = document.querySelectorAll("#deleteBtn");

const deleteVehicle = async (id) => {
  try {
    const response = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    await deleteVehicle(id);
    location.reload();
  });
});
