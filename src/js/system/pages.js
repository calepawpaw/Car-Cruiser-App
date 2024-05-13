import { supabase } from "../main";

//Load Data
async function fetchCarDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .single();

      if (error) {
        throw error;
      }

      // Render car details to HTML
      renderCarDetails(data);
    } catch (error) {
      console.error('Error fetching car details:', error.message);
    }
  }

//   <h1>${car.seat} ${car.model}</h1>
//       <p>Year: ${car.type}</p>
//       <p>Color: ${car.power}</p>
//       <!-- Add more details as needed -->

  // Function to render car details to HTML
  function renderCarDetails(car) {
    const carDetailsContainer = document.getElementById('carDetails');
    carDetailsContainer.innerHTML = `
    <div class="container d-flex justify-content-center align-items-center">
    <div class="card text-center" style="width: 20rem;">

      <div class="card-body">
        <div class="card-title">
          <h4 class="fw-bold">Details:</h4>
        </div>
        <div class="card-text">
          <i class="fa-solid fa-car" style="color: black"></i>
          <span class="fs-6 fw-bold text">Type: ${car.type}</span>
        </div>

        <div class="card-text">
          <i class="fa-solid fa-car" style="color: black"></i>
          <span class="fs-6 fw-bold text">Model: ${car.model}</span>
        </div>

        <div class="card-text">
          <i class="fa-solid fa-bolt-lightning" style="color: black"></i>
          <span class="fs-6 fw-bold text">Power: ${car.power}</span>
        </div>

        <div class="card-text">
          <i class="fa-solid fa-user-group" style="color: black"></i>
          <span class="fs-6 fw-bold text">Seats: ${car.seat}</span>
        </div>

        <div class="card-text">
          <i class="fa-solid fa-gas-pump" style="color: black"></i>
          <span class="fs-6 fw-bold text">Fuel: ${car.fuel}</span>
        </div>

        <div class="card-text">
          <i class="fa-solid fa-gears"></i>
          <span class="fs-6 fw-bold text">Transmission: ${car.transmission}</span>
        </div>

        <div class="card-text">
          <i class="fa-solid fa-peso-sign" style="color: black"></i>
          <span class="fs-6 fw-bold text">Price(/day): ${car.price}</span>
        </div>
        
          <div class="col text-center m-2">
            <a class="btn btn-secondary" href="rent.html" role="button"
              >Rent Now</a
            >
          </div>
      
      </div>
    </div>
  </div>
    `;
  }

  // Fetch and display car details when the page loads
  fetchCarDetails();