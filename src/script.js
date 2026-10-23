var PERSONAJES=[
{nombre:"Aris",img:"src/images/aris.png",rol:"Debuffer"},
{nombre:"Bai Jiao",img:"src/images/baijiao.png",rol:"Debuffer"},
{nombre:"Bai Long",img:"src/images/bailong.png",rol:null},
{nombre:"Bi Dam",img:"src/images/bidam.png",rol:"Attack"},
{nombre:"Biscuit",img:"src/images/biscuit.png",rol:null},
{nombre:"Chole",img:"src/images/chole.png",rol:null},
{nombre:"Daisy",img:"src/images/daisy.png",rol:null},
{nombre:"Dellons",img:"src/images/Dellons.png",rol:null},
{nombre:"Deo",img:"src/images/deo.png",rol:null},
{nombre:"Dongyoung",img:"src/images/dongyoung.png",rol:null},
{nombre:"Eileene",img:"src/images/eileene.png",rol:null},
{nombre:"Espada",img:"src/images/espada.png",rol:null},
{nombre:"Evan",img:"src/images/evan.png",rol:"Tank"},
{nombre:"Fai",img:"src/images/fai.png",rol:null},
{nombre:"Feng Yan",img:"src/images/fengyan.png",rol:null},
{nombre:"Freyja",img:"src/images/freyja.png",rol:null},
{nombre:"Gelidus",img:"src/images/gelidus.png",rol:null},
{nombre:"Guan Yu",img:"src/images/guanyu.png",rol:null},
{nombre:"Hayeon",img:"src/images/hayeon.png",rol:null},
{nombre:"Heavenia",img:"src/images/heavenia.png",rol:null},
{nombre:"Joker",img:"src/images/joker.png",rol:null},
{nombre:"Karl Heron",img:"src/images/karlheron.png",rol:null},
{nombre:"Karon",img:"src/images/karon.png",rol:null},
{nombre:"Kyrielle",img:"src/images/kyrielle.png",rol:null},
{nombre:"Lania",img:"src/images/lania.png",rol:null},
{nombre:"Lina",img:"src/images/lina.png",rol:"Healer"},
{nombre:"Ling Ling",img:"src/images/lingling.png",rol:"Mage"},
{nombre:"Lu Bu",img:"src/images/lubu.png",rol:"Attack"},
{nombre:"Lucy",img:"src/images/lucy.png",rol:null},
{nombre:"Melia",img:"src/images/melia.png",rol:null},
{nombre:"Miho",img:"src/images/miho.png",rol:null},
{nombre:"Nezha",img:"src/images/nezha.png",rol:null},
{nombre:"Orly",img:"src/images/orly.png",rol:null},
{nombre:"Pascal",img:"src/images/pascal.png",rol:null},
{nombre:"Rachel",img:"src/images/rachel.png",rol:null},
{nombre:"Randgrid",img:"src/images/randgrid.png",rol:null},
{nombre:"Reginleif",img:"src/images/reginleif.png",rol:null},
{nombre:"Ruri",img:"src/images/ruri.png",rol:null},
{nombre:"Ryan",img:"src/images/ryan.png",rol:null},
{nombre:"Shane",img:"src/images/shane.png",rol:null},
{nombre:"Shinobu",img:"src/images/shinobu.png",rol:null},
{nombre:"Sieg",img:"src/images/sieg.png",rol:null},
{nombre:"Sun Wukong",img:"src/images/sunwukong.png",rol:null},
{nombre:"Sunran",img:"src/images/sunran.png",rol:null},
{nombre:"Taka",img:"src/images/taka.png",rol:null},
{nombre:"Tanjiro",img:"src/images/tanjiro.png",rol:null},
{nombre:"Vanessa",img:"src/images/vanessa.png",rol:null},
{nombre:"Xiao",img:"src/images/xiao.png",rol:null},
{nombre:"Xiao Qiao",img:"src/images/xiaoqiao.png",rol:null},
{nombre:"Yui",img:"src/images/yui.png",rol:null}
];
var MASCOTAS=[
{nombre:"Ventoso",img:"src/images/ventoso.png",rol:null},
{nombre:"Jeo",img:"src/images/Jeo.png",rol:null}
];
var PJ={};PERSONAJES.concat(MASCOTAS).forEach(function(p){PJ[p.nombre]=p});
var D=[
["Expedición de los Adviento","Teo Shadow",[PJ["Pascal"],PJ["Xiao"],PJ["Kyrielle"],PJ["Vanessa"],PJ["Dongyoung"],PJ["Miho"],PJ["Orly"],PJ["Biscuit"],PJ["Xiao Qiao"],PJ["Daisy"]]],
["Expedición de los Adviento","Kyle Shadow",[PJ["Fai"],PJ["Shane"],PJ["Sunran"],PJ["Randgrid"],PJ["Guan Yu"],PJ["Heavenia"],PJ["Dellons"],PJ["Biscuit"],PJ["Lina"],PJ["Bai Long"]]],
["Expedición de los Adviento","Yeonhee Shadow",[PJ["Dongyoung"],PJ["Vanessa"],PJ["Chole"],PJ["Ruri"],PJ["Orly"],PJ["Miho"],PJ["Biscuit"],PJ["Lina"],PJ["Nezha"],PJ["Sun Wukong"]]],
["Expedición de los Adviento","Karma Shadow",[PJ["Taka"],PJ["Sunran"],PJ["Karl Heron"],PJ["Randgrid"],PJ["Feng Yan"],PJ["Lu Bu"],PJ["Guan Yu"],PJ["Ryan"],PJ["Rachel"],PJ["Biscuit"]]],
["Expedición de los Adviento","Dios Destrucción",[PJ["Pascal"],PJ["Sunran"],PJ["Miho"],PJ["Xiao Qiao"],PJ["Reginleif"]]],
["Incursión Avanzada","Calistra",[PJ["Biscuit"],PJ["Sunran"],PJ["Rachel"],PJ["Fai"],PJ["Guan Yu"]]],
["Incursión Avanzada","Astrea",[PJ["Biscuit"],PJ["Miho"],PJ["Espada"],PJ["Daisy"],PJ["Orly"]]],
["Incursión Avanzada","Leonid",[PJ["Lu Bu"],PJ["Biscuit"],PJ["Guan Yu"],PJ["Xiao"],PJ["Bai Long"]]],
["Asedio","Ventisca Spike",[PJ["Sunran"],PJ["Feng Yan"],PJ["Biscuit"],PJ["Rachel"],PJ["Ryan"]]],
["Asedio","Muerte Dellions",[PJ["Rachel"],PJ["Biscuit"],PJ["Sunran"],PJ["Deo"],PJ["Ryan"]]],
["Asedio","Inmortal Rachel",[PJ["Lina"],PJ["Biscuit"],PJ["Nezha"],PJ["Ryan"],PJ["Miho"]]],
["Asedio","Infierno Jave",[PJ["Rachel"],PJ["Ryan"],PJ["Biscuit"],PJ["Sieg"],PJ["Eileene"]]],
["Asedio","Guardián Rudy",[PJ["Miho"],PJ["Biscuit"],PJ["Nezha"],PJ["Evan"],PJ["Orly"]]],
["Asedio","Llama Eileene",[PJ["Miho"],PJ["Nezha"],PJ["Lina"],PJ["Biscuit"],PJ["Chole"]]],
["Asedio","Oscuridad Kris",[PJ["Heavenia"],PJ["Eileene"],PJ["Biscuit"],PJ["Xiao"],PJ["Shane"]]],
["Power Up Honguitos","Fuego",[PJ["Lucy"],PJ["Heavenia"],PJ["Gelidus"],PJ["Yui"],PJ["Lania"]]],
["Power Up Honguitos","Agua",[PJ["Hayeon"],PJ["Dongyoung"],PJ["Feng Yan"],PJ["Shinobu"],PJ["Bai Jiao"]]],
["Power Up Honguitos","Tierra",[PJ["Rachel"],PJ["Tanjiro"],PJ["Sunran"],PJ["Sieg"],PJ["Fai"]]],
["Power Up Honguitos","Luz",[PJ["Joker"],PJ["Bai Jiao"],PJ["Chole"],PJ["Ling Ling"],PJ["Aris"]]],
["Power Up Honguitos","Oscuridad",[PJ["Bai Jiao"],PJ["Xiao"],PJ["Bi Dam"],PJ["Freyja"],PJ["Hayeon"]]],
["Incursiones","Letal",[PJ["Biscuit"],PJ["Sunran"],PJ["Shane"],PJ["Yui"],PJ["Sieg"]]],
["Incursiones","Red Ox",[PJ["Biscuit"],PJ["Espada"],PJ["Karon"],PJ["Daisy"],PJ["Orly"]]],
["Incursiones","Come Hierros",[PJ["Biscuit"],PJ["Sunran"],PJ["Pascal"],PJ["Melia"],PJ["Xiao Qiao"]]]
];
var CAT=[["Expedición de los Adviento","#4aa3ff","🧭","Expedición","de los Adviento"],["Incursión Avanzada","#b86bff","🔮","Incursión","Avanzada"],["Asedio","#ff4d5e","⚔️","Asedio",""],["Power Up Honguitos","#5de07a","🍄","Power Up","Honguitos"],["Incursiones","#f5a623","👹","Incursiones",""]];
var ROLEC={"Healer":"#f5d142","Debuffer":"#b86bff","Attack":"#ff4d5e","Mage":"#4aa3ff","Mago":"#4aa3ff","Tank":"#a0693b"};
function rol(n){return PJ[n]&&PJ[n].rol}
function rtag(n){var c=ROLEC[rol(n)]||"var(--gold)";return '<span class="rl" style="color:'+c+';border-color:'+c+'">'+rol(n)+'</span>'}
var col={},P={};
CAT.forEach(function(c){col[c[0]]=c[1]});
D.forEach(function(d){d[2].forEach(function(o){var n=o.nombre,p=P[n]||(P[n]={n:n,t:0,c:{}});p.t++;(p.c[d[0]]=p.c[d[0]]||[]).push(d[1])})});
var all=Object.keys(P).map(function(k){return P[k]});
var term="",cat=null,boss=null,mode="az";
function $(i){return document.getElementById(i)}
function hue(c){var h=0;for(var i=0;i<c.length;i++)h=(h*31+c.charCodeAt(i))%360;return h}
function ini(n){var p=n.split(" ");return(p.length>1?p[0][0]+p[1][0]:n.slice(0,2)).toUpperCase()}
function img(n){return PJ[n]&&PJ[n].img}
function avh(n){var h1=hue(n);if(img(n))return '<div class="av im" style="background-image:url('+img(n)+')"></div>';return '<div class="av" style="background:linear-gradient(135deg,hsl('+h1+',60%,45%),hsl('+(h1+40)+',60%,28%))">'+ini(n)+'</div>'}
function leg(){var h="";CAT.forEach(function(c){h+='<button class="lg'+(cat==c[0]?' on':'')+'" style="--c:'+c[1]+'" data-k="'+c[0]+'"><span class="ic">'+c[2]+'</span><span><b>'+c[3]+'</b><br>'+c[4]+'</span></button>'});$("leg").innerHTML=h}
function render(){
var f=all.filter(function(p){return !p.pet&&p.n.toLowerCase().indexOf(term)>-1&&(!cat||p.c[cat])&&(!boss||p.c[cat].indexOf(boss)>-1)});
f.sort(function(a,b){return mode=="az"?a.n.localeCompare(b.n):(b.t-a.t||a.n.localeCompare(b.n))});
var h="";
f.forEach(function(p,i){
var h1=hue(p.n),ls="",first=true;
CAT.forEach(function(c){var b=p.c[c[0]];if(!b)return;
ls+='<div class="ln" style="color:'+c[1]+'">'+(first?'':'-- ')+'<b>'+c[0]+'</b> - '+b.join(", ")+'</div>';first=false});
h+='<div class="r" data-c="'+p.n+'"><div class="no">'+(i+1)+'</div>'+avh(p.n)+'<div class="tx"><div class="nm">'+p.n+(rol(p.n)?rtag(p.n):'')+'</div></div></div>'});
$("list").innerHTML=h||'<div class="empty">Sin resultados</div>';
$("fbox").innerHTML=boss?fm(boss):"";$("cnt").textContent=f.length+" de "+all.filter(function(p){return !p.pet}).length+" personajes"+(cat?" · "+(boss||cat):"")}
$("q").oninput=function(){term=this.value.trim().toLowerCase();render()};
$("sort").onclick=function(){mode=mode=="az"?"top":"az";this.textContent=mode=="az"?"A–Z":"Más usados";render()};
$("leg").onclick=function(e){var b=e.target.closest(".lg");if(!b)return;var k=b.getAttribute("data-k");cat=cat==k?null:k;boss=null;refresh()};
leg();render();
var T=D.length,rk=all.slice().sort(function(a,b){return b.t-a.t||a.n.localeCompare(b.n)}),lim=15,sel=null,curC=CAT[0][0];
function pc(n){return Math.round(n/T*100)}
function sav(n){return avh(n)}
function sChips(){var h="";CAT.forEach(function(c){h+='<button class="sc'+(c[0]==curC?' on':'')+'" style="--c:'+c[1]+'" data-k="'+c[0]+'">'+c[0]+'</button>'});$("schips").innerHTML=h}
var teams=[],sk=[],TT=T;
function agg(){teams=D.filter(function(d){return(!cat||d[0]==cat)&&(!boss||d[1]==boss)});var m={};teams.forEach(function(d){d[2].forEach(function(o){m[o.nombre]=(m[o.nombre]||0)+1})});sk=Object.keys(m).map(function(n){return{n:n,t:m[n]}}).sort(function(a,b){return b.t-a.t||a.n.localeCompare(b.n)});TT=teams.length}
function pf(n){return Math.round(n/TT*100)}
function sPod(){agg();$("stitle").textContent="Top de uso"+(cat?" · "+(boss||cat):"")+" ("+TT+" equipos)";var o=[1,0,2],m=["🥈","🥇","🥉"],h="";o.forEach(function(i,k){var p=sk[i];if(!p)return;h+='<div class="sp'+(i==0?' f':'')+'" data-c="'+p.n+'"><div class="medal">'+m[k]+'</div>'+sav(p.n)+'<b>'+p.n+'</b><span>'+p.t+' de '+TT+' ('+pf(p.t)+'%)</span></div>'});$("spod").innerHTML=h}
function sRank(){var h="";(lim?sk.slice(0,lim):sk).forEach(function(p,i){h+='<div class="sr" data-c="'+p.n+'"><span class="no">'+(i+1)+'</span>'+sav(p.n)+'<div class="mid"><div class="t">'+p.n+'<i>'+p.t+' ('+pf(p.t)+'%)</i></div><div class="sb"><div style="width:'+Math.round(p.t/sk[0].t*100)+'%;background:linear-gradient(90deg,'+(i==0?'#f5b301,#ff4d5e':'#4aa3ff,#b86bff')+')"></div></div></div></div>'});$("srank").innerHTML=h;var more=lim&&sk.length>lim;$("smore").style.display=more?"inline-block":"none";$("smore").textContent="Ver los "+(sk.length-lim)+" restantes"}
function sModes(){var c=cat||curC,h="";$("schips").style.display=cat?"none":"flex";D.forEach(function(d){if(d[0]!=c||(boss&&d[1]!=boss))return;h+='<div class="smc" style="--c:'+col[d[0]]+'"><h3>'+d[1]+'</h3><div class="spsc">';d[2].forEach(function(o){var n=o.nombre;h+='<button class="spl'+(n==sel?' sel':'')+'" data-c="'+n+'">'+n+'</button>'});h+='</div>'+fm(d[1])+'</div>'});$("smodes").innerHTML=h}
var FORM={
"Ventisca Spike":{al:"3-2",fr:["Feng Yan","Biscuit","Rachel"],bk:["Sunran","Ryan"],pet:["Ventoso"]},
"Muerte Dellions":{al:"3-2",fr:["Biscuit","Deo","Rachel"],bk:["Sunran","Ryan"],pet:["Ventoso"]},
"Inmortal Rachel":{al:"4-1",fr:["Lina","Biscuit","Ryan","Miho"],bk:["Nezha"],pet:["Ventoso"]},
"Infierno Jave":{al:"3-2",fr:["Sieg","Biscuit","Eileene"],bk:["Ryan","Rachel"],pet:["Ventoso"]},
"Guardián Rudy":{al:"4-1",fr:["Miho","Biscuit","Orly","Evan"],bk:["Nezha"],pet:["Ventoso"]},
"Llama Eileene":{al:"4-1",fr:["Chole","Lina","Biscuit","Miho"],bk:["Nezha"],pet:["Ventoso"]},
"Oscuridad Kris":{al:"4-1",fr:["Xiao","Biscuit","Eileene","Heavenia"],bk:["Shane"],pet:["Ventoso"]},
"Dios Destrucción":{al:"4-1",fr:["Reginleif","Xiao Qiao","Miho","Sunran"],bk:["Pascal"],pet:["Jeo"]},
"Teo Shadow":{al:"4-1",fr:["Kyrielle","Vanessa","Dongyoung","Xiao"],bk:["Pascal"],pet:["Jeo"],alternativas:[{al:"3-2",fr:["Miho","Orly","Biscuit"],bk:["Xiao Qiao","Daisy"],pet:["Ventoso"]}]},
"Kyle Shadow":{al:"3-2",fr:["Fai","Sunran","Guan Yu"],bk:["Shane","Randgrid"],pet:["Jeo"],alternativas:[{al:"4-1",fr:["Heavenia","Dellons","Biscuit","Lina"],bk:["Bai Long"],pet:["Ventoso"]}]},
"Yeonhee Shadow":{al:"4-1",fr:["Dongyoung","Vanessa","Orly","Chole"],bk:["Ruri"],pet:["Jeo"],alternativas:[{al:"2-3",fr:["Miho","Biscuit"],bk:["Lina","Nezha","Sun Wukong"],pet:["Ventoso"]}]},
"Karma Shadow":{al:"2-3",fr:["Sunran","Randgrid"],bk:["Taka","Karl Heron","Feng Yan"],pet:["Jeo"],alternativas:[{al:"4-1",fr:["Lu Bu","Guan Yu","Rachel","Biscuit"],bk:["Ryan"],pet:["Ventoso"]}]},
"Calistra":{al:"3-2",fr:["Biscuit","Rachel","Guan Yu"],bk:["Sunran","Fai"],pet:["Ventoso"],pri:["2da de Biscuit","1ra de Rachel","1ra de Fai","2da de Sunran","3ra de Sunran"]},
"Astrea":{al:"4-1",fr:["Biscuit","Miho","Daisy","Espada"],bk:["Orly"],pet:["Ventoso"],pri:["2da de Biscuit","1ra de Daisy","2da de Espada","2da de Daisy","1ra de Espada","1ra de Miho"]},
"Leonid":{al:"4-1",fr:["Lu Bu","Xiao","Biscuit","Guan Yu"],bk:["Bai Long"],pet:["Ventoso"],pri:["2da de Biscuit","2da de Guan Yu","1ra de Lu Bu","2da de Taka","1ra de Taka"]},
"Fuego":{al:"4-1",fr:["Heavenia","Lucy","Gelidus","Yui"],bk:["Lania"],pet:["Ventoso"],pri:["1ra de Gelidus","2da de Gelidus","3ra de Heavenia"]},
"Agua":{al:"4-1",fr:["Dongyoung","Hayeon","Feng Yan","Bai Jiao"],bk:["Shinobu"],pet:["Ventoso"],pri:["2da de Bai Jiao","2da de shinobu","2da de dongyoung","3ra de hayeon"]},
"Tierra":{al:"4-1",fr:["Randgrid","Tanjiro","Sieg","Rachel"],bk:["Fai"],pet:["Ventoso"],pri:["2da Fai","1ra de Fai","2da de Tanjiro","3ra de Tanjiro","2da de Rachel"]},
"Luz":{al:"4-1",fr:["Xiao Qiao","Joker","Aris","Chole"],bk:["Bai Jiao"],pet:["Ventoso"],pri:["2ra de Bai Jiao","2da de Chole","2da de Bai Jiao","2da de Xiao Qiao","2da de Joker","3ra de Aris"]},
"Oscuridad":{al:"4-1",fr:["Bi Dam","Freyja","Xiao","Hayeon"],bk:["Bai Jiao"],pet:["Ventoso"],pri:["1ra de Hayeon","2da de Xiao","1ra de Bai Jiao","2da de Xiao","3ra de Hayeon","2da de Bi Dam","2da de Freyja","1ra de Bi Dam"]},
"Red Ox":{al:"4-1",fr:["Biscuit","Orly","Karon","Daisy"],bk:["Espada"],pet:["Ventoso"],pri:["2da de Biscuit","1ra de Daisy","2da de Espada","1ra de Espada","2da de Daisy","2da de Karon","1ra de Karon"]},
"Letal":{al:"3-2",fr:["Biscuit","Sieg","Yui"],bk:["Sunran","Shane"],pet:["Ventoso"],pri:["2da de biscuit","2da de Shane","1ra de Sunran","2da de Yui","2da de Sunran","3ra de sunran","1ra de Sieg"]},
"Come Hierros":{al:"3-2",fr:["Biscuit","Melia","Sunran"],bk:["Xiao Qiao","Pascal"],pet:["Ventoso"],pri:["2da de Biscuit","2da de Xiao Qiao","1ra de Xiao Qiao","1ra de Pascal","2da de Pascal"]},
};
function pets(f){var a=(f.pet||[]).slice();(f.alternativas||[]).forEach(function(x){(x.pet||[]).forEach(function(n){if(a.indexOf(n)<0)a.push(n)})});return a}
["Ventoso","Jeo"].forEach(function(n){var q={n:n,t:0,c:{},pet:true,petCount:0};D.forEach(function(d){var f=FORM[d[1]];if(f&&pets(f).indexOf(n)>-1){q.petCount++;(q.c[d[0]]=q.c[d[0]]||[]).push(d[1])}});if(!P[n]){P[n]=q;all.push(q)}});
(function(){D.forEach(function(d){var f=FORM[d[0]]||FORM[d[1]];if(!f)return;var t=f.fr.concat(f.bk).slice().sort().join(),u=d[2].map(function(o){return o.nombre}).sort().join();if(d[0]=="Asedio"&&t!=u)console.warn("Alineación no coincide con el equipo:",d[1])})})();
function fm(b){var f=FORM[b];if(!f)return"";function row(l,a){var h='<div class="fr"><span class="fl">'+l+'</span>';a.forEach(function(n){h+='<button class="ft2" data-c="'+n+'">'+avh(n)+'<i>'+n+'</i></button>'});return h+'</div>'}function lineup(x){return'<div class="fh">Alineación <b>'+x.al+'</b></div>'+row("Adelante",x.fr)+row("Atrás",x.bk)+row("Mascota",x.pet||[])}function prow(a){if(!a.length)return'<div class="fr"><span class="fl"> </span></div>';var h='<div class="fh">Prioridad habilidad</div><div class="fr"><span class="fl"> </span><div class="fsc">';a.forEach(function(n,i){var k=hue(n);h+='<div class="ft2"><div class="av pn" style="background:linear-gradient(135deg,hsl('+k+',60%,45%),hsl('+(k+40)+',60%,28%))">'+(i+1)+'</div><i>'+n+'</i></div>'});return h+'</div></div>'}var h='<div class="fm">',al=f.alternativas||[];if(al.length){h+='<div class="fph">';[f].concat(al).forEach(function(x,i){h+='<div class="fp"><div class="fpt">Fase '+(i+1)+'</div>'+lineup(x)+'</div>'});h+='</div>'}else h+=lineup(f);return h+prow(f.pri||[])+'</div>'}
$("fbox").onclick=function(e){var b=e.target.closest("[data-c]");if(b)openM(b.getAttribute("data-c"))};
function bch(){var el=$("bchips");if(!cat){el.style.display="none";el.innerHTML="";return}var h='';D.forEach(function(d){if(d[0]==cat)h+='<button class="sc'+(boss==d[1]?' on':'')+'" style="--c:'+col[cat]+'" data-k="'+d[1]+'">'+d[1]+'</button>'});el.innerHTML=h;el.style.display="flex"}
function refresh(){lim=15;leg();bch();render();sPod();sRank();sModes();mStats()}
$("bchips").onclick=function(e){var b=e.target.closest(".sc");if(!b)return;var k=b.getAttribute("data-k");boss=boss==k?null:k;refresh()};
function sDet(){var d=$("sdet");if(!sel){d.className="sdet";d.innerHTML="";return}var p=P[sel];var h='<div class="hh">'+sav(sel)+'<div><div class="bg">'+sel+'</div><div class="sub">Aparece en '+p.t+' de '+T+' equipos ('+pc(p.t)+'%)</div></div><button class="x" id="sx" aria-label="Cerrar">✕</button></div><div class="lis">';D.forEach(function(x){if(x[2].indexOf(PJ[sel])>-1)h+='<div class="li"><b>'+x[1]+'</b><span style="background:'+col[x[0]]+'">'+x[0]+'</span></div>'});d.innerHTML=h+'</div>';d.className="sdet show";$("sx").onclick=function(){pick(null)}}
function pick(n){sel=n;sModes();if(n)openM(n);else closeM()}
function openM(n){var p=P[n],r=1;all.forEach(function(q){if(q.t>p.t)r++});
var h='<button class="mx" id="mx" aria-label="Cerrar">✕</button><div class="mi" style="'+(img(n)?'background-image:url('+img(n)+')':'background:linear-gradient(135deg,hsl('+hue(n)+',60%,45%),hsl('+(hue(n)+40)+',60%,28%))')+'">'+(img(n)?'':ini(n))+'</div><div class="mn">'+n+'</div>'+(rol(n)?'<div class="ms">Rol: <b style="color:'+(ROLEC[rol(n)]||'inherit')+'">'+rol(n)+'</b></div>':'')+(p.pet?'<div class="ms">🐾 Mascota · usada en '+p.petCount+' de '+T+' equipos ('+pc(p.petCount)+'%)</div><div class="mbar"><div style="width:'+pc(p.petCount)+'%"></div></div>':'<div class="ms">Aparece en '+p.t+' de '+T+' equipos ('+pc(p.t)+'%) · puesto '+r+' en uso</div><div class="mbar"><div style="width:'+Math.round(p.t/rk[0].t*100)+'%"></div></div>');
CAT.forEach(function(c){var b=p.c[c[0]];if(!b)return;h+='<div class="mg" style="--c:'+c[1]+'"><b>'+c[0]+'</b>';b.forEach(function(x){h+='<span>'+x+'</span>'});h+='</div>'});
$("mbody").innerHTML=h;$("mo").className="mo show";document.body.style.overflow="hidden";$("mx").onclick=closeM}
function closeM(){$("mo").className="mo";document.body.style.overflow="";if(sel){sel=null;sModes()}}
$("mo").onclick=function(e){if(e.target===this)closeM()};
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeM()});
$("list").onclick=function(e){var r=e.target.closest(".r");if(r)openM(r.getAttribute("data-c"))};
function tab(n){["vL","vS","vM"].forEach(function(v,i){$(v).style.display=n==i+1?"block":"none"});["tL","tS","tM"].forEach(function(t,i){$(t).className=n==i+1?"on":""})}
$("tL").onclick=function(){tab(1)};$("tS").onclick=function(){tab(2)};$("tM").onclick=function(){tab(3)};
$("smore").onclick=function(){lim=0;sRank()};
["spod","srank","smodes"].forEach(function(id){$(id).onclick=function(e){var b=e.target.closest("[data-c]");if(b)pick(b.getAttribute("data-c"))}});
$("schips").onclick=function(e){var b=e.target.closest(".sc");if(b){curC=b.getAttribute("data-k");sChips();sModes()}};
sPod();sRank();sChips();sModes();
function mStats(){var ts=D.filter(function(d){return(!cat||d[0]==cat)&&(!boss||d[1]==boss)}),m={},n=ts.length;
ts.forEach(function(d){var f=FORM[d[1]];(f?pets(f):[]).forEach(function(x){m[x]=(m[x]||0)+1})});
var k=Object.keys(m).map(function(x){return{n:x,t:m[x]}}).sort(function(a,b){return b.t-a.t||a.n.localeCompare(b.n)});
function q(t){return n?Math.round(t/n*100):0}
$("mtitle").textContent="Uso de mascotas"+(cat?" · "+(boss||cat):"")+" ("+n+" equipos)";
var md=["🥈","🥇","🥉"],h="";[1,0,2].forEach(function(i,j){var p=k[i];if(!p)return;h+='<div class="sp'+(i==0?' f':'')+'" data-c="'+p.n+'"><div class="medal">'+md[j]+'</div>'+sav(p.n)+'<b>'+p.n+'</b><span>'+p.t+' de '+n+' ('+q(p.t)+'%)</span></div>'});$("mpod").innerHTML=h;
h="";k.forEach(function(p,i){h+='<div class="sr" data-c="'+p.n+'"><span class="no">'+(i+1)+'</span>'+sav(p.n)+'<div class="mid"><div class="t">'+p.n+'<i>'+p.t+' de '+n+' ('+q(p.t)+'%)</i></div><div class="sb"><div style="width:'+q(p.t)+'%;background:linear-gradient(90deg,'+(i==0?'#f5b301,#ff4d5e':'#4aa3ff,#b86bff')+')"></div></div></div></div>'});
$("mrank").innerHTML=h||'<div class="empty">Sin mascotas registradas</div>';
h="";CAT.forEach(function(c){if(cat&&c[0]!=cat)return;var bs=D.filter(function(d){return d[0]==c[0]&&(!boss||d[1]==boss)}),mm={};
bs.forEach(function(d){var f=FORM[d[1]];(f?pets(f):[]).forEach(function(x){(mm[x]=mm[x]||[]).push(d[1])})});
var ks=Object.keys(mm).sort(function(a,b){return mm[b].length-mm[a].length||a.localeCompare(b)});if(!ks.length)return;
h+='<div class="smc" style="--c:'+c[1]+'"><h3>'+c[0]+'</h3>';
ks.forEach(function(x){var t=mm[x].length;h+='<div class="sr" data-c="'+x+'">'+sav(x)+'<div class="mid"><div class="t">'+x+'<i>'+t+' de '+bs.length+' ('+Math.round(t/bs.length*100)+'%)</i></div><div class="sb"><div style="width:'+Math.round(t/bs.length*100)+'%;background:'+c[1]+'"></div></div><div class="bs">'+mm[x].join(" · ")+'</div></div></div>'});
h+='</div>'});$("mmodes").innerHTML=h||'<div class="empty">Sin datos</div>'}
["mpod","mrank","mmodes"].forEach(function(id){$(id).onclick=function(e){var b=e.target.closest("[data-c]");if(b)openM(b.getAttribute("data-c"))}});
mStats();
