// the create-event-script.js has a similar script idea as  post-script.js

// helper function that loads events from localStorage
function loadEvents() {
  const data = localStorage.getItem("events");
  if (data) {
    return JSON.parse(data);
  } else {
    return [
        {
          id: 'sample1',
          title: 'Great Falls Park Meetup',
          date: '2025-05-20',
          time: '8:30',
          address: '10801 Macarthur Blvd, Potomac, MD 20854, USA',
          description: 'Join us for a fun dog-walk at Great Falls Park! Hosted by Canine Humane Network.',
          tag: 'Meetup'
        },
        {
          id: 'sample2',
          title: 'Basic Obedience Training',
          date: '2025-06-22',
          time: '15:00',
          address: '12221 Parklawn Dr, Rockville, MD 20852, USA',
          description: 'Help your dog learn basic obedience skills.',
          tag: 'Training'
        },
        {
          id: 'sample3',
          title: 'Dog Rescue Fundraiser',
          date: '2025-06-25',
          time: '18:00',
          address: '10400 Old Georgetown Rd, Bethesda, MD 20814, USA',
          description: 'Support local dog rescues by attending this fundraiser event hosted by CHARM Rescue.',
          tag: 'Fundraiser'
        }
      ];
  }
}

// helper function that saves events to localStorage
function saveEvents(events) {
  localStorage.setItem("events", JSON.stringify(events));
}

// setting up the form submission
// read in the information from the form and store it 
function setupCreateForm() {
  const form = document.getElementById('newForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form.title.value.trim();
    const date = form.date.value;
    const time = form.time.value;
    const street = form.querySelector('#street').value.trim();
    const city = form.querySelector('#city').value.trim();
    const state = form.querySelector('#state').value.trim();
    const zip = form.querySelector('#zip').value.trim();
    const country = form.querySelector('#country').value.trim();
    const description = form.description.value.trim();
    const tag = form.tag.value;

    if (!title || !date || !time || !street || !city || !state || !zip || !country || !description || !tag) {
        alert('Please fill out all fields.');
        return;
    }

    const fullAddress = `${street}, ${city}, ${state} ${zip}, ${country}`;
    const events = loadEvents();

    const newEvent = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        title,
        date,
        time,
        address: fullAddress,
        description,
        tag
    };

    events.push(newEvent);
    saveEvents(events);

    // after saving the new event that was submitted, the user is redirected back to
    // the events page
    window.location.href = 'events.html';
  });
}

// detect page and run appropriate setup
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.endsWith('events.html')) {
    renderEventsPage();  
  } else if (path.endsWith('create-event.html')) {
    setupCreateForm();
  }
});
