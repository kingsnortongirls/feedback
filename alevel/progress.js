/* KNGS A Level progress portability, schema v1. Browser-only: no server submission. */
(function(global){
"use strict";
const KEY="kngs-h446-progress-v1", VERSION=1;
const GROUPS=[
["slr1-3","SLR 1–3"],["slr4-5","SLR 4–5"],["slr6-7","SLR 6–7"],
["slr9-10","SLR 9–10"],["slr11-12","SLR 11–12"],["slr13","SLR 13"],
["slr14","SLR 14"],["slr15","SLR 15"],["slr16-17","SLR 16–17"],
["slr18-22","SLR 18–22"],["slr23","SLR 23"],["slr24","SLR 24"],
["slr25-26","SLR 25–26"],["y12-summer","Y12 Summer Mock"],
["y13-c1-dec","Y13 December Component 1 Mock"],["y13-c2","Y13 Component 2 Mock"]
];
const GRADE=["U","E","D","C","B","A","A*"];
const VALID=new Set(GROUPS.map(x=>x[0]));
const object=x=>x&&typeof x==="object"&&!Array.isArray(x);
const clean=x=>String(x??"").trim().slice(0,10000);
const profile=()=>({student:"",clazz:"",target:""});
const empty=()=>({format:"kngs-h446-progress",version:VERSION,profile:profile(),assessments:{},updatedAt:new Date().toISOString()});
function validate(raw){
 if(!object(raw)||raw.format!=="kngs-h446-progress"||raw.version!==VERSION||!object(raw.profile)||!object(raw.assessments))throw Error("This is not a supported KNGS A Level progress file (version 1).");
 const out=empty();out.profile={student:clean(raw.profile.student).slice(0,140),clazz:clean(raw.profile.clazz).slice(0,50),target:clean(raw.profile.target).slice(0,5)};
 if(out.profile.target&&!GRADE.includes(out.profile.target))throw Error("The saved target grade is invalid.");
 for(const [id,rec] of Object.entries(raw.assessments)){
  if(!VALID.has(id)||!object(rec))continue;
  const grade=clean(rec.grade), mark=rec.mark==null||rec.mark===""?null:Number(rec.mark), max=rec.max==null||rec.max===""?null:Number(rec.max);
  if(grade&&!GRADE.includes(grade))throw Error("Invalid grade in "+id);
  if(mark!==null&&(!Number.isFinite(mark)||mark<0||mark>1000))throw Error("Invalid mark in "+id);
  if(max!==null&&(!Number.isFinite(max)||max<=0||max>1000))throw Error("Invalid maximum mark in "+id);
  if(mark!==null&&max!==null&&mark>max)throw Error("Mark exceeds the maximum in "+id);
  const obj={grade,mark,max,date:clean(rec.date).slice(0,20),www:clean(rec.www),hti:clean(rec.hti),reflection1:clean(rec.reflection1),reflection2:clean(rec.reflection2),updatedAt:clean(rec.updatedAt).slice(0,40),source:clean(rec.source).slice(0,60)};
  if(object(rec.marks))obj.marks=Object.fromEntries(Object.entries(rec.marks).slice(0,100).map(([k,v])=>[clean(k).slice(0,50),clean(v).slice(0,20)]));
  if(object(rec.answers))obj.answers=Object.fromEntries(Object.entries(rec.answers).slice(0,20).map(([k,v])=>[clean(k).slice(0,50),clean(v)]));
  out.assessments[id]=obj;
 }
 return out;
}
function load(){try{return validate(JSON.parse(localStorage.getItem(KEY)||"null"))}catch(e){return empty()}}
function store(data){const d=validate(data);d.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(d));return d}
function merge(existing,incoming,decide){
 const a=validate(existing),b=validate(incoming);
 const na=a.profile.student.trim().toLocaleLowerCase("en-GB"),nb=b.profile.student.trim().toLocaleLowerCase("en-GB");
 if(na&&nb&&na!==nb){if(decide("This browser contains progress for another student. Replace the browser record with the imported student record? (The existing record will no longer be available here unless previously downloaded.)"))return validate(b);throw Error("Import cancelled because the student names differ.");}
 const out=validate(a);
 for(const k of ["student","clazz","target"]){if(!out.profile[k]&&b.profile[k])out.profile[k]=b.profile[k];else if(out.profile[k]&&b.profile[k]&&out.profile[k]!==b.profile[k]){if(decide("Update "+k+" from '"+out.profile[k]+"' to '"+b.profile[k]+"'?"))out.profile[k]=b.profile[k]}}
 for(const [id,rec] of Object.entries(b.assessments)){
  if(!out.assessments[id])out.assessments[id]=rec;
  else if(JSON.stringify(out.assessments[id])!==JSON.stringify(rec)){
   if(decide("An existing "+(GROUPS.find(x=>x[0]===id)||[id,id])[1]+" result was found. Replace the current version with the imported one?"))out.assessments[id]=rec;
  }
 }
 return out;
}
function download(data){const d=validate(data),blob=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="KNGS_A_Level_Progress_"+(d.profile.student||"Student").replace(/[^a-z0-9-]/gi,"_").slice(0,45)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}
function upload(file,callback){
 if(!file)return;
 if(file.size>1024*1024){callback(Error("File is too large."));return}
 const reader=new FileReader();reader.onerror=()=>callback(Error("Unable to read the file."));reader.onload=()=>{
  try{const imported=validate(JSON.parse(reader.result));const merged=merge(load(),imported,message=>window.confirm(message));store(merged);callback(null,merged)}
  catch(err){callback(err)}
 };reader.readAsText(file);
}
global.KNGSProgress={GROUPS,GRADE,empty,load,store,validate,merge,download,upload};
})(window);
