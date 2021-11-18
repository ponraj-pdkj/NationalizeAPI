
function main() {
    // create a input element
    const inputElement = document.createElement('input');
    document.body.appendChild(inputElement);

    // select the input element
    const input = document.querySelector('input');

    // create a event listener based on the input change
    input.addEventListener('input', async (event) => {
        // get the  input value
        let value = event.target.value;

        // get the nationalize api response
        let apiResponse = await getAllData(value);

        // iterate the response of the country 
        apiResponse.forEach((element, index) => {
            // create element only for the top 2 country
            if (index <= 1) {
                createCountryElement(element.country_id, element.probability)
            }
        });

    });
}

// create a element to display the country
function createCountryElement(country, value) {
    const divElement = document.createElement('p');
    const text = document.createTextNode(`${country} ${value}`);
    divElement.appendChild(text);
    document.body.appendChild(divElement);
}

// fetch the nationalize data
async function getAllData(input) {
    try {
        var data = await fetch(`https://api.nationalize.io?name=${input}`);
        var dataobj = await data.json();
        return dataobj.country;
    } catch (error) {
        console.log(error)
    }
}

main();
