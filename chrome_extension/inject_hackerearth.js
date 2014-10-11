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
	//alert("got this "+ct);  
      ct=decodeURIComponent(ct);
	  tx.value=ct;
      write(ct);	 
 });

 function write(ct)
{
    
var sc=document.createElement("script");
var cont="try{var ele=document.getElementById('bc_ye_id_use_mat_karna_koi'); editor_global.setValue(ele.value); } catch(e){alert('load code editor and try again:'+e);} document.getElementById('dryrun-button').click();";
console.log(cont);
sc.innerText=cont;
document.body.appendChild(sc);
}
//document.onclick=function(){
//editor_global.setValue("ok here is my own injected code") 
//}
