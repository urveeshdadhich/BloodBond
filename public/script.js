// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector("i")

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  }

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark")

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark")
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
    } else {
      localStorage.setItem("theme", "light")
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
    }
  })

  // Donate Form Submission
  const donateForm = document.getElementById("donateForm")
  if (donateForm) {
    donateForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real application, you would send this data to a server
      const formData = new FormData(donateForm)
      const donorData = {
        name: formData.get("name"),
        bloodGroup: formData.get("bloodGroup"),
        age: formData.get("age"),
        location: formData.get("location"),
        phone: formData.get("phone"),
        email: formData.get("email"),
      }

      // Store in localStorage for demo purposes
      const donors = JSON.parse(localStorage.getItem("donors")) || []
      donors.push(donorData)
      localStorage.setItem("donors", JSON.stringify(donors))

      // Show success modal
      const modal = document.getElementById("successModal")
      if (modal) {
        modal.style.display = "flex"
      }

      // Reset form
      donateForm.reset()
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real application, you would send this data to a server
      // Show success modal
      const modal = document.getElementById("messageModal")
      if (modal) {
        modal.style.display = "flex"
      }

      // Reset form
      contactForm.reset()
    })
  }

  // Close Modal
  const closeButtons = document.querySelectorAll(".close, .modal-btn")
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal")
      modals.forEach((modal) => {
        modal.style.display = "none"
      })
    })
  })

  // Search Donors
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const bloodGroup = document.getElementById("searchBloodGroup").value
      const location = document.getElementById("searchLocation").value.toLowerCase()

      // Get donors from localStorage
      const donors = JSON.parse(localStorage.getItem("donors")) || []

      // Filter donors based on search criteria
      let filteredDonors = donors

      if (bloodGroup) {
        filteredDonors = filteredDonors.filter((donor) => donor.bloodGroup === bloodGroup)
      }

      if (location) {
        filteredDonors = filteredDonors.filter((donor) => donor.location.toLowerCase().includes(location))
      }

      // Display results
      displaySearchResults(filteredDonors)
    })
  }

  // Display Search Results
  function displaySearchResults(donors) {
    const resultsContainer = document.getElementById("resultsContainer")
    if (!resultsContainer) return

    resultsContainer.innerHTML = ""

    if (donors.length === 0) {
      resultsContainer.innerHTML =
        "<p>No donors found matching your criteria. Please try different search parameters.</p>"
      return
    }

    donors.forEach((donor) => {
      const donorCard = document.createElement("div")
      donorCard.className = "glass-card donor-card"

      donorCard.innerHTML = `
        <span class="donor-blood-type">${donor.bloodGroup}</span>
        <h3>${donor.name}</h3>
        <div class="donor-info">
          <p><strong>Location:</strong> ${donor.location}</p>
          <p><strong>Age:</strong> ${donor.age}</p>
        </div>
        <a href="tel:${donor.phone}" class="btn btn-primary">Contact Donor</a>
      `

      resultsContainer.appendChild(donorCard)
    })
  }

  // Blood Compatibility Checker
  const bloodTypeSelector = document.getElementById("bloodTypeSelector")
  if (bloodTypeSelector) {
    bloodTypeSelector.addEventListener("change", function () {
      const selectedBloodType = this.value
      if (!selectedBloodType) return

      const compatibilityResults = document.getElementById("compatibilityResults")
      const canReceiveFrom = document.getElementById("canReceiveFrom")
      const canDonateTo = document.getElementById("canDonateTo")

      if (compatibilityResults && canReceiveFrom && canDonateTo) {
        // Clear previous results
        canReceiveFrom.innerHTML = ""
        canDonateTo.innerHTML = ""

        // Define compatibility data
        const compatibility = {
          "A+": {
            canReceiveFrom: ["A+", "A-", "O+", "O-"],
            canDonateTo: ["A+", "AB+"],
          },
          "A-": {
            canReceiveFrom: ["A-", "O-"],
            canDonateTo: ["A+", "A-", "AB+", "AB-"],
          },
          "B+": {
            canReceiveFrom: ["B+", "B-", "O+", "O-"],
            canDonateTo: ["B+", "AB+"],
          },
          "B-": {
            canReceiveFrom: ["B-", "O-"],
            canDonateTo: ["B+", "B-", "AB+", "AB-"],
          },
          "AB+": {
            canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
            canDonateTo: ["AB+"],
          },
          "AB-": {
            canReceiveFrom: ["A-", "B-", "AB-", "O-"],
            canDonateTo: ["AB+", "AB-"],
          },
          "O+": {
            canReceiveFrom: ["O+", "O-"],
            canDonateTo: ["A+", "B+", "AB+", "O+"],
          },
          "O-": {
            canReceiveFrom: ["O-"],
            canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          },
        }

        // Display compatibility results
        compatibility[selectedBloodType].canReceiveFrom.forEach((type) => {
          const span = document.createElement("span")
          span.textContent = type
          canReceiveFrom.appendChild(span)
        })

        compatibility[selectedBloodType].canDonateTo.forEach((type) => {
          const span = document.createElement("span")
          span.textContent = type
          canDonateTo.appendChild(span)
        })

        // Show results
        compatibilityResults.style.display = "block"
      }
    })
  }

  // Add sample donors for demo purposes
  if (!localStorage.getItem("donors")) {
    const sampleDonors = [
      {
        name: "John Smith",
        bloodGroup: "O+",
        age: "28",
        location: "New York, NY",
        phone: "555-123-4567",
        email: "john@example.com",
      },
      {
        name: "Sarah Johnson",
        bloodGroup: "A-",
        age: "35",
        location: "Los Angeles, CA",
        phone: "555-987-6543",
        email: "sarah@example.com",
      },
      {
        name: "Michael Brown",
        bloodGroup: "B+",
        age: "42",
        location: "Chicago, IL",
        phone: "555-456-7890",
        email: "michael@example.com",
      },
      {
        name: "Emily Davis",
        bloodGroup: "AB+",
        age: "31",
        location: "Houston, TX",
        phone: "555-789-0123",
        email: "emily@example.com",
      },
      {
        name: "David Wilson",
        bloodGroup: "O-",
        age: "26",
        location: "Miami, FL",
        phone: "555-321-6547",
        email: "david@example.com",
      },
    ]

    localStorage.setItem("donors", JSON.stringify(sampleDonors))
  }
})

