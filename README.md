PS43 Cameroon Crossover – Cameroon Infrastructure Portal
Prototype for Catalyst 2026, Team #11 ("Building Bridges to Education"), built for the PS43 Foundation.

Challenge: How might we use appropriate technology to help PS43 identify educational needs, connect resources and trusted partners, and more effectively deploy educational infrastructure across communities in Cameroon?

PS43 currently finds school needs and local partners by word of mouth, with no shared framework. This prototype is the central bridge between the two: schools say what they need in a structured form, partners say what they can provide, and PS43 coordinators see matches in one place.

What it does:

- Intake forms: one for school staff (what the school needs) and one for partners (what they can provide). Follow-up questions appear only when the related box is ticked. Partners choose from structure, supplies and technology.
- Matching: for any school request, finds a partner in the same region that covers the needs, and shows what is covered and what is a gap PS43 could fill.
- Needs map: a schematic map of Cameroon with schools (circles) and partners (squares), plus searchable lists of schools and verified partners.
- Partner verification: an admin checks a partner against criteria (past work, capacity, student reach) before marking them "PS43 verified".
- Offline mode: with the offline switch on, submissions wait in a sync queue and send when the connection returns.
- SMS simulator: shows how someone with a basic phone could send a request with no internet.
- English / French: the whole interface switches language.
- Three roles: PS43 admin, school staff / field rep, and local partner. Each sees the tabs they need.

Usage instructions:
Have the index.html and the script.js in the same folder. Open the html file, it should open to the homepage. You can navigate using the nav bar and switch the view you see by the first dropdown menu at the top. There is also an option to switch into French. 

There is a button at the bottom to reset data to the default test data we provided. 

Files included in the repo: 
	-index.html : The user interface of the project includes html, css and javascript.
	-script.js : The logic of the user interface, contains the data and algorithms.
	-ps43-foundation_logo_dark.png : A png of the black PS43 logo.
	-ps43-foundation_logo_white.png : A png of the white PS43 logo.

Prototype limitations:
  -Each instant is saved locally. 
  -The SMS and Sync Queue are simply demos, they are not actually functional. 
  -The view dropdown only changes visibility. 
  -Switching language or view from the dropdown menus all new data. 
  -The Map page is an approximation of regions, does not account for actual addresses. 

  Future work:
  -GPS location verification.
  -CAPTCHA verification.
  -Implementing a more accurate map (Google Map integration).
  -2-factor verification to confirm the information provided is accurate.
  -Convert into an app form where partners can accept or deny the matched schools. 
