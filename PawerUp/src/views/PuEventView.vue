<template>
  <div class="home-wrapper">
    <section
      class="hero-section"
      style="
        background-image: url('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80');
      "
    >
      <div class="hero-text">
        <h1 class="hero-title">PawerUp Community Events</h1>
        <p class="hero-subtitle">
          Bringing warmth, paws, and smiles to Melbourne's youth — discover our therapy dog events
          near Monash University.
        </p>
      </div>
    </section>

    ```
    <section class="intro-section container text-center">
      <h2 class="section-heading">Our Mission</h2>
      <p>
        PawerUp connects therapy dogs, volunteers, and local communities to promote youth mental
        wellbeing. Join our friendly outdoor meetups, dog cafés, and mindfulness walks designed to
        bring comfort and connection.
      </p>
    </section>

    <section class="container py-5">
      <h2 class="section-heading text-center">Upcoming PawerUp Events Near You</h2>
      <div class="row g-4">
        <div v-for="spot in spots" :key="spot.name" class="col-lg-4 col-md-6 col-sm-12 d-flex">
          <div class="info-card w-100">
            <h3>{{ spot.name }}</h3>
            <p>{{ spot.description }}</p>
            <p>📍 {{ spot.address }}</p>
            <p>🕒 {{ spot.hours }}</p>
            <div class="d-flex gap-2 mt-3">
              <a
                :href="spot.moreUrl"
                target="_blank"
                class="cta-button"
                aria-label="Learn more about this park"
                >Learn More</a
              >
              <button class="cta-button join-btn">Join Event</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="cta-section text-center py-5"
      style="background-image: linear-gradient(135deg, #c9f4e5 0%, #b5dcff 100%)"
    >
      <h2 class="cta-title">Be Part of the PawerUp Movement</h2>
      <p class="cta-subtitle">
        Join our volunteers and therapy dogs to make a positive impact on youth wellbeing.
      </p>
      <button class="cta-button join-btn-large">Join Us Today</button>
    </section>
    ```
  </div>
</template>

<script setup>
const spots = [
  {
    name: 'Caulfield Park',
    address: 'Balaclava Rd, Caulfield North',
    hours: 'Open 24 hours',
    description: 'Large green spaces and lakeside paths, perfect for calm therapy dog walks.',
    moreUrl: 'https://www.google.com/maps/search/Caulfield+Park+Caulfield+North',
  },
  {
    name: 'Princes Park (Caulfield South)',
    address: 'Bambra Rd & North Rd, Caulfield South',
    hours: 'Open 24 hours',
    description: 'Shaded ovals and wide walking loops for mindful strolls.',
    moreUrl: 'https://www.google.com/maps/search/Princes+Park+Caulfield+South',
  },
  {
    name: 'Packer Park',
    address: 'Leila Rd, Carnegie',
    hours: 'Open 24 hours',
    description: 'Open fields and friendly community vibe for weekend meetups.',
    moreUrl: 'https://www.google.com/maps/search/Packer+Park+Carnegie',
  },
  {
    name: 'Duncan Mackinnon Reserve',
    address: 'North Rd, Murrumbeena',
    hours: 'Open 24 hours',
    description: 'Sports ovals and local gatherings, great for youth outreach walks.',
    moreUrl: 'https://www.google.com/maps/search/Duncan+Mackinnon+Reserve',
  },
  {
    name: 'Koornang Park',
    address: 'Munro Ave, Carnegie',
    hours: 'Open 24 hours',
    description: 'Peaceful park with open lawns for small therapy dog sessions.',
    moreUrl: 'https://www.google.com/maps/search/Koornang+Park+Carnegie',
  },
  {
    name: 'Boyd Park',
    address: 'Neerim Rd, Murrumbeena',
    hours: 'Open 24 hours',
    description: 'Linear park along old rail line, perfect for calm dog walks.',
    moreUrl: 'https://www.google.com/maps/search/Boyd+Park+Murrumbeena',
  },
  {
    name: 'Lord Reserve',
    address: 'Malane St, Carnegie',
    hours: 'Open 24 hours',
    description: 'Community ovals and relaxed green space for therapy sessions.',
    moreUrl: 'https://www.google.com/maps/search/Lord+Reserve+Carnegie',
  },
  {
    name: 'Jells Park',
    address: 'Waverley Rd, Wheelers Hill',
    hours: 'Open 24 hours',
    description: 'Beautiful lake and nature trails, PawerUp weekend hotspot.',
    moreUrl: 'https://www.google.com/maps/search/Jells+Park',
  },
  {
    name: 'Valley Reserve',
    address: 'Waimarie Dr, Mount Waverley',
    hours: 'Open 24 hours',
    description: 'Bushland trails and calm scenery ideal for reflective walks.',
    moreUrl: 'https://www.google.com/maps/search/Valley+Reserve+Mount+Waverley',
  },
  {
    name: 'Central Reserve',
    address: 'Springvale Rd & Waverley Rd, Glen Waverley',
    hours: 'Open 24 hours',
    description: 'Vibrant community space for group therapy activities.',
    moreUrl: 'https://www.google.com/maps/search/Central+Reserve+Glen+Waverley',
  },
  {
    name: 'Warrawee Park Oval',
    address: 'Drummond St, Oakleigh',
    hours: 'Open 24 hours',
    description: 'Central Oakleigh park for dog play and wellbeing meetups.',
    moreUrl: 'https://www.google.com/maps/search/Warrawee+Park+Oakleigh',
  },
  {
    name: 'Caloola Reserve',
    address: 'Beryl Ave, Oakleigh South',
    hours: 'Open 24 hours',
    description: 'Quiet neighbourhood reserve for small PawerUp groups.',
    moreUrl: 'https://www.google.com/maps/search/Caloola+Reserve+Oakleigh+South',
  },
  {
    name: 'Namatjira Park',
    address: 'Namatjira Ave, Clarinda',
    hours: 'Open 24 hours',
    description: 'Wetlands and open space, great for gentle therapy walks.',
    moreUrl: 'https://www.google.com/maps/search/Namatjira+Park+Clarinda',
  },
  {
    name: 'Bald Hill Park',
    address: 'Oak St, Clarinda',
    hours: 'Open 24 hours',
    description: 'Expansive open field with good shade for calm interactions.',
    moreUrl: 'https://www.google.com/maps/search/Bald+Hill+Park+Clarinda',
  },
  {
    name: 'Gardiners Creek Reserve (Ashwood)',
    address: 'High St Rd & Warrigal Rd, Ashwood',
    hours: 'Open 24 hours',
    description: 'Creek-side walking path and picnic areas for weekend bonding.',
    moreUrl: 'https://www.google.com/maps/search/Gardiners+Creek+Reserve+Ashwood',
  },
]
</script>

<style scoped>
.home-wrapper {
  width: 100%;
  font-family: 'Poppins', sans-serif;
  color: #212615;
  background-color: #ffffff;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-text {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 40px 20px;
  border-radius: 20px;
  max-width: 900px;
}

.hero-title {
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  font-weight: 900;
  color: #1f5b99;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.6;
}

.section-heading {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1f5b99;
  margin-top: 60px;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-button {
  background-color: #1f5b99;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 48px;
  min-height: 48px;
}

.cta-button:hover {
  background-color: #163f73;
}

.join-btn {
  background-color: #006b5c;
}

.join-btn:hover {
  background-color: #004d41;
}

.join-btn-large {
  background-color: #006b5c;
}

.join-btn-large:hover {
  background-color: #004d41;
}
</style>
