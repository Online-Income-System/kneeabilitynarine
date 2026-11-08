/* Verbatim reviews from Narine's live Google Business Profile (complete pull,
   2026-07-08) and Yelp (10 captured). `featured` marks carousel cards.
   Duplicate people across platforms must never show twice in one loop. */

export const GOOGLE = {
  rating: 5.0,
  reviewCount: 20,
  url: "https://maps.app.goo.gl/zUVS28wV8JxydBJK9",
};

export const YELP = {
  // TODO: overall rating + total review count from the Yelp page.
  // The 10 captured Yelp reviews are all 5 stars.
  rating: null as number | null,
  reviewCount: null as number | null,
  url: "https://www.yelp.com/biz/knee-ability-narine-san-fernando-valley",
};

export type Review = {
  source: "google" | "yelp";
  author: string;
  outcome: string;
  text: string;
  featured: boolean;
};

export const REVIEWS: Review[] = [
  {
    source: "google",
    author: "Mary G.",
    outcome: "Knee surgery recovery: back to regular hikes, best shape in years",
    text: "I had knee surgery almost 2 years ago and my recovery was very slow and 7 months after my surgery I found Narine through Instagram and I thank God I did. From the start she knew what to do, where and how to start my recovery and now a year later not only my recovery is great that I'm able to do my regular hikes and be more active without knee pain, another great factor is I've been in the best shape that I haven't been in a long long time.",
    featured: true,
  },
  {
    source: "google",
    author: "Luiza B.",
    outcome: "2 years of hip & back pain: pain-free in 4 months, no more Advil",
    text: "This annoying and lingering pain limited my activity with my kids, and kept me up at night for almost two years. I found myself reaching for Advil most nights to help me sleep. From day one, she took the time to assess my injury and help me understand the root problem. Here I am 4 months later, enjoying my day with no hip or back pain...and no Advil!",
    featured: true,
  },
  {
    source: "google",
    author: "Caroline Y.",
    outcome: "Knee & ankle pain from hiking: now pain-free on harder hikes",
    text: "Her training has been a game changer for me. I was experiencing knee and ankle pain from hiking in both legs. After working with Narine, I am pain free! I can tackle much more difficult hikes than I ever could before - now without pain. Once physical therapy is done, you need to see Narine for continuous rehab and strength building.",
    featured: true,
  },
  {
    source: "yelp",
    author: "Aramos M.",
    outcome: "Son back to wrestling: full activity in 2 weeks",
    text: "We're so grateful to Narine for helping my 16-year-old son recover from a serious right knee injury. After two months off from training, he was back to full activity in just two weeks under her care. He's now preparing for his upcoming competition season in wrestling. Outstanding work and absolutely worth every dollar.",
    featured: true,
  },
  {
    source: "google",
    author: "Isabella S.",
    outcome: "2 years of knee pain: walking 20-25k steps a day on vacation",
    text: "I've been struggling with knee pain for the past two years (thank you menopause), and nothing seemed to help. At the end of that first session I noticed my knees felt less tight and lighter. I went on a week long trip and was able to keep up with walking 20-25k steps per day. She adjusts exercises according to your needs, always making safety and healing a priority.",
    featured: true,
  },
  {
    source: "yelp",
    author: "Darren H.",
    outcome: "Golf swing: 5-10 more yards per shot via mobility & strength",
    text: "I came to her looking to be more flexible and mobile to help me out with my golf swing. I noticed a significant improvement in my swing a month later. My distances improved by 5-10 yards per shot and most importantly, my accuracy improved. Narine does not have a 'one-size-fits-all' program. She will custom tailor a training regimen based on your goals.",
    featured: true,
  },
  {
    source: "google",
    author: "John E.",
    outcome: "3 knee surgeries, 13+ years of pain: out of pain in months",
    text: "The walking backwards was the baseline protocol, and that immediately removed pain as I started to engage muscle groups I hadn't used in years, stabilizers around the knee. From there, I was able to actually build strength in my upper quad, which was always a challenge as my range of motion was limited.",
    featured: true,
  },
  {
    source: "google",
    author: "Lola C.",
    outcome: "Knee pain gone fast. 1.5 years in, strongest she has ever been",
    text: "Narine has been such a gift! I've been with her for 1.5 years now!! and it blows me away to feel the difference. First of all my knee pains are gone. That happened pretty fast with her. Then gradually as I'm getting stronger we're unlocking fitness, flexibility and strength that I've never had. She's a gem of a human and a top notch trainer.",
    featured: true,
  },
  {
    source: "yelp",
    author: "Michele D.",
    outcome: "Listens to what your body is telling her",
    text: "Not only is she passionate about what she does, she is also very knowledgeable. She explains things very well and not only does she listen to you, she listens to what your body is telling her and adjusts accordingly. If you're rehabing or want to improve your strength, she's awesome and she's fun!",
    featured: true,
  },
  {
    source: "yelp",
    author: "K I.",
    outcome: "Training safely past 40 after years of martial arts",
    text: "After years of martial arts, my body has taken a beating, and after 40, recovery is not what it used to be. Thanks to Narine's deep knowledge of the human body at every stage of life and her ability to modify exercises, I have been able to continue training safely and consistently.",
    featured: true,
  },
];
