export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const script = document.createElement("script");
    script.src = "/js/vanilla-tilt.min.js";
    script.async = true;
    document.head.appendChild(script);
  }
});
