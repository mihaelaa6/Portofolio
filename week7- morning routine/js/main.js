function setRoutine() {
  const now = new Date();
  const hour = now.getHours();
  const routineList = document.getElementById("ol-routine");
  const routineImage = document.getElementById("img-routine");
  const routineAudio = document.getElementById("aud-routine");
  const currentTime = document.getElementById("current-time");
  const routineMessage = document.getElementById("routine-message");

  let routineItems = [];
  let imageSrc = "";
  let audioSrc = "";
  let greeting = "";

  if (hour < 11) {
    greeting = "Good morning. Rise and shine!";
    routineItems = [
      "Turn on relaxing music",
      "Brush teeth",
      "Let the dog out",
      "Make scrambled eggs and whole grain toast",
      "Drink strong coffee",
      "Eat some fruit",
      "Give dog a little bit of your breakfast",
      "Take shower"
    ];
    imageSrc = "images/morning.jpg";
    audioSrc = "songs/morning.mp3";
  } else if (hour < 19) {
    greeting = "Good afternoon! Keep up the momentum.";
    routineItems = [
      "Eat lunch",
      "Take a short walk",
      "Work on freelance projects",
      "Debug code challenges",
      "Check emails and messages",
      "Update Upwork profile",
      "Review team contributions",
      "Prep dinner ingredients"
    ];
    imageSrc = "images/afternoon.jpg";
    audioSrc = "songs/afternoon.mp3";
  } else {
    greeting = "Good evening. Time to wind down.";
    routineItems = [
      "Have dinner",
      "Relax with a book or show",
      "Reflect on the day",
      "Plan tomorrow’s goals",
      "Take a warm shower",
      "Prep clothes for tomorrow",
      "Listen to calming music",
      "Go to bed"
    ];
    imageSrc = "images/evening.jpg";
    audioSrc = "songs/evening.mp3";
  }

  // Set greeting message
  routineMessage.textContent = `${greeting} It's ${now.toLocaleTimeString()}`;

  // Populate list
  routineList.innerHTML = "";
  routineItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    routineList.appendChild(li);
  });

  // Set image and audio
  routineImage.src = imageSrc;
  routineAudio.src = audioSrc;

  // Display current time
  currentTime.textContent = `Current time: ${now.toLocaleTimeString()}`;
}
