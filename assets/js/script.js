//Created on 02-10-2018 by T.J. Ogunleye

var access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'+
  '.eyJlbWFpbCI6ImRldkBnbG92b2FwcC5jb20iLCJpZCI6IjVhNTcyZGEyNTM4OWMzNzZ'+
  'iZWZlNjY1NCIsImlhdCI6MTUxNTY2MjgyMn0.a6homMOumqLBxwfX9nOwbBaxmSx-srkS8dISSPCPPYE';

$(document).ready(function(){
  
  //var g = Productsdata('BTX');
  //alert(JSON.parse(JSON.stringify(g[0].id)) );

  //var btxData = Productsdata('BTX'); //Store BTX Data
  //var bnbData = Productsdata('BNB'); //Store BNB Data
  //var bfxData = Productsdata('BFX'); //Store BFX Data
 
  getBTXProducts('BFX');
});

//Get data for all exchanges
function Productsdata(callback){

    var commonArr = [];

      var arg = ['BTX', 'BNB', 'BFX'];
      for(var a=0; a <= arg.length; a++){  
        var url = 'https://api.moneeda.com/api/exchanges/'+arg[a]+'/products';

        jQuery.ajax( {
          url:url,
          type: 'GET',
          //data: { content: 'testing test' },
          beforeSend : function( xhr ) {
              xhr.setRequestHeader( "Authorization", "BEARER " + access_token );
          },
          success: function( response ) {
            //return response;
            const res = response;
            const entries = Object.values(res);
            commonArr.push(entries);
            
            //callback(response);
          }
        } );
        //console.log(Productsdata(arg[a]) );        
     }
     console.log(commonArr);
     getCommonElements( commonArr);
 
}
Productsdata();
/*
Productsdata(function (res) {
  // now you can use arrNew
});*/

function getCommonElements(arrays){//Assumes that we are dealing with an array of arrays of integers
  console.log(arrays);
  var currentValues = {};
  var commonValues = {};
  for (var i = arrays[0].length; i >=0; i--){//Iterating backwards for efficiency
    currentValues[arrays[0][i]] = 1; //Doesn't really matter what we set it to
  }
  for (var i = arrays.length-1; i>0; i--){
    var currentArray = arrays[i];
    for (var j = currentArray.length-1; j >=0; j--){
      if (currentArray[j] in currentValues){
        commonValues[currentArray[j]] = 1; //Once again, the `1` doesn't matter
      }
    }
    currentValues = commonValues;
    commonValues = {};
  }
  return Object.keys(currentValues).map(function(value){
    return parseInt(value);
  });
}

var findCommonElements = function(arrs) {
  var resArr = [];
  for (var i = arrs[0][0].length - 1; i > 0; i--) {


      for (var j = arrs.length - 1; j > 0; j--) {
          if (arrs[j].indexOf(arrs[0][i]) == -1) {
              break;
          }
      }

      if (j === 0) {
          resArr.push(arrs[0][i]);
      }


  }
  return resArr;
}

function getBTXProducts(exch){
  var url = 'https://api.moneeda.com/api/exchanges/'+exch+'/products';

  jQuery.ajax( {
    url:url,
    type: 'GET',
    //data: { content: 'testing test' },
    beforeSend : function( xhr ) {
        xhr.setRequestHeader( "Authorization", "BEARER " + access_token );
    },
    success: function( response ) {
      // response
      //alert(response[0].id);    
      var options = '<option>Select Product</option>';

      for( var i = 0; i < response.length; i++ )
      { 
        var p = response[i];     
        options += '<option value="'+p.id+'">'+p.id+'</option>';
        document.getElementById("products").innerHTML = options;
          //o = data[i];
          //var li = document.createElement("li");
          //li.appendChild(document.createTextNode(o.title));
          //ul.appendChild(li);     
      } 

    }
  } );
}

function showPrice(exchange, product, priceP){
  
  
  var url = 'https://api.moneeda.com/api/exchanges/'+exchange+'/ticker?product='+product;

  jQuery.ajax( {
    url:url,
    type: 'GET',
    //data: { content: 'testing test' },
    beforeSend : function( xhr ) {
        xhr.setRequestHeader( "Authorization", "BEARER " + access_token );
    },
    success: function( response ) {
      var p = response['price']; 
      var pHi = response['high']; 
      var pLo = response['low']; 
      document.getElementById(priceP).innerHTML = 'Price: '+p;
      document.getElementById(priceP+'Hi').innerHTML = 'High: '+ pHi;
      document.getElementById(priceP+'Lo').innerHTML = 'Low: '+pLo;
    }
  } );
}


function setPrice(){
  var e = document.getElementById("products");
  var product = e.options[e.selectedIndex].value;
  showPrice('BTX', product, 'btxPrice');
  showPrice('BNB', product, 'bnbPrice');
  showPrice('BFX', product, 'bfxPrice');

}


