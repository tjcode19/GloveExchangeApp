//Created on 02-10-2018 by T.J. Ogunleye

$(document).ready(function(){
    var access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'+
    '.eyJlbWFpbCI6ImRldkBnbG92b2FwcC5jb20iLCJpZCI6IjVhNTcyZGEyNTM4OWMzNzZ'+
    'iZWZlNjY1NCIsImlhdCI6MTUxNTY2MjgyMn0.a6homMOumqLBxwfX9nOwbBaxmSx-srkS8dISSPCPPYE';
  
    //Get data for all exchanges
    function Productsdata(exchange){
      var url = 'https://api.moneeda.com/api/exchanges/'+exchange+'/products';
  
      jQuery.ajax( {
        url:url,
        type: 'GET',
        //data: { content: 'testing test' },
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( "Authorization", "BEARER " + access_token );
        },
        success: function( response ) {return response;}
      } );
  
    }
    //var btxData = Productsdata('BTX'); //Store BTX Data
    //var bnbData = Productsdata('BNB'); //Store BNB Data
    //var bfxData = Productsdata('BFX'); //Store BFX Data
    
    /*function findCommonProps(obj1, obj2, obj3) {
      
      var map1 = {}, map2 = {}, map3 = {};
      var commonProps = [];
      
      function isArray(item) {
          return Object.prototype.toString.call(item) === "[object Array]";
      }
  
      function getProps(item, map) {
        alert(item);
          if (typeof item === "object") {
              if (isArray(item)) {
                alert("hello")
                  // iterate through all array elements
                  for (var i = 0; i < item.length; i++) {
                      getProps(item[i], map);
                  }
              } else {
                alert("hey")
                  for (var prop in item) {
                      map[prop] = true;
                      // recursively get any nested props
                      // if this turns out to be an object or array
                      getProps(item[prop], map);
                  }
              }
          }
      }
  
      // get all properties in obj1 into a map
      getProps(obj1, map1);
      getProps(obj2, map2);
      getProps(obj3, map3);
      for (var prop in map1) {
          if (prop in map2) {
            if(prop in map3){
              commonProps.push(prop);
            }            
          }
      }
      return commonProps;
    }*/
  
  function findCommon() {
    var obj = {};
    var out = [];
    var result = [];
  
    // convert arguments to a proper array
    var args = [].slice.call(arguments);
    var len = args.length;
    for (var i = 0, l = len; i < l; i++) {
      var unique = args[i].filter(function(item, pos) {
        return args[i].indexOf(item) == pos;
      });
      result = result.concat(unique);
    }
    for (var i = 0, l = result.length; i < l; i++) {
        var el = result[i];
  
        // if the object key doesn't exist, create an array
        // as the value; add the number to the array
        if (!obj[el]) obj[el] = [];
        obj[el].push(el);
    }
    for (var p in obj) {
  
     // if the array length equals the original length of
     // the number of arrays added to the function
     // add it to the output array, as an integer
     if (obj[p].length === len) out.push(+p);
    }
    return out;
  }
  
  var x = findCommon(JSON.stringify(Productsdata('BTX')),
  JSON.stringify(Productsdata('BNB')), 
  JSON.stringify(Productsdata('BFX'))); // [2]
  alert(x)
  
   /* function getBTXProducts(exch){
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
          var res = findCommonProps(btxData, bnbData, bfxData);
          var options = '<option>Select Product</option>';
  
          for( var i = 0; i < res.length; i++ )
          { 
            var p = res[i];     
            options += '<option value="'+p.id+'">'+p.id+'</option>';
            document.getElementById("products").innerHTML = options;
              //o = data[i];
              //var li = document.createElement("li");
              //li.appendChild(document.createTextNode(o.title));
              //ul.appendChild(li);     
          } 
  
        }
      } );*/
  
      /*var res = JSON.stringify(findCommon(btxData, bnbData, bfxData));
      alert(res);
          var options = '<option>Select Product</option>';
  
          for( var i = 0; i < res.length; i++ )
          { 
            var p = res[i];   
            
            options += '<option value="'+p.id+'">'+p.id+'</option>';
            document.getElementById("products").innerHTML = options;
              //o = data[i];
              //var li = document.createElement("li");
              //li.appendChild(document.createTextNode(o.title));
              //ul.appendChild(li);     
          } */
  
   // }
    //findCommonProps(btxData, bnbData, bfxData);
  
    //getBTXProducts('BTX');
  
  
  });
  
  