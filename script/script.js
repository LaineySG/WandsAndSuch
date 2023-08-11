/* Global variables */
var charactername = ""
var smarts = 0
var grit = 0
var charm = 0
var vigor = 0
var loyalty = 0

var smarts_mod = 0
var grit_mod = 0
var charm_mod = 0
var vigor_mod = 0
var loyalty_mod = 0

var perks = []

var learning_mod_charmwork = 0
var learning_mod_divination = 0
var learning_mod_defensive = 0
var learning_mod_potions = 0
var learning_mod_curses = 0
var learning_mod_hexes = 0
var learning_mod_jinxes = 0
var learning_mod_offensive = 0
var learning_mod_transfiguration = 0
var learning_mod_herbology = 0
var learning_mod_healing = 0

var skill_magical_theory = 0
var skill_muggle_knowledge = 0
var skill_insight = 0
var skill_determination = 0
var skill_investigation = 0
var skill_persuasion = 0
var skill_intimidation = 0
var skill_deception = 0
var skill_athletics = 0
var skill_dexterity = 0
var skill_stealth = 0
var skill_creature_care = 0
var skill_perception = 0
var skill_luck = 0

var casting_lvl_charmwork = 0
var casting_lvl_divination = 0
var casting_lvl_defensive = 0
var casting_lvl_potions = 0
var casting_lvl_curses = 0
var casting_lvl_hexes = 0
var casting_lvl_jinxes = 0
var casting_lvl_offensive = 0
var casting_lvl_transfiguration = 0
var casting_lvl_herbology = 0
var casting_lvl_healing = 0
/* Global variables */

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

function rollname(gender) {
    if (gender == 1) {
        let firstnameoutput = female_first_names[Math.floor(Math.random() * female_first_names.length)];
        let lastnameoutput = last_names[Math.floor(Math.random() * last_names.length)];
        document.getElementById("charname").value = firstnameoutput.concat(" ", lastnameoutput)
    } else if (gender == 2) {
        let firstnameoutput = male_first_names[Math.floor(Math.random() * male_first_names.length)];
        let lastnameoutput = last_names[Math.floor(Math.random() * last_names.length)];
        document.getElementById("charname").value = firstnameoutput.concat(" ", lastnameoutput)
    } else if (gender == 3) {
        let coinflip = Math.ceil(Math.random() * 2)
        if (coinflip == 1) {
            let firstnameoutput = female_first_names[Math.floor(Math.random() * female_first_names.length)];
        } else {
            let firstnameoutput = male_first_names[Math.floor(Math.random() * male_first_names.length)];
        }
        let lastnameoutput = last_names[Math.floor(Math.random() * last_names.length)];
        charactername = firstnameoutput.concat(" ", lastnameoutput)
        document.getElementById("charname").value = charactername

    }
}

function refreshmods() {
    for (i = 1; i < 6; i++) {
        let get_score = "";
        get_score = get_score.concat("stat",i,"score");
        let assign_mod = "";
        assign_mod = assign_mod.concat("stat",i,"mod");
        let currentscore = document.getElementById(get_score);
        let currentmod = document.getElementById(assign_mod);
        currentmod.value = Math.ceil(currentscore.value / 2) - 2

        if (i==1) {smarts = currentscore.value; smarts_mod = currentmod.value}
        else if (i == 2) {grit = currentscore.value; grit_mod = currentmod.value}
        else if (i == 3) {charm = currentscore.value; charm_mod = currentmod.value}
        else if (i == 4) {vigor = currentscore.value; vigor_mod = currentmod.value}
        else if (i == 5) {loyalty = currentscore.value; loyalty_mod = currentmod.value}


    }
    updateskills();
    updatelearningmods();
}

function addperk() {
    const perklistlookup = document.getElementById("perklist");
    if (perklistlookup.value != "No perks currently selected") {
        perknamelookup = perklistlookup.value 
        if (perknamelookup != "No Perk Selected") {
            perkcontainer = document.createElement("button");
            perkcontainer.classList.add("perkbtn");
        
            perkcontainer.onclick = function() {
                this.remove();
                if (document.getElementById("perk-list").childElementCount == 0) {
                    console.log("true")
                    document.getElementById("perk-list").innerHTML = "No perks currently selected."
                }
            }
        
            perkname = document.createTextNode("X " + perknamelookup);
            perkcontainer.appendChild(perkname);
            document.getElementById("perk-list").appendChild(perkcontainer);
            return;

        }

    }
}

function updatedesc() {
    const perklistlookup = document.getElementById("perklist");
    const perk_desc = document.getElementById("perk-description");
    perknamelookup = perklistlookup.value 
    for (i = 0; i < perks.length; i++) {
        let perk = perks[i];
        if (perk.name == perknamelookup) {
            perk_desc.innerHTML = perk.desc
        }
    }
}

function ListFiller() {
    for (i = 0; i < perks.length; i++) {
        let perk = perks[i];
        const perklistlookup = document.getElementById("perklist");
        const perklistentry = document.createElement("option");
        perklistentry.value = perk.name;
        perklistentry.innerHTML = perk.name;
        perklistlookup.appendChild(perklistentry,perklistlookup)
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

    let randombonus = Math.ceil(Math.random() * 5)
    console.log(randombonus)

    for (i=1;i<= prunedrollset.length;i++) {
        let to_assign = "";
        to_assign = to_assign.concat("stat",i,"score");
        let to_assign_mod = "";
        to_assign_mod = to_assign_mod.concat("stat",i,"mod");
        let currentscore = document.getElementById(to_assign);
        let currentmod = document.getElementById(to_assign_mod);
        if (i == randombonus) {prunedrollset[i-1] += 2}
        currentscore.value = prunedrollset[i-1]
        currentmod.value = Math.ceil(prunedrollset[i-1] / 2) - 2
    }
    refreshmods()


}

function updateskills() {
    skill_magical_theory = smarts_mod
    document.getElementById("skill_magical_theory").innerHTML = skill_magical_theory
    skill_muggle_knowledge = smarts_mod
    document.getElementById("skill_muggle_knowledge").innerHTML = skill_muggle_knowledge
    skill_insight = smarts_mod
    document.getElementById("skill_insight").innerHTML = skill_insight
    skill_determination = grit_mod
    document.getElementById("skill_determination").innerHTML = skill_determination
    skill_investigation = grit_mod
    document.getElementById("skill_investigation").innerHTML = skill_investigation
    skill_persuasion = charm_mod
    document.getElementById("skill_persuasion").innerHTML = skill_persuasion
    skill_intimidation = charm_mod
    document.getElementById("skill_intimidation").innerHTML = skill_intimidation
    skill_deception = charm_mod
    document.getElementById("skill_deception").innerHTML = skill_deception
    skill_athletics = vigor_mod
    document.getElementById("skill_athletics").innerHTML = skill_athletics
    skill_dexterity = vigor_mod
    document.getElementById("skill_dexterity").innerHTML = skill_dexterity
    skill_stealth = vigor_mod
    document.getElementById("skill_stealth").innerHTML = skill_stealth
    skill_creature_care = loyalty_mod
    document.getElementById("skill_creature_care").innerHTML = skill_creature_care
    skill_perception = loyalty_mod
    document.getElementById("skill_perception").innerHTML = skill_perception
    skill_luck = loyalty_mod
    document.getElementById("skill_luck").innerHTML = skill_luck

}

function updatelearningmods() {
    learning_mod_charmwork = smarts_mod
    document.getElementById("learning_mod_charmwork").innerHTML = learning_mod_charmwork
    learning_mod_divination = smarts_mod
    document.getElementById("learning_mod_divinations").innerHTML = learning_mod_divination
    learning_mod_defensive = grit_mod
    document.getElementById("learning_mod_defensive").innerHTML = learning_mod_defensive
    learning_mod_potions = grit_mod
    document.getElementById("learning_mod_potions").innerHTML = learning_mod_potions
    learning_mod_curses = charm_mod
    document.getElementById("learning_mod_curses").innerHTML = learning_mod_curses
    learning_mod_hexes = charm_mod
    document.getElementById("learning_mod_hexes").innerHTML = learning_mod_hexes
    learning_mod_jinxes = charm_mod
    document.getElementById("learning_mod_jinxes").innerHTML = learning_mod_jinxes
    learning_mod_offensive = vigor_mod
    document.getElementById("learning_mod_offensive").innerHTML = learning_mod_offensive
    learning_mod_transfiguration = vigor_mod
    document.getElementById("learning_mod_transfiguration").innerHTML = learning_mod_transfiguration
    learning_mod_herbology = loyalty_mod
    document.getElementById("learning_mod_herbology").innerHTML = learning_mod_herbology
    learning_mod_healing = loyalty_mod
    document.getElementById("learning_mod_healing").innerHTML = learning_mod_healing



}

function addstat(x) {
    let clickedstat = ""
    clickedstat = clickedstat.concat("stat",x,"score");
    let stattochange = document.getElementById(clickedstat);
    stattochange.value -= -1;

    let newtotal = "";
    let totalform = document.getElementById("totalscore");
    newtotal = totalform.value
    newtotal = newtotal.substring(newtotal.length-2);
    console.log(newtotal)
    newtotal -= -1
    let output = ""
    totalform.value = output.concat(newtotal);
    refreshmods()

}

function remstat(x) {
    let clickedstat = ""
    clickedstat = clickedstat.concat("stat",x,"score");
    let stattochange = document.getElementById(clickedstat);
    if (stattochange.value > 0) {
        stattochange.value -= 1
    
        let newtotal = "";
        let totalform = document.getElementById("totalscore");
        newtotal = totalform.value
        newtotal = newtotal.substring(newtotal.length-2);
        console.log(newtotal)
        newtotal -= 1
        let output = ""
        totalform.value = output.concat(newtotal);
        refreshmods()

    }

}
