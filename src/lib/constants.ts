import { BlogPost, ContentBlock, ReviewItem } from '@/types'

export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Alphabetic A-Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Latest arrivals' },
  { slug: 'priceInUSD', reverse: false, title: 'Price: Low to high' }, // asc
  { slug: '-priceInUSD', reverse: true, title: 'Price: High to low' },
]

export const CATEGORIES = [
  'All',
  'Buying Guides',
  'Maintenance',
  'Trail Riding',
  'Financing',
  'Brand Reviews',
  'Safety',
]

export const POSTS: BlogPost[] = [
  {
    slug: 'best-atv-brands-2024',
    title: 'Best ATV Brands of 2024: Polaris vs Can-Am vs Honda — Which Should You Buy?',
    excerpt:
      "We break down the top three ATV brands head-to-head across performance, reliability, parts availability, and value. Whether you're a trail rider or a work-horse buyer, we help you decide.",
    category: 'Brand Reviews',
    author: 'Marcus Reid',
    date: 'May 12, 2025',
    readTime: '9 min read',
    featured: true,
  },
  {
    slug: 'no-credit-check-atv-financing-guide',
    title: 'No Credit Check ATV Financing: Everything You Need to Know in 2025',
    excerpt:
      "Bad credit shouldn't stop you from riding. Here's a full breakdown of how no-credit-check ATV financing works, what to expect, and how to get approved in under 24 hours.",
    category: 'Financing',
    author: 'Tanya Owens',
    date: 'Apr 28, 2025',
    readTime: '7 min read',
    featured: true,
  },
  {
    slug: 'atv-maintenance-checklist',
    title: 'The Ultimate ATV Maintenance Checklist Every Owner Needs',
    excerpt:
      'From oil changes to brake pads and air filters — this checklist covers everything you need to keep your ATV running strong all season long.',
    category: 'Maintenance',
    author: 'Jake Morales',
    date: 'Apr 15, 2025',
    readTime: '6 min read',
  },
  {
    slug: 'top-trail-riding-destinations-usa',
    title: 'Top 10 ATV Trail Riding Destinations in the USA for 2025',
    excerpt:
      'From the red dirt trails of Moab to the dense forests of Tennessee, we ranked the best off-road riding destinations in America so you can plan your next adventure.',
    category: 'Trail Riding',
    author: 'Marcus Reid',
    date: 'Mar 30, 2025',
    readTime: '11 min read',
  },
  {
    slug: 'new-vs-used-atv-buying-guide',
    title: 'New vs Used ATV: Which Is the Better Buy for Your Situation?',
    excerpt:
      'Buying a used ATV can save you thousands — but it also comes with risks. We compare new and used side by side so you make the right call for your budget and riding style.',
    category: 'Buying Guides',
    author: 'Tanya Owens',
    date: 'Mar 18, 2025',
    readTime: '8 min read',
  },
  {
    slug: 'youth-atv-safety-guide',
    title: 'Youth ATV Safety Guide: How to Choose the Right Ride for Your Kids',
    excerpt:
      'Engine size, age recommendations, helmets, and training — everything parents need to know before putting their kids on a quad.',
    category: 'Safety',
    author: 'Jake Morales',
    date: 'Mar 5, 2025',
    readTime: '5 min read',
  },
  {
    slug: 'polaris-sportsman-850-review',
    title: 'Polaris Sportsman 850 Trail Review: Is It Still the King of Mid-Range ATVs?',
    excerpt:
      "We put the Sportsman 850 Trail through its paces across mud, rocks, and steep climbs. Here's our honest verdict after 200+ miles in the saddle.",
    category: 'Brand Reviews',
    author: 'Marcus Reid',
    date: 'Feb 20, 2025',
    readTime: '10 min read',
  },
  {
    slug: 'how-to-ship-atv-nationwide',
    title: 'How Nationwide ATV Delivery Works — And What to Expect on Delivery Day',
    excerpt:
      "Buying an ATV online and having it shipped to your door is easier than ever. Here's what the process looks like from order to your driveway.",
    category: 'Buying Guides',
    author: 'Tanya Owens',
    date: 'Feb 8, 2025',
    readTime: '5 min read',
  },
  {
    slug: 'can-am-outlander-vs-polaris-sportsman',
    title: 'Can-Am Outlander vs Polaris Sportsman: The Definitive 2025 Comparison',
    excerpt:
      'Two legendary utility ATVs, one decision. We stack them up on power, suspension, towing, tech, and price to give you a clear winner for your needs.',
    category: 'Brand Reviews',
    author: 'Marcus Reid',
    date: 'Jan 25, 2025',
    readTime: '12 min read',
  },
]

export const BLOG_CONTENTS: Record<string, ContentBlock[]> = {
  'best-atv-brands-2024': [
    {
      type: 'paragraph',
      text: "Choosing an ATV isn't just about selecting a machine; it's about investing in a platform. In 2024, the flagship battle lines are clearly drawn between Polaris's engineering flexibility, Can-Am's raw engine horsepower, and Honda's bulletproof mechanical reliability.",
    },
    { type: 'heading', level: 2, text: 'Polaris: The Comfort and Innovation Standard' },
    {
      type: 'paragraph',
      text: 'Polaris continues to dominate market share because of their legendary independent rear suspension (IRS) and premium rider ergonomics. On long trail days, a Polaris Sportsman handles chassis roll and deep ruts with minimal feedback transferring to the handlebars.',
    },
    {
      type: 'callout',
      items: [
        'Pro: Unmatched plush ride quality across rocky trails',
        'Pro: Active Descent Control (ADC) works flawlessly on steep grades',
        'Con: Requires more frequent bushing and grease maintenance schedules',
      ],
    },
    { type: 'heading', level: 2, text: 'Can-Am: Performance-First Rotax Powerhouses' },
    {
      type: 'paragraph',
      text: 'If raw straight-line acceleration and aggressive mud-churning capabilities are your priority, Can-Am dominates. Their Rotax V-Twin engines scream with a power profile that feels exciting every time you press down the thumb throttle. However, this high performance demands premium fuel and diligent component inspection.',
    },
    {
      type: 'blockquote',
      text: 'If you want to pull stumps or win drag races through mud pits, buy a Can-Am. If you want your back to feel good after an 8-hour mountain utility trek, look toward Polaris.',
      caption: 'Marcus Reid — Brand Review Lead',
    },
    { type: 'heading', level: 2, text: 'Honda: Unmatched Mechanical Longevity' },
    {
      type: 'paragraph',
      text: "Honda foregoes flashy touchscreens and high-horsepower stats in exchange for iron-clad, absolute dependability. Using automotive-style dual-clutch transmissions (DCT) instead of traditional rubber CVT belts means you don't break belts deep in the backcountry.",
    },
    {
      type: 'table',
      tableHeader: ['Metric / Feature', 'Polaris Sportsman', 'Can-Am Outlander', 'Honda Foreman'],
      tableRows: [
        [
          'Primary Advantage',
          'Ride Comfort & Ergonomics',
          'Raw Engine Horsepower',
          'Lifelong Gear Reliability',
        ],
        [
          'Transmission Type',
          'Automatic PVT (Belt Driven)',
          'CVT with Extra Low (Belt Driven)',
          'Automated Dual-Clutch (No Belts)',
        ],
        [
          'Maintenance Interval',
          'Moderate (Every 50 Hours)',
          'Rigorous (Every 50 Hours)',
          'Low (Annual Fluid Swap)',
        ],
      ],
    },
  ],

  'no-credit-check-atv-financing-guide': [
    {
      type: 'paragraph',
      text: "Securing funding for premium powersports equipment shouldn't be gated behind ancient banking scores. In 2025, alternative dealer-backed underwriting has opened high-performance quads to thousands of riders across the country through streamlined verification paths.",
    },
    { type: 'heading', level: 2, text: 'How No-Credit-Check Financing Differs' },
    {
      type: 'paragraph',
      text: 'Traditional lending requires a pristine credit rating, verifying credit histories dating back years. No-credit-check programs operate as asset-backed lending paths. Instead of checking what happened five years ago, underwriters look at your current financial trajectory: verifiable monthly bank deposits and long-term employment tenure.',
    },
    {
      type: 'callout',
      items: [
        'Approval Basis: Verifiable income sheets ($1,800+/month minimum)',
        'Processing Speed: Usually authorized in under 24 hours online',
        'Down Payment: Typically ranges from 10% to 20% upfront cash',
      ],
    },
    { type: 'heading', level: 2, text: 'Avoiding Hidden Pitfalls & Understanding APR Rates' },
    {
      type: 'paragraph',
      text: 'Because the lender assumes higher structural risk by skipping standard credit metrics, interest variables run significantly higher. It is essential to choose contracts that explicitly allow for early pay-off execution pathways without compounding administrative penalties.',
    },
  ],

  'atv-maintenance-checklist': [
    {
      type: 'paragraph',
      text: 'Preventative mechanical checkouts save thousands in field transmission overhauls. This comprehensive checklist breaks down your core focus zones before heading out.',
    },
    { type: 'heading', level: 2, text: '01. Fluid Dynamics & Engine Lubrication' },
    {
      type: 'paragraph',
      text: 'Off-road vehicles process severe amounts of particulate matter. Check oil levels every 10 operating hours, and perform full engine flushes at 50-hour increments. Always use specific wet-clutch compatible lubricants if your machine features integrated transmissions.',
    },
    { type: 'heading', level: 2, text: '02. Axle CV Boot & Suspension Integrity' },
    {
      type: 'paragraph',
      text: 'A tiny tear in your rubber CV boot allows muddy grit to infiltrate the delicate needle bearings of your drivetrain axles. Wipe down CV axles after swamp rides, inspecting closely for hairline fractures or grease weeping.',
    },
  ],

  'top-trail-riding-destinations-usa': [
    {
      type: 'paragraph',
      text: 'America is home to incredible, well-maintained off-road parks. We mapped the premier networks for terrain technicality and natural scenery.',
    },
    { type: 'heading', level: 2, text: '1. Moab, Utah (The Slickrock Matrix)' },
    {
      type: 'paragraph',
      text: 'Famous for Martian-red rock domes, Moab demands premium low-gear crawlers and aggressive tire sidewall lugs. Trails like Hell’s Revenge test your machine’s approach angles and your personal nerve.',
    },
    { type: 'heading', level: 2, text: '2. Hatfield-McCoy Trails, West Virginia' },
    {
      type: 'paragraph',
      text: 'Over 1,000 miles of professionally managed mountain trails winding through dense forests and old coal country. Excellent for all skill levels with full trailside towns welcoming muddy machines directly into local restaurants.',
    },
  ],

  'new-vs-used-atv-buying-guide': [
    {
      type: 'paragraph',
      text: 'Deciding whether to take the initial depreciation hit on a brand-new showroom machine or gamble on someone else’s maintenance history is the ultimate rider dilemma.',
    },
    { type: 'heading', level: 2, text: 'The True Costs of New Machines' },
    {
      type: 'paragraph',
      text: 'Buying new gets you a factory warranty, untouched components, and zero mystery tracking notes. However, setup fees, dealer freight surcharges, and instant depreciation can add 15-20% above the listed MSRP the moment your tires roll out the door.',
    },
    { type: 'heading', level: 2, text: 'The Used Inspection Blueprint' },
    {
      type: 'paragraph',
      text: 'If buying used, ignore polished plastic surfaces. Look underneath at the frame skid plates for severe rock impacts. Pull the airfilter and check for muddy silt lines inside the intake boot—a sure sign the machine was submerged in deep water.',
    },
  ],

  'youth-atv-safety-guide': [
    {
      type: 'paragraph',
      text: 'Getting children safely onto trails requires strict adherence to engine displacement boundaries and technical governor safety limits.',
    },
    { type: 'heading', level: 2, text: 'Sizing Engines to Age Profiles' },
    {
      type: 'paragraph',
      text: 'Never put a child on an adult-sized utility machine. Youth quads feature restricted electronic speed limiters, physical throttle stops, and specialized single-lever braking systems sized correctly for small hands.',
    },
    {
      type: 'callout',
      items: [
        'Ages 6–9: Under 70cc engines with speed throttles clamped below 15 MPH',
        'Ages 10–13: 70cc to 90cc engines matching physical muscle growth',
        'Ages 14+: 90cc to 250cc transition platforms prior to full utility licensing',
      ],
    },
  ],

  'polaris-sportsman-850-review': [
    {
      type: 'paragraph',
      text: 'We logged over 200 high-speed, technical trail miles in the saddle of the Polaris Sportsman 850 Trail edition to see if it retains its mid-range crown.',
    },
    { type: 'heading', level: 2, text: 'Power Delivery and Trail Pacing' },
    {
      type: 'paragraph',
      text: 'The 78-horsepower ProStar twin engine snaps smoothly off bottom-end throttle hits. Power delivery feels linear and predictable through tight timber sections, yet has massive reserves when opening up down wide forest fire roads.',
    },
    {
      type: 'blockquote',
      text: 'The absolute benchmark for trail ergonomics. The tank profile allows comfortable stand-up riding position adjustments instantly.',
      caption: 'Marcus Reid',
    },
  ],

  'how-to-ship-atv-nationwide': [
    {
      type: 'paragraph',
      text: 'Purchasing high-end machines from out-of-state dealers requires professional logistics coordination. Here is how your door-to-door transit manifest executes.',
    },
    { type: 'heading', level: 2, text: 'Open vs. Enclosed Transport Containment' },
    {
      type: 'paragraph',
      text: 'Open trailers offer cost efficiencies but leave your machine exposed to continuous weather elements and road salt spray during highway travel. Enclosed freight trailers isolate your asset safely inside hard-shell boxes, recommended for high-tier customs or showroom-restored classics.',
    },
  ],

  'can-am-outlander-vs-polaris-sportsman': [
    {
      type: 'paragraph',
      text: 'The heavy-duty utility heavyweight matchup. We pit the two kings of 4x4 quads head to head on raw capability metrics.',
    },
    { type: 'heading', level: 2, text: 'Suspension Travel vs Suspension Control' },
    {
      type: 'paragraph',
      text: 'Can-Am’s TTI trailing arm rear suspension tracks perfectly straight through uneven deep whoops without side-to-side tire scrub. Polaris utilizes deep A-Arm dual arrangements providing slightly more static clearance over rocks, but with minor steering feedback deflection.',
    },
    {
      type: 'table',
      tableHeader: ['Feature Parameter', 'Can-Am Outlander 1000R', 'Polaris Sportsman XP 1000'],
      tableRows: [
        ['Advertised Horsepower', '91 HP (Rotax V-Twin)', '90 HP (ProStar Twin)'],
        ['Front Suspension Travel', '9.2 Inches of Active Stroke', '9.0 Inches of Active Stroke'],
        [
          'Differential Locking System',
          'Visco-4Lok Automated System',
          'True On-Demand AWD Selector Switching System',
        ],
      ],
    },
  ],
}

export const EXTENDED_REVIEWS: ReviewItem[] = [
  {
    name: 'Marcus T.',
    location: 'Dallas, TX',
    machine: '2026 Polaris Sportsman 850',
    rating: 5,
    text: 'Honestly, I was skeptical about the no-credit-check financing claim because my score is rough after a messy divorce. Walked through the options over the phone with an agent, locked the pricing, and the Sportsman was dropped right at my ranch exactly 5 days later. Flawless process.',
    tags: ['Financing', 'Delivery', 'Polaris'],
    date: 'May 18, 2026',
  },
  {
    name: 'Sarah K.',
    location: 'Denver, CO',
    machine: '2025 Can-Am Outlander 1000R',
    rating: 5,
    text: 'The pre-shipment detailing on my Outlander was immaculate—not a single smudge on the plastics. They handled all the cross-state paperwork digitally. This team completely sets the standard for buying utility machines online.',
    tags: ['Delivery', 'Can-Am'],
    date: 'May 10, 2026',
  },
  {
    name: 'David L.',
    location: 'Atlanta, GA',
    machine: '2023 Honda Foreman 4x4',
    rating: 4,
    text: 'Excellent customer service from start to finish. Sifting through inventory choices took me a second, but once I locked the unit, the financing terms were completely straightforward and fair. Delivered safely right to my driveway.',
    tags: ['Financing', 'Honda'],
    date: 'Apr 29, 2026',
  },
  {
    name: 'Robert H.',
    location: 'Phoenix, AZ',
    machine: '2026 Can-Am Outlander MAX',
    rating: 5,
    text: 'First time buying a powersports vehicle online without touching it first. The agents communicated clearly at every stage. Delivery driver was professional and did a thorough walkthrough with me in the driveway.',
    tags: ['Delivery', 'Can-Am'],
    date: 'Apr 15, 2026',
  },
  {
    name: 'Brandon M.',
    location: 'Nashville, TN',
    machine: '2025 Polaris Scrambler 850',
    rating: 5,
    text: 'Zero credit hurdles. I filed the application online, got a call back within two hours with clear terms, confirmed my options, and had the unit delivered that weekend. Absolute game-changer.',
    tags: ['Financing', 'Polaris'],
    date: 'Mar 28, 2026',
  },
  {
    name: 'Garrett W.',
    location: 'Salt Lake City, UT',
    machine: '2026 Polaris RZR XP 1000',
    rating: 5,
    text: 'Financing process was smooth as silk. Got my approval terms within an hour and finalized shipment schedules. The unit arrived enclosed and spotless. Ready for the dunes.',
    tags: ['Financing', 'Delivery', 'Polaris'],
    date: 'Mar 14, 2026',
  },
  {
    name: 'Elena R.',
    location: 'Missoula, MT',
    machine: '2024 Honda Rancher 4x4',
    rating: 5,
    text: 'Needed a workhorse for our property. You cannot beat a Honda for reliability. The transaction was handled perfectly online and transport setup showed up right on schedule.',
    tags: ['Delivery', 'Honda'],
    date: 'Feb 20, 2026',
  },
  {
    name: 'Jackson P.',
    location: 'Orlando, FL',
    machine: '2025 Can-Am Renegade 1000R',
    rating: 5,
    text: 'This machine is an absolute beast. Raw power. The application and delivery matrix felt much smoother than wasting an entire Saturday playing typical dealership finance manager games.',
    tags: ['Financing', 'Can-Am'],
    date: 'Jan 30, 2026',
  },
]

import {
  BadgePercent,
  Bike,
  Calendar,
  CheckSquare,
  ClipboardCheck,
  Coins,
  Compass,
  CreditCard,
  Eye,
  Gauge,
  Heart,
  HeartHandshake,
  Layers,
  Map,
  Package,
  Shield,
  ShieldCheck,
  Snowflake,
  Star,
  ThumbsUp,
  TrendingUp,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

export const STATS_CARDS = [
  {
    icon: Bike,
    value: '500+',
    label: 'Vehicles Sold',
    subtext: 'From first-time buyers to seasoned collectors',
  },
  {
    icon: Users,
    value: '1,200+',
    label: 'Happy Riders',
    subtext: 'Our growing family comes back season after season',
  },
  {
    icon: Calendar,
    value: '10+',
    label: 'Years in Business',
    subtext: 'A decade of trust, growth, and riders first',
  },
  {
    icon: Star,
    value: '5★',
    label: 'Average Rating',
    subtext: 'Consistently rated 5 stars by our customers',
  },
]

export const MILESTONES_TIMELINE = [
  {
    alignment: 'left',
    period: 'Day One',
    title: 'The Doors Open',
    text: 'Offroad Powersports Hub starts with a small inventory of a dozen machines, a two-person team, and a bold vision: to be the dealership they always wished existed. The first customer rolls in on opening day. Word starts to spread.',
  },
  {
    alignment: 'right',
    period: 'Year 1–2',
    title: 'Building a Reputation',
    text: 'Our customer-first approach earns us a loyal following. Referrals drive rapid growth. We hire our first dedicated service technician and begin offering in-house maintenance and repairs — a game changer for local riders.',
  },
  {
    alignment: 'left',
    period: 'Year 3–4',
    title: 'Expanding Our Inventory',
    text: 'Demand grows beyond ATVs. We expand into UTVs, side-by-sides, and dirt bikes, securing partnerships with major powersports brands. Our floor doubles in size.',
  },
  {
    alignment: 'right',
    period: 'Year 5–6',
    title: 'New Location, Same Soul',
    text: 'We outgrow our original space and move to a larger facility — but we bring everything that made the old location special: the culture, the people, and the commitment.',
  },
  {
    alignment: 'left',
    period: 'Year 7–8',
    title: 'Community Events and Trail Days',
    text: 'We launch our annual community ride events, bringing together hundreds of local riders each season. We begin sponsoring regional off-road competitions.',
  },
  {
    alignment: 'right',
    period: 'Year 9–10+',
    title: 'A Decade Strong and Growing',
    text: "Over 500 vehicles sold. Over 1,200 customers who call us their dealership. A service team that's second to none. A decade in, we're more committed than ever.",
  },
]

export const CORE_VALUES_GRID = [
  {
    num: '01',
    icon: Heart,
    title: 'Riders First, Always',
    text: 'Everything we do starts with the rider. Not the sale. Not the quota. Not the bottom line. When you walk through our doors, our first question isn\'t "what\'s your budget?" — it\'s "how do you ride?" We take time to understand your skill level, your terrain, your goals, and your lifestyle before we ever point you toward a machine.',
  },
  {
    num: '02',
    icon: ShieldCheck,
    title: 'Quality Without Compromise',
    text: "Every vehicle on our floor has been carefully selected and inspected before it goes up for sale. We work exclusively with reputable brands and trusted manufacturers whose machines we'd put our own families on. Our technicians check every machine before it leaves the lot.",
  },
  {
    num: '03',
    icon: Eye,
    title: 'Honesty in Every Interaction',
    text: "We tell you exactly what a machine can and can't do. We flag potential issues upfront. We explain costs clearly and completely. We answer hard questions honestly — even when the honest answer means you buy something cheaper or decide to wait.",
  },
  {
    num: '04',
    icon: Wrench,
    title: 'Service That Goes the Distance',
    text: 'Selling you a machine is just the beginning. Our full-service department is staffed by certified, experienced technicians who specialize in powersports vehicles. From routine oil changes to engine rebuilds and custom upgrades, we handle it all.',
  },
  {
    num: '05',
    icon: Compass,
    title: 'Community Is Everything',
    text: "Off-road riding is a lifestyle built on community. We sponsor local trail rides, support youth riding programs, partner with conservation groups, and host regular events that bring our riders together. We're not just a business — we're part of it.",
  },
  {
    num: '06',
    icon: TrendingUp,
    title: 'Always Improving',
    text: "We're proud of what we've built, but we never stop asking how to make it better. We regularly seek feedback, invest in training, update our inventory, and look for ways to improve every part of the experience.",
  },
]

export const REASONS_WHY = [
  {
    icon: BadgePercent,
    title: 'Alternative Financing',
    text: 'We approve contracts based on current income sheets, bypassing traditional rigid bank scores.',
  },
  {
    icon: Truck,
    title: 'Enclosed Home Delivery',
    text: 'Your unit arrives directly to your driveway, isolated completely from road salt and highway grime.',
  },
  {
    icon: Wrench,
    title: 'Full Technical Prep',
    text: 'Every unit undergoes a multi-point inspection and thorough detailing before the transport doors lock.',
  },
  {
    icon: Shield,
    title: 'No-Gimmick Pricing',
    text: 'We eliminate documentation scams, hidden registration add-ons, and artificial pressure.',
  },
  {
    icon: ThumbsUp,
    title: 'Real Rider Counsel',
    text: 'We match machine wheelbases and engine profiles to your specific local terrain lines.',
  },
  {
    icon: Wrench,
    title: 'Post-Sale Support',
    text: 'Direct access to diagnostic blueprints, parts scheduling, and maintenance support assets.',
  },
]

export const TEAM_MEMBERS = [
  {
    name: 'Mike Torres',
    role: 'Founder & Head of Sales',
    image: '/images/team/mike.jpg', // Replace with your image assets
    desc: 'Mike has been riding ATVs and dirt bikes since he was a teenager and spent over 20 years in the powersports world before opening Offroad Powersports Hub. He personally oversees every major purchase decision, ensuring the inventory always reflects what real riders actually want.',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Lead Finance Specialist',
    image: '/images/team/sarah.jpg',
    desc: 'With over a decade of experience navigating powersports lending, Sarah works tirelessly with our massive credit network. She specializes in crafting flexible repayment terms that get riders approved without standard corporate friction.',
  },
  {
    name: 'Alex Mercer',
    role: 'Master Certified Tech Shop Foreman',
    image: '/images/team/alex.jpg',
    desc: 'Alex holds top-tier factory certifications from major manufacturers. He handles everything from micro-tuning electronic fuel injection mappings to structural safety overhauls, ensuring every unit leaving the lot tracks flawlessly.',
  },
]

export const WHY_US_REASONS = [
  {
    icon: ShieldCheck,
    title: 'Expert, Unbiased Guidance',
    text: "Our staff aren't commissioned salespeople pushing the most expensive machine. They're riders with real-world experience who will steer you toward the right vehicle for you.",
  },
  {
    icon: Layers,
    title: 'One Stop for Everything',
    text: "Sales, service, parts, accessories, and financing all under one roof. You'll never need to go anywhere else.",
  },
  {
    icon: Coins,
    title: 'Financing for Every Budget',
    text: 'We work with a wide network of lenders to offer competitive financing options for all credit backgrounds. No judgment, no pressure, just solutions.',
  },
  {
    icon: CheckSquare,
    title: 'Premium Brands, Vetted Selection',
    text: "We don't carry everything — we carry the best. Our inventory is carefully curated to include only machines from brands we trust.",
  },
  {
    icon: HeartHandshake,
    title: 'Relationships, Not Transactions',
    text: 'Many of our best customers have been buying from us for years — and have brought their kids in for their first machine too.',
  },
  {
    icon: Map,
    title: 'Locally Owned and Operated',
    text: "We're not a chain. Every dollar you spend with us stays in the local community. Our ownership is hands-on, our team is local.",
  },
]

export const SHOP_SERVICES = [
  {
    icon: Wrench,
    title: 'Routine Maintenance',
    text: 'Oil changes, filter replacements, fluid checks, chain adjustments, tire inspections, and seasonal tune-ups.',
  },
  {
    icon: Gauge,
    title: 'Engine Diagnostics & Repair',
    text: 'Full diagnostic scans, engine rebuilds, clutch service, transmission work, and performance troubleshooting.',
  },
  {
    icon: ClipboardCheck,
    title: 'Pre-Purchase Inspections',
    text: "Buying a used machine elsewhere? We'll give it a thorough inspection so you know exactly what you're getting.",
  },
  {
    icon: Zap,
    title: 'Performance Upgrades',
    text: 'Exhaust systems, suspension upgrades, ECU tuning, and custom builds for riders who want to push further.',
  },
  {
    icon: Package,
    title: 'Parts & Accessories',
    text: 'OEM and aftermarket parts available in-store or by order. Helmets, protective gear, and riding apparel always in stock.',
  },
  {
    icon: Snowflake,
    title: 'Seasonal Storage & Prep',
    text: 'Off-season storage solutions and end-of-season winterization to protect your investment.',
  },
]

export const CTA_TRUST_BADGES = [
  {
    icon: ThumbsUp,
    title: 'Quality Guaranteed',
    text: 'Every ATV fully inspected before shipping. 7-day satisfaction window on all purchases.',
  },
  {
    icon: CreditCard,
    title: '100% Financing Approval',
    text: 'No credit check required. Everyone is approved regardless of credit history.',
  },
  {
    icon: Truck,
    title: 'Free Nationwide Delivery',
    text: 'We ship to all 50 states, fully insured, with real-time tracking included.',
  },
]

import { ClipboardCopy, PhoneCall } from 'lucide-react'

export interface PlanCard {
  price: number
  tier: string
  term: string
  suitability: string
  benefit: string
  featured?: boolean
}

export const FINANCING_PLANS: PlanCard[] = [
  {
    price: 150,
    tier: 'Starter Track',
    term: '24–36 month terms',
    suitability: 'Great for youth & entry quads',
    benefit: 'Lowest structural entry point',
  },
  {
    price: 200,
    tier: 'Entry Level',
    term: '24–36 month terms',
    suitability: 'Great for used ATVs',
    benefit: 'Low barrier to entry',
  },
  {
    price: 299,
    tier: 'Trail Master',
    term: '36–48 month terms',
    suitability: 'Perfect for late-model quads',
    benefit: 'Most popular rider option',
    featured: true,
  },
  {
    price: 399,
    tier: 'Performance Pro',
    term: '48–60 month terms',
    suitability: 'Optimized for high-cc utility',
    benefit: 'Advanced suspension tiers',
  },
  {
    price: 499,
    tier: 'Dominator Fleet',
    term: '60–72 month terms',
    suitability: 'Built for premium turbo side-by-sides',
    benefit: 'Maximum capability mapping',
  },
]

export const STEP_PIPELINE = [
  {
    num: '01',
    icon: ClipboardCopy,
    title: 'Fill Out the Form',
    text: 'Complete the simple application below. Takes less than 5 minutes — no lengthy paperwork, no credit check required.',
  },
  {
    num: '02',
    icon: PhoneCall,
    title: 'We Review & Call You',
    text: 'Our financing team reviews your application and calls you within 1 business day to walk through your options.',
  },
  {
    num: '03',
    icon: Bike,
    title: 'Pick Your ATV',
    text: "Browse our inventory and choose your machine. We'll match the right payment plan to your selected vehicle.",
  },
  {
    num: '04',
    icon: Truck,
    title: 'Get Delivered',
    text: "Sign your agreement and we'll deliver your ATV straight to your door — anywhere in all 50 states.",
  },
]

export const TRANS_ADVANTAGES = [
  'Everyone credit check required',
  'Bad credit, no credit — still approved',
  'Flexible down payment options',
  'Terms from 24 to 72 months',
  'Fast approval — often same day',
  'Simple online application',
]

export const APPLICANT_CHECKLIST = [
  'Valid government-issued photo ID',
  'Proof of income (pay stub or bank statement)',
  'Proof of residence (utility bill or lease)',
  'Active phone number & email',
  'Down payment (if applicable)',
]

// src/lib/financing-overview-data.ts

import { DollarSign, FileSpreadsheet, ShieldAlert, UserCheck } from 'lucide-react'

export const PILL_BENEFITS = [
  { text: 'No credit check required', icon: ShieldCheck },
  { text: 'No bank approvals', icon: UserCheck },
  { text: 'Fast and easy application', icon: Zap },
  { text: 'Flexible payment plans', icon: FileSpreadsheet },
]

export const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Choose Your ATV',
    text: 'Pick the four-wheeler that fits your lifestyle and budget.',
    icon: Bike,
  },
  {
    num: '02',
    title: 'Make a Down Payment',
    text: 'Secure your ATV with an affordable upfront payment.',
    icon: DollarSign,
  },
  {
    num: '03',
    title: 'Set Your Payment Plan',
    text: "We'll divide the remaining balance into manageable payments.",
    icon: Calendar,
  },
  {
    num: '04',
    title: 'Ride Today',
    text: 'Once your down payment is complete, your ATV is ready to go.',
    icon: Zap,
  },
]

export const FREQUENCY_CARDS = [
  {
    title: 'Weekly, Bi-Weekly, or Monthly',
    text: 'Choose the payment frequency that fits your schedule and cash flow.',
    icon: Calendar,
  },
  {
    title: 'Short-Term & Extended Options',
    text: 'Whether you want to pay it off fast or spread it out, we have plans for you.',
    icon: Layers,
  },
  {
    title: 'Easy & Predictable Schedules',
    text: 'Know exactly what you owe and when. No surprises, no hidden changes.',
    icon: ShieldAlert,
  },
]

export const WHY_CHOOSE_US_CARDS = [
  { title: 'Ride today, pay over time', icon: Gauge },
  { title: 'No banks or third-party lenders', icon: ShieldCheck },
  { title: 'Fast approvals', icon: Zap },
  { title: 'Flexible plans for any budget', icon: DollarSign },
  { title: 'Friendly, customer-first service', icon: HeartHandshake },
]

// src/lib/privacy-data.ts

import { PrivacySection } from '@/types'

export const PRIVACY_REGISTRY: PrivacySection[] = [
  {
    tag: 'DATA COLLECTION',
    title: '1. Information We Securely Collect',
    intro:
      'To facilitate our specialized in-house financing programs and process your application in under 5 minutes without traditional third-party credit pulls, we collect specific structural identifiers including:',
    bullets: [
      'Personal Identification Profile: Full legal name, date of birth, and the last 2 digits of your Social Security Number (SSN) for secure identity matching.',
      'Contact Intermediaries: Active telephone numbers and validated email addresses for callback verification routes.',
      'Physical Residence Tracking: Street address, city, state, zip code, and housing lease or ownership documentation status.',
      'Financial Proof Inputs: Primary employer identification logs, gross monthly cash inflows, pay stubs, and supplementary bank verification balances.',
    ],
  },
  {
    tag: 'DATA UTILIZATION',
    title: '2. How Your Information Is Applied',
    intro:
      'Your submitted payload data is processed directly inside our closed application tracking loop. We apply this information to:',
    bullets: [
      'Determine matching down payment tiers and map custom payment frequencies (weekly, bi-weekly, or monthly).',
      'Authorize instant internal in-house application approvals within 1 business day.',
      'Coordinate home delivery drop-offs across all 50 states.',
      'Protect our portal systems from fraudulent, automated, or malicious form submittals.',
    ],
  },
  {
    tag: 'INFORMATION SHARING',
    title: '3. Data Retention and Non-Disclosure Safeguards',
    intro:
      'We treat applicant data with extreme security measures. Unlike traditional power-sports dealerships, we strictly enforce the following policies:',
    bullets: [
      'Zero Third-Party Broker Sales: We never sell, lease, or monetize your personal background files to external marketing lists.',
      'Program Partner Logistics: Information is only disclosed to our trusted internal closing operators or select in-house program partners directly servicing your payment contract.',
      'Legal Enforcement Mandates: Information is only transferred externally when strictly required by state financial reporting compliance audits or federal legal system demands.',
    ],
  },
  {
    tag: 'SECURITY ARCHITECTURE',
    title: '4. Structural Technical Protections',
    intro:
      'All form fields, partial social digits, and income sheets are protected by industrial security measures right at the point of entry:',
    bullets: [
      'End-to-End Transport Layer Security (TLS) protocol handshakes wrap all input operations.',
      'Secure internal server storage configurations completely isolated from unauthorized network requests.',
      'Strict access control walls restricting pipeline access to designated financing analysts.',
    ],
  },
]
