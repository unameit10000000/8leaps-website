export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  imageUrl: string
  content?: string[]
}

export const posts: BlogPost[] = [
  {
    slug: "launching-our-new-site",
    title: "Launching Our New Site",
    excerpt:
      "We’re excited to share a refreshed experience focused on performance, clarity, and value.",
    date: "2025-08-01",
    author: "8Leaps Team",
    tags: ["Updates", "Company"],
    imageUrl: "https://picsum.photos/id/1015/1200/630",
    content: [
      "We’re excited to launch our refreshed website—faster, clearer, and more focused on helping you find the right solution quickly.",
      "This redesign is more than a new coat of paint. We rethought our navigation, simplified how services are presented, and ensured that performance remains first-class across the stack.",
      "We also improved accessibility, tuned our Core Web Vitals, and invested in a scalable content structure so we can publish guides and case studies more easily.",
      "Over the coming weeks, we'll share behind-the-scenes posts on our stack, performance decisions, and UX improvements—plus what worked, what didn't, and what we learned.",
    ],
  },
  {
    slug: "why-mvps-win",
    title: "Why MVPs Win",
    excerpt:
      "Shipping a focused MVP helps teams validate faster and learn what truly matters.",
    date: "2025-07-12",
    author: "Bartolomeo",
    tags: ["Product", "MVP"],
    imageUrl: "https://picsum.photos/id/1005/1200/630",
    content: [
      "An MVP reduces risk and accelerates learning by focusing on core value.",
      "Your goal: validate a hypothesis, not build the final system. Keep scope tight and ruthlessly prioritize the few features that prove value.",
      "Start small, validate quickly, iterate with real feedback—momentum beats perfection. Every iteration should answer a question or remove a risk.",
      "Once validated, you can harden, refine, and scale with confidence instead of guesswork.",
    ],
  },
  {
    slug: "ai-in-your-workflows",
    title: "Practical AI In Your Workflows",
    excerpt:
      "Simple, targeted AI integrations can unlock hours of productivity every week.",
    date: "2025-06-20",
    author: "Team 8Leaps",
    tags: ["AI", "Automation"],
    imageUrl: "https://picsum.photos/id/1011/1200/630",
    content: [
      "AI shines when it’s integrated into specific bottlenecks, not everywhere.",
      "We like to start with a workflow map: find the repetitive, high-frequency tasks that consume time but follow predictable patterns.",
      "Pick one high-friction task and automate it—measure the time you get back. Then expand thoughtfully, ensuring each step is reliable and explainable.",
      "The best AI is invisible: it augments teams without adding cognitive overhead.",
    ],
  },
  {
    slug: "designing-for-speed",
    title: "Designing For Speed",
    excerpt:
      "From first paint to interaction, performance is a design constraint—not an afterthought.",
    date: "2025-05-03",
    author: "8Leaps Team",
    tags: ["Frontend", "Performance"],
    imageUrl: "https://picsum.photos/id/1021/1200/630",
    content: [
      "Fast interfaces feel simpler, more reliable, and more delightful to use.",
      "Performance touches every layer: design, code, data, infrastructure. Treat it as a constraint early instead of a rescue mission later.",
      "Budget performance from the start and your product will scale more gracefully. Track, measure, and make trade-offs explicit in design reviews.",
      "Users rarely ask for speed explicitly—but they feel it in every interaction.",
    ],
  },
]


