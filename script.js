
//creates partner object
class Partner{
     constructor(name, region, specialty, subSpec){
        this.name = name;
        this.region = region;
        this. spec = specialty;
        this.subSpec = subSpec;
     }
}


//example partners from each region
const P1 = new Partner("abc", "AR", "infastrcuture", ["roofing", "flooring"]);
const P2 = new Partner("def", "AR", "infastrcuture", ["roofing", "flooring", "walls"]);

const P3 = new Partner("ghi", "CR", "infastrcuture", ["walls"]);
const P4 = new Partner("jkl", "CR", "supplies", ["notebooks", "textbooks", "writing tools"]);

const P5 = new Partner("mno", "ER", "supplies", ["notebooks", "textbooks"]);
const P6 = new Partner("pqr", "ER", "technology", ["electrivity", "internet"]);

const P7 = new Partner("stu", "FNR", "infastrcuture", ["roofing", "flooring"]);
const P8 = new Partner("vwx", "FNR", "technology", ["devices"]);

const P9 = new Partner("abc", "LR", "supplies", ["notebooks", "textbooks", "writing tools"]);
const P10 = new Partner("abc", "LR", "technology", ["electrcity", "internet"]);

const P11 = new Partner("abc", "NR", "technology", ["devices"]);
const P12 = new Partner("def", "NR", "infastrcuture", ["electricity", "internet"]);

const P13 = new Partner("ghi", "NWR", "infastrcuture", ["roofing", "flooring", "walls"]);
const P14 = new Partner("jkl", "NWR", "supplies", ["writing tools"]);

const P15 = new Partner("mno", "SR", "supplies", ["textbooks"]);
const P16 = new Partner("pqr", "SR", "supplies", ["notebooks", "tetxbooks", "writing tools"]);

const P17 = new Partner("stu", "SWR", "infastrcuture", ["roofing", "flooring"]);
const P18 = new Partner("vwx", "SWR", "technology", ["internet"]);

const P19 = new Partner("abc", "WR", "supplies", ["textbooks"]);
const P20 = new Partner("abc", "WR", "technology", ["inetnet", "devices "]);

let partners = [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20];


//stores school's info
function storeInfo(){
    //store school name
    let sName = document.getElementById("").value;
    //store student count
    let studentCount = document.getElementById("").value;
    //store region
    let region = document.getElementById("").value;
    //reassign each region with 2 or 3 character identifier
    if (region == "Adamawa Region"){
        region = "AR";
    }
    else if (region == "Centre Region"){
        region = "CR";
    }
    else if (region == "East Region"){
        region = "ER";
    }
    else if (region == "Far North Region"){
        region = "FNR";
    }
    else if (region == "Littoral Region"){
        region = "LR";
    }
    else if (region == "North Region"){
        region = "NR";
    }
    else if (region == "Northwest Region"){
        region = "NWR";
    }
    else if (region == "South Region"){
        region = "SR";
    }
    else if (region == "Southwest Region"){
        region = "SWR";
    }
    else if (region == "West Region"){
        region = "WR";
    }
    //store need
    let need = document.getElementById("").value;
    let subNeed = [document.getElementById("").value];
    //store rest of info...
}

//new partner sign up
function newPartner(){
    let name = document.getElementById("").value;
    let region = document.getElementById("").value;
    let spec = document.getElementById("").value;
    let sub = document.getElementById("").value;
    const p = new Partner(name, region, spec, sub);
    partners.push(p);
}

function match(sRegion, sNeeds, sSub){
    for(const p of partners){
        if (p.region == Sregion && p.spec == Sneeds){
            included = true;
            for(const sub of sSub){
                if (!p.subSpec.includes(sub)){
                    included = false;
                }
            }
            if (included){
                let selected = p.name;

            }
        }
        }
    }
    return selected;