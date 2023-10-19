import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const Google_Maps_Key = "";

declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to Google API!
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${Google_Maps_Key}`
    )
    .then((resp) => {
      console.log(resp);
      if (resp.data.status !== "OK")
        throw new Error("Could not fetch location.");
      const coordinates = resp.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map")! as HTMLDivElement,
        {
          center: coordinates,
          zoom: 12,
        }
      );

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((error) => alert(error.message));
}

form.addEventListener("submit", searchAddressHandler);
