import type { CategorySlug, Silhouette, Tone } from "./types";

/**
 * Ruhaniat Journal — articles.
 *
 * To publish a new article: copy one entry, give it a new unique `slug` (this becomes
 * the URL /journal/<slug>), choose a `category`, a `cover` illustration (silhouette + tone),
 * and write the body as a list of blocks. Reading time is worked out automatically.
 */

export type JournalCategory = "heritage" | "styling" | "latest" | "fabric";

export const journalCategories: Record<JournalCategory, { name: string; description: string }> = {
  heritage: {
    name: "Punjabi Fashion & Heritage",
    description: "Where our suits come from — phulkari, salwar styles and the clothes of earlier generations.",
  },
  styling: {
    name: "Suit Styling Ideas",
    description: "Necklines, sleeves, dupattas and small details that change how a suit looks.",
  },
  latest: {
    name: "Latest Design Ideas",
    description: "New silhouettes and combinations worth considering for your next outfit.",
  },
  fabric: {
    name: "Fabric & Stitching Guide",
    description: "Practical advice on choosing fabric, picking a design and caring for stitched outfits.",
  },
};

/** Background and text colours for each Journal theme. */
export const journalThemes: Record<JournalCategory, { bg: string; text: string; accent: string; line: string }> = {
  heritage: { bg: "bg-[#3b1219]", text: "text-ivory", accent: "text-gold-soft", line: "border-gold-soft/40" },
  styling: { bg: "bg-blush", text: "text-burgundy-deep", accent: "text-burgundy", line: "border-burgundy/25" },
  latest: { bg: "bg-beige", text: "text-burgundy-deep", accent: "text-gold", line: "border-gold/40" },
  fabric: { bg: "bg-ivory-deep", text: "text-burgundy-deep", accent: "text-gold", line: "border-gold/40" },
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; title: string; text: string }
  /** Shows one of our designs (from designs.ts) as an illustrated figure. */
  | { type: "design"; ref: string };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  /** Cover illustration — same silhouettes and colour stories as the design sketches. */
  cover: { silhouette: Silhouette; tone: Tone };
  /** ISO date, e.g. "2026-11-12" */
  publishedOn: string;
  body: Block[];
  /** Design references from designs.ts */
  relatedDesigns: string[];
  relatedCollection?: CategorySlug;
  /** Further reading — reliable sources the article draws on. */
  sources?: { label: string; url: string }[];
}

export const articles: Article[] = [
  {
    slug: "phulkari-punjab-embroidery-guide",
    title: "Phulkari: The Embroidery That Carries Punjab's Story",
    excerpt:
      "What phulkari actually is, how it is made, the difference between a phulkari and a bagh — and how to bring it into a suit today.",
    category: "heritage",
    cover: { silhouette: "salwar", tone: "heritage" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-026", "RS-009", "RS-025"],
    relatedCollection: "modern-bibiyaan-de-designs",
    sources: [
      {
        label: "Ministry of Textiles, Office of the Development Commissioner (Handicrafts) — Phulkari",
        url: "https://handicrafts.gov.in/crafts/All_Crafts/Craft_Categories/Textile/Embroidery/Phulkari/Phulkariwebpage.html",
      },
      { label: "Philadelphia Museum of Art — Phulkari collection", url: "https://philamuseum.org/collection/curated/phulkari" },
    ],
    body: [
      {
        type: "p",
        text: "Ask almost any Punjabi family about phulkari and someone will remember a chunni folded away in a trunk — bright silk thread on a coarse cotton base, brought out only for weddings. The word itself means \"flower work\", and for generations it has been one of the most recognisable crafts of Punjab.",
      },
      { type: "h2", text: "How phulkari is made" },
      {
        type: "p",
        text: "Traditional phulkari is worked mainly in darning stitch — long and short straight stitches — and it is stitched from the reverse side of the cloth, so the pattern appears on the front. The base was usually khaddar, a hand-spun, hand-woven cotton, often in shades like red, rust, white or dark blue. The embroidery thread was soft, untwisted silk, which is what gives phulkari its glow.",
      },
      { type: "design", ref: "RS-026" },
      {
        type: "p",
        text: "Because the design is built by counting threads in the base fabric, phulkari motifs are strongly geometric — diamonds, triangles, stripes and stylised flowers. That geometry is what makes it so easy to recognise even from across a room.",
      },
      { type: "h2", text: "Phulkari or bagh?" },
      {
        type: "p",
        text: "In a phulkari, the motifs are spread out and you can still see the base cloth between them. In a bagh — the word means \"garden\" — the embroidery covers almost the entire surface, so the cloth disappears under the silk. A bagh takes far more time and thread, and was usually kept for the most important occasions.",
      },
      { type: "design", ref: "RS-025" },
      { type: "h2", text: "Wearing phulkari today" },
      {
        type: "list",
        items: [
          "Pair a phulkari dupatta with a plain suit in one of its thread colours — let the dupatta do the talking.",
          "Use a phulkari border only at the neckline, sleeves or hem of a kameez for a quieter look.",
          "For festive wear, a plain silk or cotton-silk suit with a full phulkari dupatta is hard to beat.",
          "If you have an old family phulkari, it can often be framed into a new outfit as a dupatta border — bring it to us and we can discuss what is possible without damaging it.",
        ],
      },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "When the dupatta is busy, keep the kameez neckline simple — a round neck with piping or a small V lets the embroidery stay the hero.",
      },
    ],
  },
  {
    slug: "punjabi-salwar-styles-guide",
    title: "Patiala, Dhoti or Straight? A Guide to Punjabi Salwar Styles",
    excerpt:
      "The salwar decides how a whole suit falls and moves. Here is how the main Punjabi salwar styles differ, and which one suits which occasion.",
    category: "heritage",
    cover: { silhouette: "patiala", tone: "mustard" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-009", "RS-012", "RS-001", "RS-025"],
    relatedCollection: "punjabi-salwar-suits",
    body: [
      {
        type: "p",
        text: "We often choose a suit by its kameez — the colour, the neckline, the embroidery. But the salwar quietly decides the silhouette. The same kameez looks completely different over a full Patiala salwar than over a straight pant.",
      },
      { type: "h2", text: "The classic salwar" },
      {
        type: "p",
        text: "A salwar is loose through the hips and legs and gathered at the ankle into a cuff (the mohri). The traditional Punjabi salwar is generous but not heavily pleated, which makes it comfortable for long days — the everyday choice for many of our mothers and grandmothers.",
      },
      { type: "h2", text: "Patiala salwar" },
      {
        type: "p",
        text: "Named after the city of Patiala, this style has many deep pleats stitched into the waist, so the fabric falls in heavy folds down to a fitted cuff. It needs noticeably more fabric than a regular salwar, and soft fabrics such as cotton, cotton-silk or crepe drape best. It is usually paired with a shorter kameez so the folds can show.",
      },
      { type: "design", ref: "RS-009" },
      { type: "h2", text: "Dhoti salwar" },
      {
        type: "p",
        text: "A dhoti salwar is cut and stitched to look draped, with a cowl of folds falling at the front. It pairs well with short kurtis and gives a festive, slightly modern look without losing the Punjabi feel.",
      },
      { type: "h2", text: "Straight pants and cigarette pants" },
      {
        type: "p",
        text: "Straight-cut pants keep the line clean and are easy for work and travel. They work well under longer kameez and with structured fabrics like cotton, linen or khadi.",
      },
      { type: "h2", text: "Which salwar for which kameez?" },
      {
        type: "list",
        items: [
          "Short kameez (hip to mid-thigh): Patiala or dhoti salwar.",
          "Knee-length kameez: classic salwar or straight pants.",
          "Long or flared kameez: straight pants or churidar for balance.",
          "Daily wear in summer: a classic salwar in cotton or mulmul.",
        ],
      },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "Tell us the occasion and how much movement you need. A Patiala that looks wonderful at a function may feel heavy for a full workday.",
      },
    ],
  },
  {
    slug: "modern-bibiyaan-old-punjabi-suit-designs",
    title: "What Our Bibiyaan Wore — and Why It Still Looks Beautiful",
    excerpt:
      "Loose kameez, cuffed sleeves, borders at every edge and a dupatta worn with pride. A look at older Punjabi suit details we love bringing back.",
    category: "heritage",
    cover: { silhouette: "straight", tone: "sand" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-025", "RS-027", "RS-028", "RS-026"],
    relatedCollection: "modern-bibiyaan-de-designs",
    body: [
      {
        type: "p",
        text: "Look through an old family album and the suits feel instantly familiar — yet different from what we see in shops today. They were cut for comfort and for work, and decorated where it mattered: at the neck, the cuffs, the hem and, above all, the dupatta.",
      },
      { type: "design", ref: "RS-027" },
      { type: "h2", text: "Details that defined older Punjabi suits" },
      {
        type: "list",
        items: [
          "Looser kameez with straight side seams, often with kalis (panels) for movement.",
          "Simple round or square necklines, sometimes closed with a tie-dori, finished with piping.",
          "Sleeves finished with cuffs, buttons or a contrast band.",
          "Borders — gota, tilla or a printed edge — at the neck, sleeves and hem.",
          "A full salwar, and a dupatta large enough to cover the head.",
        ],
      },
      { type: "h2", text: "How Punjabi dressing has changed" },
      {
        type: "p",
        text: "Over the decades, fits have generally become closer to the body, kameez lengths have moved up and down with fashion, and new bottoms such as palazzos and shararas have joined the salwar. Machine embroidery and printed fabrics made decoration easier and cheaper. But the basic grammar — kameez, bottom and dupatta — has stayed remarkably constant.",
      },
      { type: "design", ref: "RS-028" },
      { type: "h2", text: "Bringing it back, with today's fit" },
      {
        type: "p",
        text: "Our Modern Bibiyaan De Designs take these older details and stitch them to your measurements: the cuffed sleeve, the dori neck, the border at the hem — with a fit that suits how you live now. If you have a photograph of a suit your mother or nani wore, send it to us. Recreating a family style is one of our favourite kinds of order.",
      },
    ],
  },
  {
    slug: "simple-suit-elegant-styling-ideas",
    title: "Seven Ways to Make a Simple Suit Look Elegant",
    excerpt:
      "You don't need heavy embroidery to look dressed up. Small stitching choices — piping, a better neckline, the right length — make a plain suit feel special.",
    category: "styling",
    cover: { silhouette: "straight", tone: "sage" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-001", "RS-004", "RS-002", "RS-029"],
    relatedCollection: "daily-wear-suits",
    body: [
      {
        type: "p",
        text: "Most of the suits we wear are simple — cotton for the day, something soft for the evening. The difference between \"plain\" and \"elegant\" is usually in the stitching details, not the price of the fabric.",
      },
      { type: "h2", text: "1. Get the fit right" },
      { type: "p", text: "A well-fitted shoulder and the right armhole make even the simplest cotton suit look tailored. This is the biggest advantage of custom stitching." },
      { type: "h2", text: "2. Add piping" },
      { type: "p", text: "A thin contrast piping at the neckline, cuffs and slits frames the suit and makes it look finished." },
      { type: "h2", text: "3. Choose a neckline with shape" },
      { type: "p", text: "Swap a basic round neck for a square neck, a shallow sweetheart or a mandarin collar. The neckline is the first thing people see." },
      { type: "h2", text: "4. Use one detail, not five" },
      { type: "p", text: "Pick one focus — lace on the sleeves, buttons down the placket, or a small yoke — and keep the rest calm." },
      { type: "h2", text: "5. Mind the proportions" },
      { type: "p", text: "Match the kameez length to the bottom: short with fuller salwars, longer with straight pants. Balanced proportions look intentional." },
      { type: "h2", text: "6. Upgrade the dupatta" },
      { type: "p", text: "A contrast dupatta — chiffon with a lace edge, or a printed mulmul — can lift a plain suit instantly." },
      { type: "design", ref: "RS-004" },
      { type: "h2", text: "7. Finish the hem and slits" },
      { type: "p", text: "Faced hems, neat slits and a small tassel or latkan at the tie are quiet details that read as quality." },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "Bring us a plain fabric and tell us where you'll wear it. We'll suggest one or two details that suit it rather than overloading the design.",
      },
    ],
  },
  {
    slug: "neckline-sleeve-design-ideas",
    title: "Necklines, Sleeves & Cuffs: Design Ideas for Your Next Suit",
    excerpt:
      "A quick guide to popular neckline and sleeve options, what each one suits, and how to pair them.",
    category: "styling",
    cover: { silhouette: "anarkali", tone: "rani" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-005", "RS-006", "RS-008", "RS-030", "RS-027"],
    relatedCollection: "stylish-suits",
    body: [
      {
        type: "p",
        text: "When customers describe the suit they want, they almost always start with the neck and the sleeves. These two choices decide much of a suit's character.",
      },
      { type: "h2", text: "Neckline ideas" },
      {
        type: "list",
        items: [
          "Round neck with piping — timeless, works with every fabric.",
          "Square neck — clean and slightly vintage; lovely with borders.",
          "V-neck — elongates the neck; easy for daily wear.",
          "Sweetheart — soft and festive; suits anarkalis and short kurtis.",
          "Mandarin or band collar — neat and modern, good for office wear.",
          "Keyhole with a tie-dori — a traditional Punjabi favourite.",
          "Boat neck — elegant on fine fabrics such as chanderi.",
        ],
      },
      { type: "design", ref: "RS-008" },
      { type: "h2", text: "Sleeve ideas" },
      {
        type: "list",
        items: [
          "Three-quarter straight sleeves — the everyday classic.",
          "Full sleeves with a buttoned cuff — a heritage detail that looks very smart.",
          "Bell sleeves — dramatic and feminine; best in soft fabrics.",
          "Cape or sheer sleeves — for festive and occasion wear.",
          "Puff sleeves — playful with short kurtis and shararas.",
          "Cut sleeves (slits along the sleeve) — light and modern for summer.",
        ],
      },
      { type: "h2", text: "Pairing them" },
      {
        type: "p",
        text: "As a rule, a detailed neckline pairs with a simple sleeve, and a statement sleeve with a quiet neck. If both are busy, the suit can feel crowded.",
      },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "Send us a photo of a neckline you like together with the fabric you have. Some necklines need body in the fabric to hold their shape — we'll tell you honestly what will work.",
      },
    ],
  },
  {
    slug: "dupatta-styling-ideas",
    title: "Five Ways to Wear a Dupatta",
    excerpt:
      "The dupatta is the soul of a Punjabi suit. Five simple drapes — from everyday to wedding — and how to choose the right dupatta for each.",
    category: "styling",
    cover: { silhouette: "patiala", tone: "blush" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-026", "RS-010", "RS-036"],
    relatedCollection: "punjabi-salwar-suits",
    body: [
      {
        type: "p",
        text: "A suit without its dupatta feels unfinished. How you drape it changes the whole look — and the right drape depends on the fabric, the occasion and how much you'll be moving.",
      },
      { type: "h2", text: "1. Over both shoulders" },
      { type: "p", text: "The classic: draped across the front with both ends falling behind. Simple, graceful and practical for daily wear." },
      { type: "h2", text: "2. One shoulder" },
      { type: "p", text: "Pinned on one shoulder and left to fall freely. Shows off a detailed neckline and works well with anarkalis and shararas." },
      { type: "h2", text: "3. Over the head" },
      {
        type: "p",
        text: "The traditional way for gurdwara visits, ceremonies and the Anand Karaj. A larger dupatta in a soft fabric sits best — a phulkari or a bordered chunni is perfect.",
      },
      { type: "design", ref: "RS-036" },
      { type: "h2", text: "4. Across the front, cape style" },
      { type: "p", text: "Draped across the chest and over both shoulders like a shawl — elegant in winter or with heavy dupattas." },
      { type: "h2", text: "5. Around the neck" },
      { type: "p", text: "Looped loosely around the neck with ends at the back. Casual, modern and comfortable for travel." },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "If you'll wear the dupatta on your head for a ceremony, choose a lighter fabric or ask us for a slightly longer length so it stays in place comfortably.",
      },
    ],
  },
  {
    slug: "gharara-vs-sharara-vs-palazzo",
    title: "Gharara, Sharara or Palazzo? Choosing Your Flared Look",
    excerpt:
      "They're often confused, but each one is cut differently. How to tell them apart, where each one comes from, and which suits your occasion.",
    category: "latest",
    cover: { silhouette: "gharara", tone: "emerald" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-013", "RS-018", "RS-021", "RS-035"],
    relatedCollection: "gharara-suits",
    sources: [
      { label: "Rana Safvi — Kahaani Gharara Ki: The Story of the Gharara", url: "https://ranasafvi.com/kahaani-gharara-ki-the-story-of-the-gharara/" },
    ],
    body: [
      {
        type: "p",
        text: "All three are wide-legged and all three feel festive, so it's no surprise they get mixed up. The difference is in where the flare begins.",
      },
      { type: "h2", text: "Gharara — the flare starts at the knee" },
      {
        type: "p",
        text: "A gharara is fitted from the waist to around the knee, where a seam joins it to a lot of flared fabric. That knee joint is often covered with a band of gota or embroidery. The gharara is closely associated with the courtly dress of Awadh and Lucknow, and it remained a favourite for weddings well into the twentieth century.",
      },
      { type: "design", ref: "RS-013" },
      { type: "h2", text: "Sharara — the flare starts at the waist" },
      {
        type: "p",
        text: "A sharara is wide from the waist down, flaring gradually to the hem with no knee joint. It's easier to move in than a gharara and works beautifully with short kurtis and peplum tops — a lovely choice for mehndi, sangeet and family functions.",
      },
      { type: "h2", text: "Palazzo — straight and wide" },
      {
        type: "p",
        text: "Palazzos fall straight from the waist in a wide, relaxed leg. They are the most comfortable of the three and easy to dress up or down: a cotton palazzo for daily wear, an embroidered one for festive evenings.",
      },
      {
        type: "list",
        items: [
          "Wedding function or bridal look: gharara.",
          "Mehndi, sangeet, festive family gathering: sharara.",
          "Office, travel, everyday or relaxed festive: palazzo.",
        ],
      },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "Ghararas and shararas need generous fabric. Tell us how much fabric you have and we'll suggest which flare is possible — or how to combine it with a contrast fabric.",
      },
    ],
  },
  {
    slug: "plain-fabric-suit-design-ideas",
    title: "Have Plain Fabric? How to Choose the Right Suit Design",
    excerpt:
      "Plain fabric is a blank canvas. How to choose a neckline, sleeves and bottom that suit your fabric — and when to add contrast.",
    category: "fabric",
    cover: { silhouette: "salwar", tone: "ivory" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-004", "RS-008", "RS-011", "RS-022"],
    relatedCollection: "daily-wear-suits",
    body: [
      {
        type: "p",
        text: "Many of our customers come with a lovely plain fabric and no idea what to make of it. Good news: plain fabric gives you the most design freedom of all.",
      },
      { type: "h2", text: "Let the design add the interest" },
      {
        type: "p",
        text: "With a printed fabric, the print does the work, so the cut should stay simple. With plain fabric it's the opposite — this is where a detailed neckline, pintucks, a contrast yoke, lace or piping really shines.",
      },
      { type: "h2", text: "Match the neckline to the fabric" },
      {
        type: "list",
        items: [
          "Crisp fabrics (cotton, khadi, chanderi, raw silk) hold structured shapes — square necks, collars, sweetheart necks and yokes.",
          "Soft fabrics (georgette, chiffon, mulmul, crepe) suit soft shapes — gathered necks, V-necks, keyholes with ties — and usually need a lining.",
          "Heavier fabrics (velvet, thick silk) look best with clean, simple necklines and minimal seams.",
        ],
      },
      { type: "design", ref: "RS-011" },
      { type: "h2", text: "Add contrast thoughtfully" },
      {
        type: "p",
        text: "A plain suit comes alive with one contrast: a printed dupatta, a contrast salwar, coloured piping or an embroidered border. One contrast feels considered; three can feel busy.",
      },
      { type: "h2", text: "Check the quantity" },
      {
        type: "p",
        text: "Before you fall in love with a Patiala, gharara or anarkali, check how much fabric you have — these styles need considerably more than a straight suit. Measure your fabric and send us the length and width; we'll tell you what's possible.",
      },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "Send a photo of your fabric in daylight. Colours look very different under indoor lights, and we want to suggest details that truly match.",
      },
    ],
  },
  {
    slug: "suit-fabric-guide-and-care",
    title: "Daily Wear or Occasion? Choosing Fabric — and Caring for Stitched Suits",
    excerpt:
      "Which fabrics work for everyday comfort, which ones are made for functions, and simple care habits that keep stitched outfits looking new.",
    category: "fabric",
    cover: { silhouette: "palazzo", tone: "indigo" },
    publishedOn: "2026-11-12",
    relatedDesigns: ["RS-001", "RS-002", "RS-016", "RS-034"],
    relatedCollection: "daily-wear-suits",
    body: [
      { type: "h2", text: "Fabrics for daily wear" },
      {
        type: "list",
        items: [
          "Cotton and cambric — breathable, easy to wash, holds a crisp shape.",
          "Mulmul — very soft and light; perfect for hot summers.",
          "Rayon — drapes well and feels smooth; good for palazzos.",
          "Linen and khadi — textured and cool, with a relaxed, natural look.",
        ],
      },
      { type: "h2", text: "Fabrics for occasions" },
      {
        type: "list",
        items: [
          "Silk and cotton-silk — a soft sheen and good structure for festive suits.",
          "Chanderi — light with a subtle shine; lovely for day functions.",
          "Georgette and chiffon — flowing; ideal for anarkalis, shararas and dupattas.",
          "Organza and net — for sheer sleeves, overlays and dupattas.",
          "Velvet — rich and warm for winter weddings.",
        ],
      },
      { type: "design", ref: "RS-016" },
      { type: "h2", text: "Caring for stitched outfits" },
      {
        type: "list",
        items: [
          "Wash dark and bright cottons separately for the first few washes.",
          "Hand-wash embroidered pieces gently in cold water, inside out — or dry-clean heavy work such as zari, gota and sequins.",
          "Dry in the shade; strong sun fades colour quickly.",
          "Iron embroidered areas from the reverse, over a soft cloth.",
          "Store occasion wear folded in a cotton or muslin cloth, not plastic, and refold now and then so creases don't set.",
          "Keep metallic embroidery away from damp and perfume to stop it tarnishing.",
        ],
      },
      {
        type: "tip",
        title: "Ruhaniat tip",
        text: "If you're unsure about a fabric, tell us how and where you'll wear the outfit. We'll suggest a fabric — or work with the one you already have.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function readingTime(a: Article) {
  const words = a.body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "design" ? "" : `${"title" in b ? b.title : ""} ${b.text}`))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

export function articlesForDesign(ref: string, limit = 2) {
  return articles.filter((a) => a.relatedDesigns.includes(ref)).slice(0, limit);
}

export function articlesForCollection(slug: CategorySlug, limit = 3) {
  return articles.filter((a) => a.relatedCollection === slug).slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
