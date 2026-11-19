const SUBJ=["Python Programming","Web Technologies","Database Management","Java Programming","Mathematics"];
const PASS=40,$=s=>document.querySelector(s);
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
let data=load("results",null)||[{roll:"24BCA001",name:"Sample Student",marks:[78,85,72,66,90]}];
let role="student";
$("#mk").innerHTML=SUBJ.map((s,i)=>`<div><label for="m${i}">${s}</label><input id="m${i}" type="number" min="0" max="100"></div>`).join("");

const calc=m=>{const t=m.reduce((a,b)=>a+b,0),pc=t/m.length;
 const g=pc>=90?"O":pc>=80?"A+":pc>=70?"A":pc>=60?"B+":pc>=50?"B":pc>=40?"C":"F";
 return{t,pc:pc.toFixed(1),g,ok:m.every(x=>x>=PASS)}};
const show=id=>{["login","admin","student"].forEach(x=>$("#"+x).classList.toggle("hide",x!==id));$("#logout").hidden=id==="login"};

$("#tS").onclick=()=>{role="student";$("#tS").className="on";$("#tA").className="ghost";$("#uL").textContent="Roll number"};
$("#tA").onclick=()=>{role="admin";$("#tA").className="on";$("#tS").className="ghost";$("#uL").textContent="Username"};
$("#logout").onclick=()=>{$("#u").value=$("#p").value="";show("login")};

$("#in").onclick=()=>{const u=$("#u").value.trim(),p=$("#p").value;$("#err").textContent="";
 if(role==="admin"){if(u==="admin"&&p==="admin123"){show("admin");rows()}else $("#err").textContent="Username or password is incorrect."}
 else{const s=data.find(d=>d.roll.toLowerCase()===u.toLowerCase());
  if(s&&p.toLowerCase()===s.roll.toLowerCase()){card(s);show("student")}else $("#err").textContent="Roll number or password is incorrect."}};

function card(s){const r=calc(s.marks);
 $("#report").innerHTML=`<h2>Report card</h2><p><b>${s.name}</b> - Roll ${s.roll}</p>
 <table><thead><tr><th>Subject</th><th>Marks (out of 100)</th><th>Status</th></tr></thead><tbody>
 ${SUBJ.map((n,i)=>`<tr><td>${n}</td><td>${s.marks[i]}</td><td class="${s.marks[i]>=PASS?"pass":"fail"}">${s.marks[i]>=PASS?"Pass":"Fail"}</td></tr>`).join("")}</tbody></table>
 <div class="summary"><div>Total<b>${r.t}/${SUBJ.length*100}</b></div><div>Percentage<b>${r.pc}%</b></div><div>Grade<b>${r.g}</b></div><div>Result<b class="${r.ok?"pass":"fail"}">${r.ok?"Pass":"Fail"}</b></div></div>`}
$("#print").onclick=()=>window.print();

function rows(){$("#rows").innerHTML=data.length?data.map(s=>{const r=calc(s.marks);
 return `<tr><td>${s.roll}</td><td>${s.name}</td><td>${r.t}</td><td>${r.pc}</td><td class="${r.ok?"pass":"fail"}">${r.ok?"Pass":"Fail"}</td>
 <td><button class="ghost" data-e="${s.roll}">Edit</button> <button class="del" data-d="${s.roll}">Delete</button></td></tr>`}).join(""):'<tr><td colspan="6">No results yet. Add a student above.</td></tr>'}
document.addEventListener("click",e=>{const d=e.target.dataset;
 if(d.d){data=data.filter(s=>s.roll!==d.d);save("results",data);rows()}
 if(d.e){const s=data.find(x=>x.roll===d.e);$("#roll").value=s.roll;$("#nm").value=s.name;s.marks.forEach((m,i)=>$("#m"+i).value=m);scrollTo(0,0)}});
$("#save").onclick=()=>{const roll=$("#roll").value.trim(),name=$("#nm").value.trim(),err=$("#aerr");err.textContent="";
 const marks=SUBJ.map((_,i)=>$("#m"+i).value);
 if(!roll||!name){err.textContent="Enter a roll number and a name.";return}
 if(marks.some(m=>m===""||m<0||m>100)){err.textContent="Enter marks from 0 to 100 for every subject.";return}
 const rec={roll,name,marks:marks.map(Number)},i=data.findIndex(s=>s.roll.toLowerCase()===roll.toLowerCase());
 i>=0?data[i]=rec:data.push(rec);save("results",data);rows();
 ["roll","nm",...SUBJ.map((_,i)=>"m"+i)].forEach(id=>$("#"+id).value="")};
