import { POSTS } from '@/lib/constants'
import { BlogPost } from '@/types'
export interface BlogPostFull extends BlogPost {
  content: string // HTML string — in production this comes from your CMS/Payload
  tags: string[]
  relatedSlugs: string[]
}

// In production, this comes from Payload CMS. This is mock rich content.
const FULL_CONTENT: Record<string, string> = {
  'best-atv-brands-2024': `
    <h2>Why Brand Choice Matters More Than You Think</h2>
    <p>Buying an ATV is a significant investment — and the brand you choose will define your ownership experience for years. Parts availability, dealer support, resale value, and community size all vary enormously between manufacturers. We've ridden and sold thousands of machines across every major brand, and this guide gives you the unfiltered truth.</p>

    <h2>Polaris: The All-American Workhorse</h2>
    <p>Polaris consistently dominates the utility ATV segment for good reason. The Sportsman lineup — particularly the 850 Trail and 1000 XP — offers class-leading towing, exceptional ground clearance, and one of the most extensive dealer networks in the country. If you need a machine that can haul, plow, and explore rugged terrain without complaint, Polaris is hard to beat.</p>
    <ul>
      <li>Best for: Utility work, trail riding, farm use</li>
      <li>Standout model: Sportsman 850 Trail</li>
      <li>Weakness: Higher price point than competitors</li>
    </ul>

    <h2>Can-Am: The Performance Leader</h2>
    <p>Bombardier's Can-Am brand has shaken up the powersports world with aggressive engineering and bold styling. The Outlander series offers more horsepower per dollar than almost anything on the market, and their side-by-side Maverick X3 is in a class of its own for sport riding. If you're chasing performance and don't mind paying for it, Can-Am is your brand.</p>
    <ul>
      <li>Best for: Sport riding, high-performance trail use</li>
      <li>Standout model: Outlander 700</li>
      <li>Weakness: Parts can be harder to find outside dealer network</li>
    </ul>

    <h2>Honda: The Reliability Gold Standard</h2>
    <p>Honda has built its reputation on engines that simply don't quit. The FourTrax Foreman and Rancher lineups have been workhorses for decades, and for good reason — they start every time, sip fuel efficiently, and require minimal maintenance. If you prioritize long-term ownership cost and bulletproof reliability over bleeding-edge performance, Honda is your pick.</p>
    <ul>
      <li>Best for: Entry-level buyers, long-term reliability, youth riders</li>
      <li>Standout model: FourTrax Foreman 4x4</li>
      <li>Weakness: Less exciting performance than Can-Am or Polaris</li>
    </ul>

    <h2>Our Verdict</h2>
    <p>There's no universal winner — the best brand is the one that matches your riding style, budget, and intended use. For pure utility, Polaris wins. For raw performance, Can-Am takes it. For long-term peace of mind, Honda is unmatched. All three hold their value well and have strong communities behind them.</p>

    <blockquote>The best ATV is the one you'll actually ride. Don't buy more machine than you need — and don't settle for less than your terrain demands.</blockquote>

    <h2>Ready to Find Your Match?</h2>
    <p>Browse our full inventory of Polaris, Can-Am, and Honda ATVs — new and used — with no credit check financing available. We deliver nationwide to all 50 states.</p>
  `,
}

// Generic rich content for posts without specific content
const GENERIC_CONTENT = (post: BlogPost): string => `
  <h2>Introduction</h2>
  <p>Whether you're a seasoned rider or just getting into the world of off-road powersports, understanding the fundamentals covered in this guide will help you make smarter decisions and get more out of every ride. The PowersportsHub team has spent years working with thousands of ATV owners across all 50 states, and this article distills what we've learned.</p>

  <h2>What You Need to Know</h2>
  <p>The powersports industry moves fast. New models, updated financing options, and evolving trail regulations mean that staying informed is part of responsible ownership. In this guide, we cover everything you need to know about <strong>${post.category.toLowerCase()}</strong> in the context of modern ATV ownership.</p>

  <h2>Key Takeaways</h2>
  <ul>
    <li>Do your research before committing to a purchase — brand, model, and condition all matter enormously.</li>
    <li>No credit check financing is available for qualified buyers through PowersportsHub, with 100% approval rates.</li>
    <li>Nationwide delivery means you don't have to limit your search to local inventory.</li>
    <li>Always inspect or request an inspection report before buying used.</li>
    <li>Match your ATV to your primary use case — trail riding, utility work, and sport riding all have different optimal machines.</li>
  </ul>

  <h2>Going Deeper</h2>
  <p>If you want personalized advice, our team of powersports specialists is available by phone at <strong>+1 (972) 688-9613</strong> and can walk you through our full inventory based on your budget, riding style, and location. We've helped riders from every background — from first-time buyers to seasoned racers — find the right machine.</p>

  <blockquote>The right ATV changes how you experience the outdoors. Don't settle — find the machine that matches your ambitions.</blockquote>

  <h2>Conclusion</h2>
  <p>We hope this guide gives you the confidence to move forward with your next powersports decision. Browse our full inventory, apply for financing in minutes, and get your machine delivered straight to your door — anywhere in the USA.</p>
`

export function getPostBySlug(slug: string): BlogPostFull | null {
  const base = POSTS.find((p) => p.slug === slug)
  if (!base) return null

  const others = POSTS.filter((p) => p.slug !== slug && p.category === base.category)
  const related =
    others.length >= 2
      ? others.slice(0, 2).map((p) => p.slug)
      : POSTS.filter((p) => p.slug !== slug)
          .slice(0, 2)
          .map((p) => p.slug)

  return {
    ...base,
    content: FULL_CONTENT[slug] ?? GENERIC_CONTENT(base),
    tags: ['ATV', base.category, ...['Polaris', 'Can-Am', 'Honda'].slice(0, 2)],
    relatedSlugs: related,
  }
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs.map((s) => POSTS.find((p) => p.slug === s)).filter(Boolean) as BlogPost[]
}
