import React, { useState } from "react";
import { Play } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   YOUTUBE EMBED — facade pattern, deliberately.

   A raw <iframe src="youtube.com/embed/..."> pulls roughly 1MB of YouTube
   JavaScript into the page on load, sets cookies before the reader has
   touched anything, and is usually the single worst thing on a page's Core
   Web Vitals. On an article whose entire job is to rank, that is a bad
   trade for a video most readers will not press play on.

   So: render the poster frame and a play button as static HTML, and only
   swap in the real iframe on click. Nothing from youtube.com loads until
   the reader asks for it. Thumbnails come from i.ytimg.com, which is a
   plain image host and sets no cookies.

   The <noscript> fallback means the video is still reachable with
   JavaScript disabled, and the link in it is a real crawlable href.

   Usage from a markdown body (see markdownOptions in BlogPost.tsx):
       <YouTube id="dQw4w9WgXcQ" title="How to do a tibialis raise" />  */

type Props = {
  /** The 11-character YouTube video ID, not the full URL. */
  id: string;
  /** Used as the iframe title and the visible caption. Required: this is
   *  the accessible name of the embed and it is read by crawlers. */
  title: string;
  /** Optional caption shown under the player. */
  caption?: string;
};

export default function YouTubeEmbed({ id, title, caption }: Props) {
  const [playing, setPlaying] = useState(false);

  /* maxresdefault is not generated for every upload; hqdefault always is.
     Fall back on error rather than showing a broken image. */
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  );

  const watchUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <figure className="my-10">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-xl shadow-green-brand/10">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            <img
              src={thumb}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() =>
                setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
              }
            />
            <span className="absolute inset-0 bg-slate-900/25 group-hover:bg-slate-900/15 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-20 h-20 rounded-full bg-green-brand text-white shadow-2xl shadow-green-brand/40 transition-transform group-hover:scale-110">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>

      <noscript>
        <p className="mt-3 text-base text-slate-600">
          Watch on YouTube:{" "}
          <a href={watchUrl} className="text-green-brand underline">
            {title}
          </a>
        </p>
      </noscript>

      <figcaption className="mt-3 text-base text-slate-500 leading-relaxed">
        {caption ?? title}
      </figcaption>
    </figure>
  );
}
