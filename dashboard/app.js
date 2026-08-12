const state={period:'YTD 2026'};
const data=window.SALES_DATA;
const ctx=document.getElementById('revenueChart');
const chart=new Chart(ctx,{type:'line',data:{labels:data.months,datasets:[{label:'Revenue (Rp M)',data:[],borderColor:'#2dd4bf',backgroundColor:'rgba(45,212,191,.08)',borderWidth:2.5,fill:true,tension:.38,pointRadius:3,pointHoverRadius:6,pointBackgroundColor:'#2dd4bf'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#07120f',borderColor:'rgba(45,212,191,.25)',borderWidth:1,displayColors:false,callbacks:{label:c=>` Rp ${c.parsed.y.toFixed(1)} M`}}},scales:{x:{grid:{display:false},ticks:{color:'#66827b',font:{size:10}}},y:{grid:{color:'rgba(130,170,160,.06)'},ticks:{color:'#66827b',font:{size:10},callback:v=>`Rp ${v}M`}}}}});

function render(period=state.period){
  state.period=period;
  const p=data.periods[period];
  document.getElementById('revenueKpi').textContent=p.revenue;
  document.getElementById('ordersKpi').textContent=p.orders;
  document.getElementById('targetKpi').textContent=p.target;
  document.getElementById('conversionKpi').textContent=p.conversion;
  document.getElementById('revenueDelta').textContent=`▲ ${p.yoy} YoY`;
  document.getElementById('targetDelta').textContent=`● ${p.target==='94,8%'?'5,2%':'pencapaian'} terhadap target`;
  document.getElementById('periodLabel').textContent=period;
  chart.data.labels=period==='Juli 2026'?['Jul']:period==='Q3 2026'?['Mei','Jun','Jul','Agu']:data.months;
  chart.data.datasets[0].data=p.trend;
  chart.update();
  document.getElementById('regionList').innerHTML=data.regions.map((r,i)=>`<div class="region-row"><div class="region-meta"><span>${r.name}</span><span>${r.achievement}%</span></div><div class="bar"><i style="width:${Math.min(r.achievement-10,100)}%"></i></div></div>`).join('');
  document.getElementById('productRows').innerHTML=data.products.map(p=>`<tr><td><div class="product"><span class="avatar">${p.name.slice(-1)}</span>${p.name}</div></td><td>${p.orders}</td><td>${p.revenue}</td><td class="${p.growth>=10?'up':p.growth>=0?'warn':'down'}">${p.growth>0?'+':''}${p.growth.toFixed(1).replace('.',',')}%</td></tr>`).join('');
}

document.querySelectorAll('.nav button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('pageTitle').textContent=btn.dataset.title||'Dashboard Penjualan Nasional';}));
document.getElementById('period').addEventListener('change',e=>render(e.target.value));
document.getElementById('refresh').addEventListener('click',e=>{const b=e.currentTarget;b.textContent='Memuat...';setTimeout(()=>{render(state.period);b.textContent='Refresh';document.getElementById('updatedAt').textContent=`Data simulasi diperbarui ${new Date().toLocaleTimeString('id-ID')}`;},500);});
document.getElementById('export').addEventListener('click',()=>{const rows=[['Produk','Orders','Revenue','Growth'],...data.products.map(p=>[p.name,p.orders,p.revenue,`${p.growth}%`])];const csv=rows.map(r=>r.join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=`sales-dashboard-${state.period.toLowerCase().replaceAll(' ','-')}.csv`;a.click();URL.revokeObjectURL(a.href);});
render();
