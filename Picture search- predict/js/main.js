document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("txt-predict");
  const image = document.getElementById("img-predict");

  const imageList = [
    "bird.jpg",
    "bear.jpg",
    "chick.jpg",
    "dear.jpg",
    "dog.jpg",
    "lion.jpg"
  ];

  input.addEventListener("keyup", () => {
    const typed = input.value.toLowerCase().trim();
    const match = imageList.find(img => img.startsWith(typed));
    image.src = match ? `images/${match}` : "images/no.png";
  });
});