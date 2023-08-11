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

var perklist = []

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

var grade_tokens = 0

var mb_muggle_knowledge_heritage_bonus = 0
var mix_muggle_knowledge_heritage_bonus = 0
var mix_magical_theory_heritage_bonus = 0
var pure_magical_theory_heritage_bonus = 0
var mb_determination_heritage_bonus = 0
var mb_luck_heritage_bonus = 0

var skilldict = {
    "skill_magical_theory": 0,
    "skill_muggle_knowledge": 0,
    "skill_insight": 0,
    "skill_determination": 0,
    "skill_investigation": 0,
    "skill_persuasion": 0,
    "skill_intimidation": 0,
    "skill_deception": 0,
    "skill_athletics": 0,
    "skill_dexterity": 0,
    "skill_stealth": 0,
    "skill_creature_care": 0,
    "skill_perception": 0,
    "skill_luck": 0,
}

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

var level = 1
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

function updatelevel() {
    level = document.getElementById("level-selected").value
    if (level > 1) {
        grade_tokens = (40 * (level-1))
    } else {
        grade_tokens = 0
    }
        let chosenheritage = document.getElementById("chosenheritage").value
        if (chosenheritage == "mixed-blood") {
            grade_tokens += 1
        } else if (chosenheritage == "pure-blood") {
            grade_tokens += 2
    }
    console.log(grade_tokens)
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
function updatehealth() {
    document.getElementById("hitpoints").innerHTML = 10 + +grit
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
    updatehealth();
}

function addperk() {
    const perklistlookup = document.getElementById("perklist");
    const perklistlookup2 = document.getElementById("perk-list");
    console.log(perklistlookup.innerHTML)
    if (perklistlookup2.innerHTML == "No perks currently selected.") {
        perklistlookup2.innerHTML = ""
    }

        perknamelookup = perklistlookup.value 
        if (perknamelookup != "No Perk Selected") {
            perklist.push(perknamelookup)
            perkcontainer = document.createElement("button");
            perkcontainer.classList.add("perkbtn");
        
            perkcontainer.onclick = function() {
                this.remove();
                perklist.splice(this)
                if (document.getElementById("perk-list").childElementCount == 0) {
                    document.getElementById("perk-list").innerHTML = "No perks currently selected."
                    console.log(perklist)
                }
            }
        
            perkname = document.createTextNode("X " + perknamelookup);
            perkcontainer.appendChild(perkname);
            document.getElementById("perk-list").appendChild(perkcontainer);
            console.log(perklist)
            return;

        }

    }

function rollgold() {
    let rollset = rd6(6,1,8)
    console.log(rollset)
    let total = 0
    for (i=0;i < rollset.length; i++) {
        total += rollset[i];
    }
    total += 100
    if (perklist.includes("Heir/Heiress")) {
        document.getElementById("starting-gold").innerHTML = ("Starting galleons: " + total + " ( + 50 if you use your heir/heiress perks favor)")
    } else if (perklist.includes("Wealthy Family")) {
        document.getElementById("starting-gold").innerHTML = ("Starting galleons: " + total + " ( + 25 if you use your wealthy perks favor)")

    } else {
    document.getElementById("starting-gold").innerHTML = ("Starting galleons: " + total)
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
    skilldict["skill_magical_theory"] = +smarts_mod + +mix_magical_theory_heritage_bonus + +pure_magical_theory_heritage_bonus
    document.getElementById("skill_magical_theory").innerHTML = skilldict["skill_magical_theory"]
    skilldict["skill_muggle_knowledge"] = +smarts_mod + +mb_muggle_knowledge_heritage_bonus + +mix_muggle_knowledge_heritage_bonus
    document.getElementById("skill_muggle_knowledge").innerHTML = skilldict["skill_muggle_knowledge"]
    skilldict["skill_insight"] = +smarts_mod
    document.getElementById("skill_insight").innerHTML = skilldict["skill_insight"]
    skilldict["skill_determination"] = +grit_mod + +mb_determination_heritage_bonus
    document.getElementById("skill_determination").innerHTML = skilldict["skill_determination"]
    skilldict["skill_investigation"] = +grit_mod
    document.getElementById("skill_investigation").innerHTML = skilldict["skill_investigation"]
    skilldict["skill_persuasion"] = +charm_mod
    document.getElementById("skill_persuasion").innerHTML = skilldict["skill_persuasion"]
    skilldict["skill_intimidation"] = +charm_mod
    document.getElementById("skill_intimidation").innerHTML = skilldict["skill_intimidation"]
    skilldict["skill_deception"] = +charm_mod
    document.getElementById("skill_deception").innerHTML = skilldict["skill_deception"]
    skilldict["skill_athletics"] = +vigor_mod
    document.getElementById("skill_athletics").innerHTML = skilldict["skill_athletics"]
    skilldict["skill_dexterity"] = +vigor_mod
    document.getElementById("skill_dexterity").innerHTML = skilldict["skill_dexterity"]
    skilldict["skill_stealth"] = +vigor_mod
    document.getElementById("skill_stealth").innerHTML = skilldict["skill_stealth"]
    skilldict["skill_creature_care"] = +loyalty_mod
    document.getElementById("skill_creature_care").innerHTML = skilldict["skill_creature_care"]
    skilldict["skill_perception"] = +loyalty_mod
    document.getElementById("skill_perception").innerHTML = skilldict["skill_perception"]
    skilldict[ "skill_luck"] = +loyalty_mod + +mb_luck_heritage_bonus
    document.getElementById("skill_luck").innerHTML = skilldict[ "skill_luck"]

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
        stattochange.value -= 1;
    
        let newtotal = "";
        let totalform = document.getElementById("totalscore");
        newtotal = totalform.value;
        newtotal = newtotal.substring(newtotal.length-2);
        console.log(newtotal);
        newtotal -= 1;
        let output = ""
        totalform.value = output.concat(newtotal);
        refreshmods()

    }
}


function addskill(skill) {
        let skilltochange = document.getElementById(skill);
        skilltochange.innerHTML -= -1;
        skilldict[skill] -= -1
    }
    
function remskill(skill) {
        let skilltochange = document.getElementById(skill);
        skilltochange.innerHTML -= 1;
        skilldict[skill] -= 1
    }

function updateheritage() {
    
    mb_muggle_knowledge_heritage_bonus = 0
    mix_muggle_knowledge_heritage_bonus = 0
    mix_magical_theory_heritage_bonus = 0
    pure_magical_theory_heritage_bonus = 0
    mb_determination_heritage_bonus = 0
    mb_luck_heritage_bonus = 0

    let chosenheritage = document.getElementById("chosenheritage").value
    if (chosenheritage == "muggle-born") {
        mb_muggle_knowledge_heritage_bonus = 5
        mb_luck_heritage_bonus = 3
        mb_determination_heritage_bonus = 1   
    } else if (chosenheritage == "mixed-blood") {
        mix_muggle_knowledge_heritage_bonus = 2
        mix_magical_theory_heritage_bonus = 1
    } else if (chosenheritage == "pure-blood") {
        pure_magical_theory_heritage_bonus = 2
    } else {

    }
    updatelevel();

    
    updateskills()
    }