const engagementDate = new Date("August 28, 2026 21:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();

  const difference = engagementDate - now;

  if (difference <= 0) {
    clearInterval(countdown);

    document.querySelector(".countdown").innerHTML = `
            <h2>Our Special Day Is Here ❤️</h2>
        `;

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}, 1000);

const rsvpForm = document.getElementById("rsvpForm");

const attendanceInputs = document.querySelectorAll('input[name="attendance"]');

const guestsCountGroup = document.getElementById("guestsCountGroup");

const guestsCountInput = document.getElementById("guestsCount");

attendanceInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.value === "no" && input.checked) {
      guestsCountGroup.style.display = "none";

      guestsCountInput.value = 1;
    }

    if (input.value === "yes" && input.checked) {
      guestsCountGroup.style.display = "block";
    }
  });
});

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = rsvpForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = "Sending... ♡";

  const name = document.getElementById("guestName").value;

  const attendance = document.querySelector(
    'input[name="attendance"]:checked',
  ).value;

  const guestsCount = Number(document.getElementById("guestsCount").value);

  const rsvpMessage = document.getElementById("rsvpMessage");

  try {
    const response = await fetch("http://localhost:3000/api/rsvp", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        attendance,
        guestsCount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    rsvpMessage.textContent = "تم تأكيد حضورك بنجاح ❤️";

    submitButton.textContent = "Attendance Confirmed ✓";

    rsvpForm.reset();
  } catch (error) {
    rsvpMessage.textContent = "حصل خطأ، حاول مرة أخرى.";

    console.error(error);
    submitButton.disabled = false;

    submitButton.textContent = "Confirm Attendance ❤️";
  }
});
const messageForm = document.getElementById("messageForm");

const messagesList = document.getElementById("messagesList");

const messageStatus = document.getElementById("messageStatus");

// Add new message
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = messageForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;

  submitButton.textContent = "Sending... ♡";

  const name = document.getElementById("messageName").value.trim();

  const message = document.getElementById("messageText").value.trim();

  try {
    const response = await fetch("http://localhost:3000/api/messages", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    messageStatus.textContent = "تم إرسال رسالتك ❤️";

    submitButton.textContent = "Sent With Love ✓";

    messageForm.reset();

    loadMessages();
  } catch (error) {
    messageStatus.textContent = "حصل خطأ، حاول مرة أخرى.";

    console.error(error);
    submitButton.disabled = false;

    submitButton.textContent = "Send Love ❤️";
  }
});

// Get all messages
async function loadMessages() {
  try {
    const response = await fetch("http://localhost:3000/api/messages");

    const messages = await response.json();

    messagesList.innerHTML = "";

    messages.forEach((item) => {
      const card = document.createElement("div");

      card.classList.add("message-card");

      const nameElement = document.createElement("h4");
      nameElement.textContent = item.name;

      const messageElement = document.createElement("p");
      messageElement.textContent = item.message;

      card.appendChild(nameElement);
      card.appendChild(messageElement);

      messagesList.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load messages:", error);
  }
}

// Load messages when page opens
loadMessages();

const openingScreen = document.getElementById("openingScreen");

const openInvitation = document.getElementById("openInvitation");

openInvitation.addEventListener("click", () => {
  openingScreen.classList.add("hide");
});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
