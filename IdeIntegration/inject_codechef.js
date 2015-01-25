chrome.runtime.onMessage.addListener(
  function(ct, sender, sendResponse) {
       console.log("ye mila \n"+ct);  
       document.getElementById("textarea").value="";
      document.getElementById("textarea").value=ct;
	 
 });

function codechef() 
 {
 //alert("i am here "+document.getElementById("textarea").value);
 try{
 document.body.addEventListener( "DOMContentLoaded", codechefsave(), false );
 document.body.addEventListener( "DOMContentLoaded", codechefget(), false );
}catch(e){}
 
 }
 
 function codechefget()
 {
     chrome.storage.sync.get(key, function(value) {
 if(value.toString().length<=0)
 return;
 console.log(value);
 if(window.confirm("found a saved session for this problem.should i fill your code editor with this content:\n"+value))
 {
 document.getElementById("textarea").value=value;
 }
 });
  
 
     
 }
 
 function codechefsave() //codechef snapshoter
 {
 //try to get any data for this url
 console.log(document.title);
 var key=location.protocol + '//' + location.host + location.pathname;
 
 alert("attach");
     //attach an onchange handler to editor
 document.getElementById("textarea").addEventListener("input paste propertychange",function(){
  var key=location.protocol + '//' + location.host + location.pathname;
  var val=document.getElementById("textarea").value;
  console.log("change textarea");
  chrome.storage.sync.set({key: val}, function() {
          // Notify that we saved.
      console.log("change");    
      var tb=document.getElementById("toolbar_1");
		  var sv=document.createElement("a"); sv.innerText="saved";
		  tb.appendChild(nt); setTimeout(function(){tb.removeChild(nt);},2000);
        })
    }
   );
 
 }
 
