

async function renderObjects(){
    let apiUrl = "http://localhost:1337";
    // let stringImage = await fetch(apiUrl);
    // let imageObj = await stringImage.json();
    // console.log(apiUrl);
    let urlLocalhost = "http://localhost:1337/api/Laptops?populate=*";
    let stringResponse = await fetch (urlLocalhost);
    let myobject = await stringResponse.json();
    let output = '';
    // console.log(myobject);
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
        myobject.data.forEach(element => {
            let attr = element.attributes;
            
            // for(x in attr){
            //     console.log(x + ": " + attr[x])
            // }
            
            
            output += `
                <div class="grid-item">
                    <div>Title: ${attr.Title}</div>
                    <div>Price: ${attr.Price}</div>
                    <div >In stock: ${attr.Qty}</div>
                </div>
            `;
        });
    }else{
        let object = myobject.data.attributes;
        // for(x in object){
        //     console.log(x + ": " + object[x])
        // }
         output += `<div class="title"> Title: ${object.Title}</div>`;
         output += `<div> Description: ${object.Description}</div>`;
         output += `<div> Price: ${object.Price}</div>`;
         output += `<div> In stock: ${object.Qty}</div>`;
    }
     document.getElementById("output").innerHTML = output;
}

renderObjects();