//Funktion för att hämta data från strapi CMS
async function getDataFromStrapi(){
    let url = "http://localhost:1337/api/products";

    let stringResponse = await fetch(url);
    let myobject = await stringResponse.json();
    // let myobject = await fetch(url).json();
    console.log(myobject);
    let output =""
    //Kolla om data är en array
    if(Array.isArray(myobject.data)){
    //Skapar en foreachloop för varje element i data-array
    myobject.data.forEach(element => {
        let attr = element.attributes;

        for (x in attr){
            console.log(x + ":" + attr[x])
        }
        
        output += `<div>Title: ${attr.Title}</div>`;
    });
    }else{
        let object = myobject.data.attributes;
        for(x in object){
            console.log(x + ": " + object[x])
        }
        output += `<div> Title: ${object.Title}`;
    }
    document.getElementById("fetched").innerHTML = output;
}

async function getToken(){
    // Göra ett inloggningsförsök för att skapa en token
    // Sammla data och skapaett objekt av dessa
    // Skicka iväg json till API

    //URL till strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local";
    

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    let userObject ={
        identifier: user,
        password: pass
    }
    // Anropar API med inloggningsdata
    let userResponse = await fetch (urlUser,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        });

        let userJson = await userResponse.json();
        console.log(userJson);
        if(userJson.jwt) postData(userJson.jwt);

        };

        async function postData(token){
            //URL till Strapi product collection.
            const urlProducts = "http://localhost:1337/api/products";
            //Hämtar data från fält
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const price = document.getElementById("price").value;
            const qty = document.getElementById("qty").value;
             //Skapa ett objekt med data inkluderat.
            let productObject = {
                data : {
                    Title: title,
                    Description: description,
                    Price: price,
                    Qty: qty
                }
            }
            //Anropar API med productObjekt
        let productResponse = await fetch (urlProducts,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
            },
            body: JSON.stringify(productObject)
        });

        let productJson = await productResponse.json();

        console.log(productJson);

        // // Ta ut Token objekt
        // const userToken = userJson.jwt;
}
// getDataFromStrapi();