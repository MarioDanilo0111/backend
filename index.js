

async function renderObjects(){
    let apiUrl = "http://localhost:1337";
    // let stringImage = await fetch(apiUrl);
    // let imageObj = await stringImage.json();
    // console.log(apiUrl);
    let urlLocalhost = "http://localhost:1337/api/Laptops?populate=";
    // Url för bild
    let laptopImgUrl = "/uploads/medium_lenovo_thinkpad_e14_gen2_14_barbar_dator_i58256_gb_svart_pdp_zoom_3000_pdp_main_960_cd1cf28765.webp";
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    // console.log(myobject);
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            let attr = element.attributes;

            output += `
                <div class="grid-item">
                    <div class="laptop-image">
                        <img src="${apiUrl + laptopImgUrl}"></img>
                    </div>
                    <div class="item-info">
                        <div class="item-title">${attr.Title}</div>
                        <div>Price: ${attr.Price}</div>
                        <div>Qty: ${attr.Qty}</div>
                    </div>
                    
                </div>
                
            `;
            
        });
    }else{
        // Om det bara är ett objekt
        let object = myobject.data.attributes;
       
         output += `<div class="title"> Title: ${object.Title}</div>`;
         output += `<div> Description: ${object.Description}</div>`;
         output += `<div> Price: ${object.Price}</div>`;
         output += `<div> In stock: ${object.Qty}</div>`;
    }
     document.getElementById("output").innerHTML = output;
     document.getElementById("outputPrice").innerHTML = outputPrice;
}

renderObjects();