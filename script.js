/* PS43 data + matching module
   index.html only talks to the PS43 object below. keep the names and shapes and it all lwk keeps working.

   school  = {id, region, name, address, students, phone, email,
              needs:{infrastructure:[roofing,flooring,walls], supplies:[notebooks,textbooks,writing], technology:[electricity,internet,devices]},
              subjects:[science,math,engineering,arts,technology], contact:{ok,role,name,phone,email}, comments,
              status:'open'|'matched', partnerId, ll:[lon,lat] (optional)}
   partner = {id, region, name, address, phone, email, website,
              offers:{structure:[roofing,flooring,walls], furniture:[desks,chairs], supplies:[notebooks,textbooks,pens],
                      staffing:[teachers,janitors,admin], technology:[electricity,internet], transportation:[buses]},
              subjects:[...or 'all'], capacity, why, verified:true|false, done, ll (optional)}
   region codes: AR CR ER FNR LR NR NWR SR SWR WR

   contract:
     PS43.schools() / PS43.partners()   -> arrays
     PS43.store(kind, record)           -> saves a 'school' or 'partner' record, returns it
     PS43.match(school)                 -> {partner, covered:[...], gaps:[...]} or null   <-- replace with real algorithm
     PS43.confirmMatch(schoolId, partnerId), PS43.verify(partnerId), PS43.reset()
*/
(function () {
  const KEY = 'ps43data2';
  const SEED = {
    schools: [
      {id:1,region:'LR',name:'Lycée Bilingue de Douala',address:'Akwa, Douala',students:1250,needs:{technology:['devices']},subjects:[],ll:[9.70,4.05],status:'open'},
      {id:2,region:'CR',name:'GBHS Yaoundé',address:'Bastos, Yaoundé',students:980,needs:{technology:['electricity','devices']},subjects:[],ll:[11.52,3.87],status:'open'},
      {id:3,region:'NWR',name:'Government Primary School Bamenda',address:'Up Station, Bamenda',students:410,needs:{technology:['electricity'],supplies:['notebooks','textbooks']},subjects:['math'],ll:[10.16,5.96],status:'open'},
      {id:4,region:'NR',name:'École Publique de Garoua',address:'Centre-ville, Garoua',students:620,needs:{infrastructure:['roofing'],technology:['internet']},subjects:[],ll:[13.40,9.30],status:'open'},
      {id:5,region:'SR',name:'Collège Bilingue de Kribi',address:'Kribi',students:760,needs:{supplies:['textbooks']},subjects:['science'],ll:[9.91,2.94],status:'open'}
    ],
    partners: [
      {id:1,region:'LR',name:'Cameroon Solar Solutions Ltd.',address:'Douala',offers:{technology:['electricity']},subjects:[],capacity:6,verified:true,done:23,ll:[9.74,4.08]},
      {id:2,region:'CR',name:'Central Africa Tech Outreach (CATO)',address:'Yaoundé',offers:{technology:['devices','internet'],staffing:['teachers']},subjects:['technology'],capacity:14,verified:true,done:17,ll:[11.50,3.84]},
      {id:3,region:'NR',name:'Nord-Énergie Community Builders',address:'Garoua',offers:{structure:['roofing','walls'],technology:['internet']},subjects:[],capacity:8,verified:true,done:11,ll:[13.38,9.33]},
      {id:4,region:'NWR',name:'Bamenda Build & Supply',address:'Bamenda',offers:{technology:['electricity'],supplies:['notebooks','textbooks','pens']},subjects:['math','science'],capacity:300,verified:true,done:9,ll:[10.14,5.94]},
      {id:5,region:'SR',name:'Kribi Education Supplies',address:'Kribi',offers:{supplies:['textbooks','notebooks']},subjects:['science','math','engineering'],capacity:500,verified:true,done:7,ll:[9.93,2.92]},
      {id:6,region:'LR',name:'Réseau Éducatif Nkongsamba',address:'Nkongsamba',offers:{structure:['roofing','flooring']},subjects:[],capacity:0,verified:false,done:4,ll:[9.94,4.95]}
    ]
  };
  const clone = o => JSON.parse(JSON.stringify(o));
  let D = null;
  try { D = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  D = D || clone(SEED);
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} };
  // partner class and matching helper
  class Partner {
    constructor(name, region, specialty, subSpec) { this.name = name; this.region = region; this.spec = specialty; this.subSpec = subSpec; }
  }
  // partner forms offer 'structure'; school forms ask for 'infrastructure'. same thing.
  const SPEC = {structure: 'infrastructure', supplies: 'supplies', technology: 'technology', furniture: 'furniture', staffing: 'staffing', transportation: 'transportation'};
  // One flat Partner per category a partner offers (as in the original sample data), verified partners first.
  const listings = () => D.partners.slice().sort((a, b) => b.verified - a.verified).flatMap(p =>
    Object.entries(p.offers).map(([c, subs]) => Object.assign(new Partner(p.name, p.region, SPEC[c], subs), {ref: p})));
  // matchOne(region, specialty, subNeeds) -> first partner that covers all subNeeds, or null
  function matchOne(sRegion, sSpec, sSub) {
    for (const p of listings()) {
      if (p.region === sRegion && p.spec === sSpec && sSub.every(x => p.subSpec.includes(x))) return p;
    }
    return null;
  }

  window.PS43 = {
    schools: () => D.schools,
    partners: () => D.partners,
    store(kind, rec) {
      rec.id = Date.now() + Math.floor(Math.random() * 1000);
      if (kind === 'school') { rec.status = 'open'; D.schools.push(rec); }
      else { rec.verified = false; rec.done = 0; D.partners.push(rec); }
      save(); return rec;
    },
    // same region, same specialty, and the partner must cover EVERY sub-need of that category.
    // extension: if no single partner covers a whole category, fall back to partial matches so the UI can show covered vs gaps.
    match(s) {
      const hits = new Map(), add = (p, l) => hits.set(p, (hits.get(p) || []).concat(l));
      for (const c in s.needs) {
        const subs = s.needs[c], p = matchOne(s.region, c, subs);
        if (p) add(p.ref, subs.length ? subs : [c]);
        else subs.forEach(x => { const q = matchOne(s.region, c, [x]); if (q) add(q.ref, [x]); });
      }
      let best = null;
      hits.forEach((cov, p) => { if (!best || cov.length + (p.verified ? .5 : 0) > best.covered.length + (best.partner.verified ? .5 : 0)) best = {partner: p, covered: cov}; });
      if (!best) return null;
      const want = Object.entries(s.needs).flatMap(([c, l]) => l.length ? l : [c]);
      best.gaps = want.filter(x => !best.covered.includes(x));
      return best;
    },
    confirmMatch(sid, pid) { const s = D.schools.find(x => x.id === sid); if (s) { s.status = 'matched'; s.partnerId = pid; save(); } },
    verify(pid) { const p = D.partners.find(x => x.id === pid); if (p) { p.verified = true; save(); } },
    reset() { D = clone(SEED); save(); }
  };
})();
