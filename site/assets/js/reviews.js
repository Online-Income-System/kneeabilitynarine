/* Renders hero rating badges + review carousel from /data/reviews.json */
(async function () {
  let data;
  try {
    const res = await fetch('/data/reviews.json');
    data = await res.json();
  } catch (e) { return; }

  const stars = (n) => '★'.repeat(Math.round(n));

  /* Hero badges */
  const badges = document.getElementById('rating-badges');
  if (badges) {
    const items = [];
    if (data.google && data.google.rating) {
      items.push({ src: 'Google', rating: data.google.rating, count: data.google.reviewCount, url: data.google.profileUrl });
    }
    if (data.yelp && data.yelp.rating) {
      items.push({ src: 'Yelp', rating: data.yelp.rating, count: data.yelp.reviewCount, url: data.yelp.profileUrl });
    }
    badges.innerHTML = items.map((b) => `
      <a class="badge" href="${b.url}" target="_blank" rel="noopener">
        <span class="badge-src">${b.src}</span>
        <span class="stars" aria-hidden="true">${stars(b.rating)}</span>
        <span class="badge-meta">${b.rating.toFixed(1)}${b.count ? ' · ' + b.count + ' reviews' : ''}</span>
      </a>`).join('');
  }

  /* Carousel: featured reviews, duplicated once for a seamless loop */
  const track = document.getElementById('carousel-track');
  if (track) {
    const featured = (data.reviews || []).filter((r) => r.featured);
    const card = (r) => `
      <article class="review-card">
        <div class="stars" aria-label="${r.rating} star review">${stars(r.rating)}</div>
        <p class="outcome">${r.outcome}</p>
        <blockquote>“${r.text}”</blockquote>
        <div class="review-meta">
          <span class="author">${r.author}</span>
          <span class="src">${r.source === 'google' ? 'Google review' : 'Yelp review'}</span>
        </div>
      </article>`;
    track.innerHTML = featured.map(card).join('') + featured.map(card).join('');
  }
})();
