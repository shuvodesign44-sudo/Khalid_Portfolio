export const nav = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'My Work', href: '/projects' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Get in Touch', href: '/contact' },
]

export const timeline = [
  { year: '2013', title: 'Joined public service', body: 'HR officer, federal workforce programmes.' },
  { year: '2016', title: 'Manpower planning lead', body: 'Built Abu Dhabi’s first data-led workforce model.' },
  { year: '2018', title: 'Organizational architecture', body: 'Redesigned 40+ entity structures.' },
  { year: '2020', title: 'Leadership academy', body: 'Launched national leadership training on Totara LMS.' },
  { year: '2022', title: 'Founded Peleverse', body: 'Gaming studio rooted in Emirati heritage.' },
  { year: '2024', title: 'Rehla 71 launch', body: 'First title reaches 500k players across the GCC.' },
  { year: '2026', title: 'Next generation', body: 'Scaling play-based leadership development.' },
]

export const projects = [
  { tags: ['Manpower Planning'], title: 'Federal Workforce Planning Model', outcome: '18% reduction in critical vacancies over 3 years', tech: ['Oracle', 'Power BI'], img: '/assets/work-federal-workforce.jpg' },
  { tags: ['Organizational Architecture'], title: 'Government Entity Restructure', outcome: '42 entities aligned to a single operating model', tech: ['Oracle HCM'], img: '/assets/work-entity-restructure.jpg' },
  { tags: ['Leadership Training'], title: 'National Leadership Academy', outcome: '3,200 leaders certified on a blended pathway', tech: ['Totara LMS'], img: '/assets/work-leadership-academy.jpg' },
  { tags: ['Digital Transformation'], title: 'Smart HR Services Platform', outcome: '70% faster service delivery for 25,000 employees', tech: ['Oracle', 'ServiceNow'], img: '/assets/work-smart-hr.jpg' },
]

export const ventures = [
  { name: 'Rehla 71', blurb: 'An adventure across the seven Emirates.', art: '/assets/rehla-71.png', pos: '72% 75%', hue: '#e8b46a' },
  { name: 'Shara 71', blurb: 'Strategy game of trade, pearls and the sea.', art: '/assets/shara-71.png', pos: '50% 50%', hue: '#6aa7c8' },
  { name: 'Al Mandoos', blurb: 'Family puzzles inspired by heritage treasures.', art: '/assets/al-mandoos.png', pos: '48% 45%', hue: '#c47a4f' },
]

export const awards = [
  { title: 'Government Excellence Award', body: 'Abu Dhabi Government', year: '2019', img: '/assets/award-1.png', alt: 'Award trophy' },
  { title: 'Best HR Transformation', body: 'GCC HR Summit', year: '2021', img: '/assets/award-2.png', alt: 'Award trophy' },
  { title: 'Emerging Games Founder', body: 'Abu Dhabi Gaming', year: '2023', img: '/assets/award-3.png', alt: 'Award trophy' },
  { title: 'Young Leader of the Year', body: 'UAE Leadership Forum', year: '2024', img: '/assets/award-4.png', alt: 'Award trophy' },
  { title: 'Innovation in Public Service', body: 'Mohammed bin Rashid Award', year: '2025', img: '/assets/award-5.png', alt: 'Award trophy' },
  { title: 'Legacy Award', body: 'UAE Leadership Forum', year: '2025', img: '/assets/award-6.png', alt: 'Award trophy' },
  { title: '20 Years of Excellence', body: 'Abu Dhabi Government', year: '2024', img: '/assets/award-7.png', alt: 'Award trophy' },
  { title: 'Esports Industry MVP', body: 'Abu Dhabi Gaming', year: '2025', img: '/assets/award-8.png', alt: 'Award trophy' },
]

export const insights = [
  { cat: 'Public Service', title: 'What games teach us about designing government careers', read: '6 min', date: 'Mar 2025', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=75' },
  { cat: 'Leadership', title: 'Building leaders who are comfortable with ambiguity', read: '5 min', date: 'Feb 2025', img: '/assets/insight-leaders-ambiguity.jpg' },
  { cat: 'Workforce', title: 'Manpower planning in the age of AI', read: '8 min', date: 'Jan 2025', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75' },
]

export const expertise = ['Manpower Planning', 'Organizational Architecture', 'Grievance Committee', 'Leadership Training'] as const

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=900&q=75`
export const allProjects = [
  { slug: 'federal-workforce-model', area: 'Manpower Planning', years: '2019 – 2021', title: 'Federal Workforce Planning Model', outcome: '18% reduction in critical vacancies over three years', tech: ['Oracle', 'Totara LMS'], img: '/assets/work-federal-workforce.jpg' },
  { slug: 'entity-restructure', area: 'Organizational Architecture', years: '2019 – 2021', title: 'Government Entity Restructure', outcome: '42 entities aligned to a single operating model', tech: ['Oracle HRMS'], img: '/assets/work-entity-restructure.jpg' },
  { slug: 'leadership-academy', area: 'Leadership Training', years: '2019 – 2021', title: 'National Leadership Academy', outcome: '3,200 leaders certified on a blended pathway', tech: ['Totara LMS'], img: '/assets/work-leadership-academy.jpg' },
  { slug: 'grievance-framework', area: 'Grievance Committee', years: '2020 – 2022', title: 'Unified Grievance Framework', outcome: 'Case resolution time cut from 60 to 21 days', tech: ['Oracle', 'Totara LMS', 'HRIS'], img: u('1590075865003-e48277faa558') },
  { slug: 'emiratisation-forecast', area: 'Manpower Planning', years: '2021 – 2022', title: 'Emiratisation Demand Forecast', outcome: '5-year talent pipeline mapped across 12 job families', tech: ['HRIS'], img: u('1568901576299-10ad4f3711e2') },
  { slug: 'job-architecture', area: 'Organizational Architecture', years: '2021 – 2023', title: 'Government Job Architecture', outcome: '1,900 roles consolidated into 340 standard profiles', tech: ['Oracle'], img: u('1742236467631-09dbca4aa9cf') },
  { slug: 'first-line-leaders', area: 'Leadership Training', years: '2022 – 2023', title: 'First-Line Leaders Programme', outcome: '92% of participants promoted within 24 months', tech: ['Totara LMS', 'HRIS'], img: u('1497366216548-37526070297c') },
  { slug: 'grievance-digital', area: 'Grievance Committee', years: '2022 – 2024', title: 'Digital Grievance Portal', outcome: 'Full case transparency for 25,000 employees', tech: ['Oracle', 'Totara LMS'], img: '/assets/work-smart-hr.jpg' },
  { slug: 'strategic-workforce', area: 'Manpower Planning', years: '2023 – 2025', title: 'Strategic Workforce Dashboard', outcome: 'Live headcount insight for 30 government entities', tech: ['HRIS', 'Oracle'], img: u('1620833019833-d9cb4d0122d9') },
]
