const posts=[
["राष्ट्रीय संरक्षक",2500],["राष्ट्रीय अध्यक्ष",2500],["राष्ट्रीय उपाध्यक्ष",2200],["राष्ट्रीय महासचिव",2200],["राष्ट्रीय सचिव",2000],
["राष्ट्रीय कोषाध्यक्ष",2000],["राष्ट्रीय संगठन मंत्री",1800],["राष्ट्रीय प्रचार मंत्री",1800],["राष्ट्रीय मीडिया प्रभारी",1600],["राष्ट्रीय विधि सलाहकार",1600],
["प्रदेश अध्यक्ष",1500],["प्रदेश उपाध्यक्ष",1400],["प्रदेश महासचिव",1400],["प्रदेश सचिव",1200],["प्रदेश कोषाध्यक्ष",1200],
["जिला अध्यक्ष",1000],["जिला उपाध्यक्ष",900],["जिला महासचिव",900],["जिला सचिव",800],["जिला कोषाध्यक्ष",800],
["ब्लॉक अध्यक्ष",700],["ब्लॉक सचिव",600],["युवा अध्यक्ष",600],["महिला प्रकोष्ठ अध्यक्ष",600],["सदस्य",500]
];
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const post=$("#post"),fee=$("#fee");
posts.forEach(([name,amount])=>{let o=document.createElement("option");o.value=amount;o.textContent=`${name} — ₹${amount.toLocaleString("en-IN")}`;o.dataset.name=name;post.appendChild(o)});
function updateFee(){fee.textContent="₹"+Number(post.value).toLocaleString("en-IN")}post.onchange=updateFee;updateFee();

function toast(msg){const x=$("#toast");x.textContent=msg;x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),2600)}
function openModal(title,html){$("#modalContent").innerHTML=`<h2>${title}</h2>${html}`;$("#modal").classList.remove("hidden")}
function closeModal(){$("#modal").classList.add("hidden")}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});

function memberRegistration(){return `<form onsubmit="demoSubmit(event,'Member registration submitted')"><input required placeholder="Full Name"><input required placeholder="Mobile Number"><input required type="email" placeholder="Email"><input placeholder="Address"><select><option>${post.options[post.selectedIndex].textContent}</option></select><input placeholder="UTR / Transaction ID"><button class="btn primary full">Submit Application</button></form><p class="muted">Status: Payment Pending → Admin Verify.</p>`}
function idCard(){return `<div class="result"><b>Digital Member ID Card</b><p>Member ID: GRT-2026-1001<br>Status: Active<br>Post: Demo Member</p><button class="btn primary" onclick="toast('ID Card download demo')">Download ID Card</button></div>`}
function certificate(){return `<p>Certificate records यहां दिखाई जाएंगी। Production में verified certificates backend से fetch होंगे।</p><button class="btn primary" onclick="toast('Certificate preview demo')">Preview Certificate</button>`}
function renewal(){return `<input placeholder="Member ID"><button class="btn primary full" onclick="toast('Renewal request submitted (demo)')">Continue Renewal</button>`}
function receipt(){return `<p>Receipt No.: <b>REC-2026-1001</b></p><p>Payment Status: <b>Pending Verification</b></p><p>UTR: DEMO-UTR-001</p>`}
function searchApp(){return `<input id="appSearch" placeholder="Application ID"><button class="btn primary full" onclick="toast('Application search demo')">Search</button>`}
function loginBox(){return `<input placeholder="Mobile / Email"><input type="password" placeholder="Password"><button class="btn primary full" onclick="toast('Secure backend login required')">Login</button>`}
function adminLogin(){return `<input placeholder="Admin Username"><input type="password" placeholder="Admin Password"><button class="btn primary full" onclick="toast('Admin authentication backend required')">Login to Dashboard</button><p class="muted">Frontend UI only.</p>`}
function quickServices(){return `<div class="cards"><button class="btn primary" onclick="closeModal();location.hash='membership'">Membership</button><button class="btn primary" onclick="closeModal();location.hash='donation'">Donation</button><button class="btn primary" onclick="closeModal();location.hash='verify'">Verification</button><button class="btn primary" onclick="closeModal();location.hash='complaint'">Complaint</button></div>`}
function demoSubmit(e,msg){e.preventDefault();e.target.reset();closeModal();toast(msg+" • Status Pending")}
$("#apply").onclick=()=>openModal("Membership Application",memberRegistration());

$("#verifyForm").onsubmit=e=>{e.preventDefault();let id=$("#memberId").value.trim(),box=$("#verifyResult");box.classList.remove("hidden");if(/^GRT-\d{4}-\d{4}$/i.test(id)){box.innerHTML=`<b>✓ Member Verified (Demo)</b><p>Member ID: <strong>${id.toUpperCase()}</strong><br>Status: Active<br>Verification: Verified</p>`}else box.innerHTML=`<b>Format Check</b><p>Example: <strong>GRT-2026-1001</strong></p>`};

$("#donationForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Donation submitted • Payment Pending Verification")};
$("#complaintForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Complaint submitted • ID CMP-2026-"+Math.floor(1000+Math.random()*8999))};
$("#contactForm").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Message submitted successfully")};
$("#trackForm").onsubmit=e=>{e.preventDefault();$("#trackResult").innerHTML=`<div class="result"><b>Complaint Status</b><p>ID: ${$("#complaintId").value}<br>Status: <strong>Under Review</strong><br>Last Updated: 05 Sep 2026</p></div>`};

const teamNames=posts.map(x=>x[0]);$("#teamGrid").innerHTML=teamNames.map((x,i)=>`<article class="team-card"><div class="avatar">${String(i+1).padStart(2,"0")}</div><b>${x}</b><small>Management Post</small></article>`).join("");

const media=[["photo","समाज सेवा कार्यक्रम"],["photo","शिक्षा सहायता"],["video","कार्यक्रम वीडियो"],["photo","स्वास्थ्य अभियान"],["photo","सदस्य बैठक"],["video","Trust Activity"],["photo","जागरूकता कार्यक्रम"],["photo","Community Support"],["video","Event Highlights"],["photo","Youth Program"],["photo","Team Meeting"],["video","Social Initiative"]];
function renderGallery(f="all"){$("#galleryGrid").innerHTML=media.filter(x=>f==="all"||x[0]===f).map(x=>`<div class="gallery-item"><span>${x[0]==="video"?"▶":"📷"} ${x[1]}</span></div>`).join("")}
renderGallery();$$(".tabs button").forEach(b=>b.onclick=()=>{$$(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderGallery(b.dataset.filter)});

function openLegal(title){const texts={ "Trust Deed":"यहां Trust Deed और registration documents के official download links रखे जा सकते हैं.","Privacy Policy":"Production में personal data collection, retention, access control और deletion policy स्पष्ट रखें.","Terms & Conditions":"Membership, portal usage, account और service terms यहां publish करें.","Refund Policy":"Approved membership/donation refund rules यहां रखें.","Disclaimer":"Website information को official Trust records के साथ verify करने की व्यवस्था रखें."};openModal(title,`<p>${texts[title]}</p><button class="btn primary" onclick="toast('Document link demo')">Open Document</button>`)}

$("#menu").onclick=()=>$("#nav").classList.toggle("open");$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
let dark=localStorage.getItem("grt-theme")==="dark";function setTheme(){document.documentElement.classList.toggle("dark",dark);$("#theme").textContent=dark?"☀":"☾"}setTheme();$("#theme").onclick=()=>{dark=!dark;localStorage.setItem("grt-theme",dark?"dark":"light");setTheme()};

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting||e.target.dataset.done)return;e.target.dataset.done=1;let target=+e.target.dataset.count,n=0,step=Math.max(1,Math.ceil(target/35));let t=setInterval(()=>{n=Math.min(target,n+step);e.target.textContent=n+(target>=25?"+":"");if(n>=target)clearInterval(t)},28)}),{threshold:.7});$$("[data-count]").forEach(x=>obs.observe(x));
