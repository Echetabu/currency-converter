$("#convert,#rate,#cur,#pconvert").submit(function(e) {
  e.preventDefault();
});
// $(document).ready(function() {
//   $('.js-example-basic-single').select2();
// });

function convert(e) {
  var amount = e.target[0].value;
  var from = e.target[1].value;
  var to = e.target[2].value;
  var amountId = e.target[0].id; 
  console.log(e.target[0].id);
  if (amount !== "") {
    from = from.trim().toUpperCase();
    to = to.trim().toUpperCase();
    amount = parseInt(amount);

    var obj = {
      amount: amount,
      to: to,
      from: from,
      key: "aa"
    };
    // fd.append('dpImg',pic.files[0],pic.files[0].name);
    // fd.append('details',obj);
    postData("./api/Api.php", obj)
      .then(handleHttpErrors)
      .then(function(data) {
        dData = data;
        console.log(dData);
        var countryId = dData.message[1].id;
        var currencyId = dData.message[1].currencyId;
        var symbol = dData.message[1].currencySymbol;
        // document.getElementById('result').value = parseFloat( dData.message[0]).toLocaleString('en-'+countryId,{style:'currency',currency:currencyId ,maximumSignificantDigits: 4});
        amountId === 'amount' ? document.getElementById('result').value =symbol +' '+ parseFloat( dData.message[0]).toLocaleString('en-US'): document.getElementById('presult').value =symbol +' '+ parseFloat( dData.message[0]).toLocaleString('en-US');
      })
      .catch(function(error) {
        console.log(error);
        if (typeof error !== "undefined") {
          errorT("Error connecting to Network");
        }

       
      });

   
  }
}

function rate(e) {
  var amount = '1';
  var from = 'USD';
  var to = document.getElementById('ex').value;
  console.log(to);
  if (amount !== "") {
    from = from.trim().toUpperCase();
    to = to.trim().toUpperCase();
    amount = parseInt(amount);

    var obj = {
      amount: amount,
      to: to,
      from: from,
      key: "aa"
    };
   
    postData("./api/Api.php", obj)
      .then(handleHttpErrors)
      .then(function(data) {
        dData = data;
        console.log(dData);
        var countryId = dData.message[1].id;
        var currencyId = dData.message[1].currencyId;
        var symbol = dData.message[1].currencySymbol;
        // document.getElementById('result').value = parseFloat( dData.message[0]).toLocaleString('en-'+countryId,{style:'currency',currency:currencyId ,maximumSignificantDigits: 4});
        document.getElementById('exresult').value =symbol +' '+ parseFloat( dData.message[0]).toLocaleString('en-US');
      })
      .catch(function(error) {
        console.log(error);
        if (typeof error !== "undefined") {
          errorT("Error connecting to Network");
        }

       
      });

   
  }
}

function getCountry(e) {
  var cur = e.target[0].value;
  var obj = {
    cur : cur,
    key: "ad"
  };
  postData("./api/Api.php", obj)
    .then(handleHttpErrors)
    .then(function(data) {
      var dData = data.message;
      console.log(dData[0]);
      // document.getElementById('ccountry').value =dData[0].name;
      document.getElementById('cname').value =dData[0].currencyName;
      document.getElementById('ccode').value =dData[0].currencyId;
      document.getElementById('csymbol').value =dData[0].currencySymbol;
      // var pusharr = [];
      // for(var i = 0;i< dData.length;i+=1){  
      
      // }
     
     
 
    })
    .catch(function(error) {
      console.log(error);
      if (typeof error !== "undefined") {
        console.error("error connecting to network");
      }

      // err = true;
    });
}

function getCountries() {

  var africa =[];
  var obj = {
    key: "ab"
  };



  var arrrr = ["DZ","AO","BJ","BW","IO","BF","BI","CM","CV","CF","TD","KM","CG","CD","DJ","EG","GQ","ER","ET","TF","GA","GM","GH","GN","GW","CI","KE","LS","LR","LY","MG","MW","ML","MR","MU","YT","MA","MZ","NA","NE","NG","RE","RW","SH","ST","SN","SC","SL","SO","ZA","SS", "SD","SZ","TZ","TG","TN","UG","EH","ZM","ZW"];
  postData("./api/Api.php", obj)
    .then(handleHttpErrors)
    .then(function(data) {
      var dData = data.message[0].results;
      for (var keys in dData) {
        if (dData.hasOwnProperty(keys)) {
          if(inArray(dData[keys].id,arrrr)){
            africa.push(dData[keys]);
           
            // var opt = document.createElement("option");
            // opt.value = dData[keys].currencyId;
            // var c = dData[keys].name + " "+dData[keys].currencyName;
            // var content = document.createTextNode(c);
            // opt.appendChild(content);
            // document.getElementById("from").appendChild(opt);
       //     document.getElementById("to").appendChild(opt);
          
          }
         
        }
      }
      
    africa =  africa.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    console.log(africa);
    for (var i = 0; i < africa.length; i++) {
     // var element = africa[i].currencyName;
       var opt = document.createElement("option");
            opt.value =  africa[i].currencyId;
            var c =  africa[i].name + " "+ africa[i].currencyName;
            var content = document.createTextNode(c);
            opt.appendChild(content);
            document.getElementById("from").appendChild(opt.cloneNode(true));
            document.getElementById("to").appendChild(opt.cloneNode(true));
            document.getElementById("pfrom").appendChild(opt.cloneNode(true));
            document.getElementById("pto").appendChild(opt.cloneNode(true));
            document.getElementById("ex").appendChild(opt.cloneNode(true));
            document.getElementById("curr").appendChild(opt.cloneNode(true));
      
    }

  
      //   var result = dData.message.map(obj => {
      //     return Object.keys(obj.results).reduce((arr, k) => {
      //       let res = Object.keys(obj.results[k]).reduce(
      //         (r, k1) => {
      //           r["size"] = k;
      //           r.shapes.push({ name: k1, value: obj.results[k][k1] });
      //           r.total += obj.results[k][k1];
      //           return r;
      //         },
      //         { shapes: [], total: 0 }
      //       );
      //       arr.push(res);
      //       return arr;
      //     }, []);
      //   });

      //   //  console.log(result[0]);
      //  // var arshapes = [];
      //   var arrr = result[0];
      //   for (var i = 0; i < arrr.length; i += 1) {
      //    var arshapes = arrr[i].shapes;
      //    for (var j = 0; j < arshapes.length; j += 1) {
      //      if(arshapes[j].name === 'name'){
      //         console.log(arshapes[j].value);
      //      }
      //      if(arshapes[j].name === 'id'){
      //       console.log(arshapes[j].value);
      //    }
      //     }

      //   }

      // for (var j = 0; j < arshapes.length; i += 1) {
      //   console.log(arshapes[i]);
      // }

      // console.log(dData.message);
    })
    .catch(function(error) {
      console.log(error);
      if (typeof error !== "undefined") {
        console.error("error connecting to network");
      }

      // err = true;
    });
}

//used to return african countries
function getCountries2() {
  var obj = {
    key: "ac"
  };
  postData("./api/Api.php", obj)
    .then(handleHttpErrors)
    .then(function(data) {
      var dData = data.message[0];
      var pusharr = [];
      for (var keys in dData) {
   
      pusharr.push(dData[keys].alpha2Code);
          // console.log( dData[keys].id );
        
      }
     
  console.log(pusharr);
 // return pusharr;
    })
    .catch(function(error) {
      console.log(error);
      if (typeof error !== "undefined") {
        console.error("error connecting to network");
      }

      // err = true;
    });
}

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    // "Content-Type": "text/html"
    "Content-Type": "application/json",
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
}

function handleHttpErrors(response) {
  if (!response.ok) {
    if (response.status != 401) {
      throw Error(response.statusText);
    }
    // return response.status;
    //  throw Error(response.status);
  }
  return response.json();
}



// checks if nput is in  array
var inArray = function(needle, haystack) {
  var length = haystack.length;
  for (var i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
};
