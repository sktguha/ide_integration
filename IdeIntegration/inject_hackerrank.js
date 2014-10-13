var tid="bc_ye_id_use_mat_karna_koi";
//console.log("content script injected");
var tx=document.getElementById(tid);
if( !tx)
{
tx=document.createElement("input");
tx.setAttribute("type","hidden");
tx.setAttribute("id",tid);
document.body.appendChild(tx);
}

chrome.runtime.onMessage.addListener(
  function(ct, sender, sendResponse) {
       //console.log("ye mila \n"+ct);  
        try{
		 //ct=decodeURIComponent(ct);
		 tx.value=ct;
		 write(ct);
	     //codeEditor.doc.setValue(ct);
	     }catch(e)
	    {
	    alert("error. load code editor and try again. error: "+e);
	     }
	});

 function write(ct)
{
    
var sc=document.createElement("script");
var cont="try{var ele=document.getElementById('bc_ye_id_use_mat_karna_koi'); codeEditor.doc.setValue(ele.value); } catch(e){alert('load code editor and try again:'+e);}";
console.log(cont);
sc.innerText=cont;
document.body.appendChild(sc);
}
