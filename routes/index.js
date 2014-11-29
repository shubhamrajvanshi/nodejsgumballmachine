/*
 * GET home page.
 */
	
 var nodeclient = require('node-rest-client').Client;
 var client = new nodeclient();
 //var client = require("app").Client;

exports.index = function(req, res){
	
	// direct way
	client.get("http://shubhamrajvanshi.cfapps.io/gumballs.json", function(data, response){
	           
	            var ar={};
	           var state = "NoCoinState";
	            console.log(data);
	            ar=data;
	            
	            console.log(typeof ar);
	            console.log(ar[0].id);
	            
	            var messages = new Array();
	           // messagesToBePut.push(message);
	           // messagesToBePut.push("NoCoinState");	
	            messages.push(ar[0].modelNumber);
	            messages.push(ar[0].serialNumber);
	            messages.push(state);
	            messages.push(ar[0].countGumballs);
	            
	           
	            res.render('index', { message: messages });
	            
	        });
	
	
};

exports.GumballAction=function(req,res){
	
	var event=req.param('event');
	var state=req.param('state');
	var count=req.param('count');
	var modelNumber=req.param('modelNumber');
	var serialNumber=req.param('serialNumber');
	//console.log(state);
	//console.log(modelNumber);
	
	if(event==='InsertQuarter' && state==='NoCoinState'){
		
		state='HasACoin';
		var messagesToBePut= new Array();
		
		messagesToBePut.push(modelNumber);
		messagesToBePut.push(serialNumber);
		messagesToBePut.push(state);
		messagesToBePut.push(count);
		res.render('index', { message: messagesToBePut });
		
	}
	if(event==='TurnTheCrank' && state==='NoCoinState' ){
		var messagesToBePut= new Array();
		messagesToBePut.push(modelNumber);
		messagesToBePut.push(serialNumber);
		messagesToBePut.push(state);
		messagesToBePut.push(count);
		messagesToBePut.push("Please insert a coin");
		res.render('index', { message: messagesToBePut });
	}
	
	if(event==='InsertQuarter' && state==='HasACoin' ){
		var messagesToBePut= new Array();
		messagesToBePut.push(modelNumber);
		messagesToBePut.push(serialNumber);
		messagesToBePut.push(state);
		messagesToBePut.push(count);
		messagesToBePut.push("Please turn the crank first");
		res.render('index', { message: messagesToBePut });
	}
	 
	
	if(event==='TurnTheCrank' && state==='HasACoin'){
		var messagesToBePutInPost=[];
	//	var Client = require('node-rest-client').Client;
	//	var client = new Client();
		client.get("http://shubhamrajvanshi.cfapps.io/gumballs.json", function(data, response){
			var ar={};
            
            ar=data;
            
            var count=ar[0].countGumballs;
            
            if(count!==0){
            	count=count-1;
            	var args = {
            			  data: { countGumballs: count },
            			  headers:{"Content-Type": "application/json"} 
            			};
            	client.put("http://shubhamrajvanshi.cfapps.io/gumballs/1", args, function(data,response) {
            	      // parsed response body as js object
            	    console.log(data);
            	    // raw response
            	   // console.log(response);
            	    state='NoCoinState';
            	    messagesToBePutInPost.push(modelNumber);
            	    messagesToBePutInPost.push(serialNumber);
            	    messagesToBePutInPost.push(state);
            	    messagesToBePutInPost.push(count);
            		res.render('index', { message: messagesToBePutInPost });
            		
            	});
            	
            }
            //;
			
		});
		
		 
	}
	
	
};