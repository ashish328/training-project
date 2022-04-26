export default {
  mounted(el, binding) {
    const date = new Date(binding.value);
    let formatedString = "";
    if (binding.arg === "date") {
      formatedString = date.toLocaleDateString(["en-IN"], {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    }
    if (binding.arg === "time") {
      formatedString = date.toLocaleTimeString(["en-IN"], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    el.innerText = formatedString;
  },
};
