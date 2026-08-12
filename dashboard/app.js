const state={period:'YTD 2026',source:'demo'};
const demo=window.SALES_DATA;
const ctx=document.getElementById('revenueChart');
const chart=new Chart(ctx,{type:'line',data:{labels:[],datasets:[{label:'Revenue (Rp M)',data:[],borderColor:'#2dd4bf',backgroundColor:'rgba(45,212,191,.08)',borderWidth:2.5,fill:true,tension:.38,pointRadius:3,pointHoverRadius:6,pointBackgroundColor:'#2dd4bf'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#07120f',borderColor:'rgba(45,212,191,.25)',borderWidth:1,displayColors:false,callbacks:{label:c=>` Rp ${Number(c.parsed.y).toFixed(1)} M`}}},scales:{x:{grid:{display:false},ticks:{color:'#66827b',font:{size:10}}},y:{grid:{color:'rgba(130,170,160,.06)'},ticks:{color:'#66827b',font:{size:10},callback:v=>`Rp ${v}M`}}}}});

const formatMoney=v=>`Rp ${(Number(v)/1000000).toLocaleString('id-ID',{maximumFractionDigits:1})} M`;
const formatNumber=v=>Number(v).toLocaleString('id-ID');

function render(payload){
  const s=payload.summary||{};
  state.source=payload.source||'api';
  document.getElementById('revenueKpi').textContent=payload.source==='demo'?s.revenue:formatMoney(s.revenue);
  document.getElementById('ordersKpi').textContent=payload.source==='demo'?s.orders:formatNumber(s.orders);
  document.getElementById('targetKpi').textContent=s.targetAchievement==null?'—':`${String(s.targetAchievement).replace('.',',')}%`;
  document.getElementById('conversionKpi').textContent=s.conversionRate==null?'—':`${String(s.conversionRate).replace('.',',')}%`;
  document.getElementById('revenueDelta').textContent=payload.source==='demo'?`▲ ${s.yoy} YoY`:'Data dari database';
  document.getElementById('targetDelta').textContent=s.targetAchievement==null?'Target belum dikonfigurasi':'Achievement terhadap target';
  document.getElementById('periodLabel').textContent=state.period;

  const trend=payload.trend||[];
  chart.data.labels=trend.map(x=>x.month);
  chart.data.datasets[0].data=trend.map(x=>payload.source==='demo'?Number(x):Number(x.revenue)/1000000);
  chart.update();

  document.getElementById('regionList').innerHTML=(payload.regions||[]).map(r=>`<div class="region-row"><div class="region-meta"><span>${r.name}</span><span>${r.achievement==null?'—':`${r.achievement}%`}</span></div><div class="bar"><i style="width:${r.achievement==null?0:Math.min(Number(r.achievement)-10,100)}%"></i></div></div>`).join('');
  document.getElementById('productRows').innerHTML=(payload.products||[]).map((p,i)=>`<tr><td><div class="product"><span class="avatar">${String.fromCharCode(65+i)}</span>${p.name}</div></td><td>${payload.source==='demo'?p.orders:formatNumber(p.orders)}</td><td>${payload.source==='demo'?p.revenue:formatMoney(p.revenue)}</td><td class="muted">—</td></tr>`).join('');
  document.getElementById('updatedAt').textContent=payload.source==='demo'?'Demo fallback aktif • belum terhubung ke database':'Database production • diperbarui '+new Date(payload.generatedAt).toLocaleString('id-ID');
}

function demoPayload(period){
  const p=demo.periods[period];
  return {source:'demo',summary:p,trend:p.trend.map((revenue,i)=>({month:demo.months[i],revenue})),regions:demo.regions,products:demo.products};
}

async function load(period=state.period){
  state.period=period;
  try{
    const response=await fetch(`/api/dashboard?period=${encodeURIComponent(period)}`,{headers:{Accept:'application/json'}});
    if(!response.ok) throw new Error(`API ${response.status}`);
    render(await response.json());
  }catch(error){
    console.warn('Production API unavailable; using demo fallback.',error);
    render(demoPayload(period));
  }
}

document.querySelectorAll('.nav button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('pageTitle').textContent=btn.dataset.title||'Dashboard Penjualan Nasional';}));
document.getElementById('period').addEventListener('change',e=>load(e.target.value));
document.getElementById('refresh').addEventListener('click',async e=>{const b=e.currentTarget;b.textContent='Memuat...';await load(state.period);b.textContent='Refresh';});
document.getElementById('export').addEventListener('click',()=>{const rows=[['Produk','Orders','Revenue'],...[...document.querySelectorAll('#productRows tr')].map(tr=>[...tr.querySelectorAll('td')].map(td=>td.innerText.replace(/\n/g,' '))];const csv=rows.map(r=>r.join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=`sales-dashboard-${state.period.toLowerCase().replaceAll(' ','-')}.csv`;a.click();URL.revokeObjectURL(a.href);});

load();
