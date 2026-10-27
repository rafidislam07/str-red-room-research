export const roomNames={living:'Living areas',kitchen:'Kitchens',sleeping:'Sleeping areas',bathroom:'Bathrooms',outdoor:'Outdoor & spa',playroom:'Play area'};

function photoButton(photo,id,title,esc,extra='') {
  return `<button class="review-photo ${extra}" data-photo-open="${id}:${photo.index}" aria-label="Enlarge ${esc(title)}: ${esc(roomNames[photo.room]||'listing photo')}"><img src="${esc(photo.path)}" alt="${esc(title)} — ${esc(roomNames[photo.room]||'listing photo')}, source photo ${photo.index}" width="480" height="320" loading="lazy"><span>${esc(roomNames[photo.room]||'Listing photo')} · ${photo.index} <b aria-hidden="true">↗</b></span></button>`;
}

export function roomToolbar({room='all',adultId,P,esc}) {
  const available=['all','living','kitchen','sleeping','bathroom','outdoor'];
  if(P.profiles[adultId]?.rooms.playroom)available.push('playroom');
  return `<div class="photo-room-toolbar"><span class="overline">COMPARE BY ROOM</span><div class="photo-room-tabs" role="group" aria-label="Room photo comparison">${available.map(key=>`<button class="button subtle" data-photo-room="${key}" aria-pressed="${room===key}">${esc(key==='all'?'All photos':roomNames[key])}</button>`).join('')}</div><p>Tap any photo to enlarge it. Use the arrows to browse that property’s reviewed photos.</p></div>`;
}

export function roomGallery({id,review,label,title,url,P,room='all',esc}) {
  const all=P.profiles[id]?.photos||review.photos.map(p=>({...p,room:null}));
  const photos=room==='all'?all:all.filter(p=>p.room===room);
  return `<article class="visual-reference room-photo-reference"><div class="visual-photo-heading"><span class="overline">${label}</span><h4>${esc(title)}</h4><small>${photos.length} reviewed ${photos.length===1?'photo':'photos'}${room!=='all'?' · '+esc(roomNames[room]):''}</small></div><div class="visual-photo-grid ${room!=='all'?'one-room':''}">${photos.map(p=>photoButton(p,id,title,esc)).join('')||'<p class="missing-room-photo">No reviewed photo for this category. This does not establish that a room or amenity is absent.</p>'}</div><p>${esc(review.observations)}</p><details class="visual-coverage"><summary>Coverage notes & source photographs</summary><p>${esc(review.limitations)}</p>${photos.map(photo=>`<a href="${esc(photo.source_url)}" target="_blank" rel="noopener noreferrer">Source photo ${photo.index} ↗</a>`).join(' · ')}</details><a class="text-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Open listing ↗</a></article>`;
}

export function roomMatrix({r,P,room='all',chosenId,esc}) {
  const category=room==='all'?'bathroom':room;
  const selected=r.comps.filter(c=>c.focus_status==='selected');
  const entries=[{id:r.adult_id,title:r.name,adult:true},...selected.map(c=>({id:c.comp_id,title:c.comp_title,adult:false}))];
  return `<section class="photo-room-matrix" aria-label="Room comparison across the selected set"><div class="room-matrix-heading"><span class="overline">THE WHOLE SELECTED SET · ${selected.length} CONVENTIONAL COMPS</span><h4>${esc(roomNames[category])} at a glance.</h4><p>Adult property plus every selected conventional comp. Optional reserves remain outside this set.</p></div><div class="room-matrix-grid">${entries.map(e=>{const photo=P.profiles[e.id]?.photos.find(p=>p.room===category);return `<article class="room-matrix-card ${e.adult?'adult':''} ${e.id===chosenId?'inspected':''}" data-room-card="${e.id}"><span class="overline">${e.adult?'ADULT REFERENCE':'SELECTED CONVENTIONAL COMP'}</span><h5>${esc(e.title)}</h5>${photo?photoButton(photo,e.id,e.title,esc):'<div class="missing-room-photo">No reviewed photo in this category.<br>Missing coverage does not mean the feature is absent.</div>'}${!e.adult?`<button class="mini-link" data-inspect-focused="${e.id}">Compare with the adult property ↑</button>`:''}</article>`;}).join('')}</div><p class="chart-note">Room labels were checked against the actual photographs. A play area is not labeled as a sleeping room. Photos show advertised presentation; scale, material grades and physical condition are not established by appearance.</p></section>`;
}
