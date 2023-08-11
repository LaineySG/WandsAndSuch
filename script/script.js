function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}



function rd6(num, min, max) {
    let outputarray = []
    for (i = 0; i < num; i++) {
        outputarray.push(min + Math.floor(Math.random() * (max - min + 1)));
    }
    return outputarray;
}

function gethighestvalues(inputarray,num) {
    console.log(inputarray)
    let toremove = inputarray.length - num
    for (i=0 ; i<toremove ; i++) {
        let minval = Math.min.apply(Math, inputarray)
        inputarray.splice(inputarray.indexOf(minval),1)
    }
    return inputarray
}

async function rollname(gender) {
    var jsonout
    if (gender == true) {
        var firstnameoutput = female_first_names[Math.floor(Math.random() * female_first_names.length)];
        var lastnameoutput = last_names[Math.floor(Math.random() * last_names.length)];
        document.getElementById("charname").value = firstnameoutput.concat(" ", lastnameoutput)
    } else {
        var firstnameoutput = male_first_names[Math.floor(Math.random() * male_first_names.length)];
        var lastnameoutput = last_names[Math.floor(Math.random() * last_names.length)];
        document.getElementById("charname").value = firstnameoutput.concat(" ", lastnameoutput)
    }
}

function rollstats(perk) {
    let rollset = rd6(8,1,6)
    let prunedrollset = gethighestvalues(rollset,5)
    let total = 0
    for (i=0;i < prunedrollset.length; i++) {
        total += prunedrollset[i];
    }
    let totalform = document.getElementById("totalscore");
    let output = ""
    let result = ""
    if (perk == true) {
        result = output.concat(total, " ( + 2) = ", (total + 2));
    } else {
        result = total;
    }
    totalform.value = result;


    for (i=1;i<= prunedrollset.length;i++) {
        let to_assign = "";
        to_assign = to_assign.concat("stat",i,"score");
        let to_assign_mod = "";
        to_assign_mod = to_assign_mod.concat("stat",i,"mod");
        let currentscore = document.getElementById(to_assign);
        let currentmod = document.getElementById(to_assign_mod);
        currentscore.value = prunedrollset[i-1]
        currentmod.value = Math.ceil(prunedrollset[i-1] / 2) - 2
    }

}
