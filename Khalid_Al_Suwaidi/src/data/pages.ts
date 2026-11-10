/** Content for the inner pages (blog, volunteer, ventures, contact). Kept separate from home-page content. */
const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75`

export const blogCategories = ['All', 'HR Strategy', 'G2G Innovation', 'National Engagement', 'Leadership'] as const
export type BlogCategory = Exclude<(typeof blogCategories)[number], 'All'>

export const articles: { slug: string; cat: BlogCategory; title: string; excerpt: string; read: string; date: string; img: string }[] = [
  { slug: 'games-government-careers', cat: 'G2G Innovation', title: 'What games teach us about designing government careers', excerpt: 'Progression, feedback and mastery are the mechanics that keep players engaged. They work just as well for public servants.', read: '6 min', date: '14 Mar 2025', img: u('1542751371-adc38448a05e') },
  { slug: 'leaders-ambiguity', cat: 'Leadership', title: 'Building leaders who are comfortable with ambiguity', excerpt: 'The most valuable leadership skill in government today is making good decisions with incomplete information.', read: '5 min', date: '02 Feb 2025', img: '/assets/insight-leaders-ambiguity.jpg' },
  { slug: 'manpower-planning-ai', cat: 'HR Strategy', title: 'Manpower planning in the age of AI', excerpt: 'Forecasting headcount is no longer enough. Workforce plans now need to model which tasks will change, not just which roles.', read: '8 min', date: '18 Jan 2025', img: u('1451187580459-43490279c0fa') },
  { slug: 'heritage-play', cat: 'National Engagement', title: 'Heritage as play: telling the UAE story through games', excerpt: 'How Rehla 71 turned the story of the seven Emirates into an adventure half a million players chose to explore.', read: '7 min', date: '06 Dec 2024', img: '/assets/rehla-71.png' },
  { slug: 'fair-grievance', cat: 'HR Strategy', title: 'Designing grievance systems people actually trust', excerpt: 'Speed matters, but transparency matters more. Lessons from cutting case resolution from 60 days to 21.', read: '6 min', date: '20 Nov 2024', img: u('1590075865003-e48277faa558') },
  { slug: 'g2g-framework', cat: 'G2G Innovation', title: 'The Game-to-Government framework, explained', excerpt: 'Four stages for turning a policy objective into an experience citizens want to take part in.', read: '9 min', date: '28 Oct 2024', img: '/assets/shara-71.png' },
  { slug: 'first-line-leaders', cat: 'Leadership', title: 'Why first-line leaders decide the culture', excerpt: 'Most employees experience the organisation through one person: their manager. That is where development should start.', read: '5 min', date: '09 Oct 2024', img: u('1497366216548-37526070297c') },
  { slug: 'youth-engagement', cat: 'National Engagement', title: 'Meeting young Emiratis where they already are', excerpt: 'National engagement campaigns compete with every app on a phone. Here is how to design for that reality.', read: '4 min', date: '15 Sep 2024', img: '/assets/al-mandoos.png' },
  { slug: 'job-architecture', cat: 'HR Strategy', title: 'From 1,900 job titles to 340: a job architecture story', excerpt: 'Standard profiles made pay, mobility and planning simpler across government. Getting there took patience.', read: '7 min', date: '30 Aug 2024', img: u('1742236467631-09dbca4aa9cf') },
]

export const shelf = [
  { kind: 'Book', title: 'Leaders Eat Last', note: 'On trust as the foundation of every team.', img: u('1658842042779-dc9ab3125690', 300) },
  { kind: 'Technology', title: 'Totara LMS', note: 'The backbone of our blended leadership pathway.', img: u('1608222351212-18fe0ec7b13b', 300) },
  { kind: 'Book', title: 'Reality Is Broken', note: 'Why game design belongs in public policy.', img: u('1658198430813-c9f783ec2572', 300) },
  { kind: 'Technology', title: 'Power BI', note: 'Making workforce data visible to decision makers.', img: u('1551288049-bebda4e38f71', 300) },
  { kind: 'Book', title: 'Team of Teams', note: 'Adaptability in complex organisations.', img: u('1645246913005-bef6f2f2121f', 300) },
]

export const volunteerRoles = [
  { org: 'Abu Dhabi Youth Council', years: '2021 – Present', role: 'Mentor, youth leadership programme', tag: null, link: 'View gallery' },
  { org: 'Federal HR Authority', years: '2018 – 2022', role: 'Member, Grievance Committee', tag: 'Balance & Equity', link: 'Read the article' },
  { org: 'PitchMetrics', years: '2023', role: 'Judge and coach, PitchMetrics', tag: null, link: 'View gallery' },
  { org: 'Community Learning Network', years: '2019 – Present', role: 'Volunteer trainer, community workshops', tag: null, link: 'Read the article' },
  { org: 'Tawazun Initiative', years: '2020 – 2023', role: 'Advisor, community-justice initiative', tag: 'Balance & Equity', link: 'Read the article' },
  { org: 'UAE University', years: '2022', role: 'Speaker, graduate career series', tag: null, link: 'Read the article' },
]

export const equity = [
  { title: 'Grievance Committee', years: '2018 – 2022', body: 'Reviewed workplace cases with a single principle: every employee deserves a fair hearing and a clear answer. Helped introduce published timelines and case tracking.' },
  { title: 'Community-justice initiative', years: '2020 – 2023', body: 'Advised a community programme offering mediation for neighbourhood and family disputes, keeping resolution local, respectful and fast.' },
]

export const events = [
  { name: 'Pitch Night: Future of Work', date: 'Mar 2025', type: 'PitchMetrics', img: u('1540575467063-178a50c2df87', 900) },
  { name: 'Leading Through Change', date: 'Jan 2025', type: 'Workshops', img: u('1524178232363-1fb2b075b655', 900) },
  { name: 'Young Leaders Bootcamp', date: 'Nov 2024', type: 'Youth programmes', img: u('1522202176988-66273c2fd55f', 900) },
  { name: 'Founders Demo Day', date: 'Oct 2024', type: 'PitchMetrics', img: u('1505373877841-8d25f7d46678', 900) },
  { name: 'HR Analytics Clinic', date: 'Aug 2024', type: 'Workshops', img: u('1552664730-d307ca884978', 900) },
  { name: 'Summer Leadership Camp', date: 'Jul 2024', type: 'Youth programmes', img: u('1529390079861-591de354faf5', 900) },
]

export const testimonials = [
  { quote: 'Khalid taught me that leadership is a set of habits, not a title. I use them every day in my first management role.', name: 'Mariam Al Hosani', role: 'Mentee, Youth Leadership Programme' },
  { quote: 'His feedback on our pitch was direct, kind and completely right. We raised our seed round three months later.', name: 'Omar Haddad', role: 'Co-founder, PitchMetrics cohort 2023' },
  { quote: 'He gives his time to young people as if it were the most important meeting of his week.', name: 'Fatima Al Mazrouei', role: 'Programme Director, Youth Council' },
]

export const g2gStages = [
  { title: 'Discover', body: 'Start from a national objective and the behaviour it needs to change.' },
  { title: 'Design', body: 'Translate the objective into mechanics, story and rewards that feel natural.' },
  { title: 'Deploy', body: 'Launch where audiences already play, with partners across government.' },
  { title: 'Measure', body: 'Track engagement and real-world outcomes, then iterate.' },
]

export const inquiryTypes = ['Speaking Engagements', 'Partnerships', 'HR Strategy Advice', 'General Inquiry'] as const

/** Long-form detail generated per project for the case study template. */
export function projectDetail(p: { title: string; area: string; outcome: string }) {
  return {
    challenge: `Entities were working from inconsistent data and practices, making it hard to plan with confidence. ${p.area} decisions were slow, and leaders lacked a shared view of where the organisation needed to go.`,
    mission: `Design and deliver ${p.title.toLowerCase()} that leaders could trust, staff could understand and the system could sustain long after launch.`,
    results: [p.outcome, 'Adopted as the standard approach across participating entities', 'Recognised in the annual government excellence review'],
    responsibilities: ['Defined the methodology and governance model', 'Led a cross-entity working group of HR leaders', 'Presented recommendations to senior leadership', 'Oversaw rollout, training and adoption'],
    stats: [{ v: p.outcome.match(/\d[\d,.%]*/)?.[0] ?? '100%', l: 'Headline outcome' }, { v: '30+', l: 'Entities involved' }, { v: '25k', l: 'Employees reached' }, { v: '2 yrs', l: 'Programme length' }],
    docs: [{ name: 'Programme summary', meta: 'PDF · 2.4 MB' }, { name: 'Operating model overview', meta: 'PDF · 880 KB' }, { name: 'Training programme outline', meta: 'PDF · 1.1 MB' }],
  }
}
