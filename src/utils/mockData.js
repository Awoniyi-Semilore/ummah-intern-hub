export const MOCK_USERS = [
  {
    id: "u1",
    email: "intern@test.com",
    password: "password12345",
    role: "intern",
    name: "Alex Johnson",
    team: "frontend-dev",
    portfolioUrl: "https://alexportfolio.dev",
    completedTasks: 3
  },
  {
    id: "u2",
    email: "admin@test.com",
    password: "password1234",
    role: "admin",
    name: "Sarah Williams",
    team: "Management"
  }
];

export const MOCK_TASKS = [
  {
    id: "t1",
    title: "Setup Vite and Tailwind",
    description: "Initialize the project using Vite and configure Tailwind CSS for the dashboard layout.",
    team: "frontend-dev",
    status: "Completed",
    deadline: "2026-01-20",
    dateAdded: "2026-01-18",
    submission: "https://github.com/intern/project-setup"
  },
  {
    id: "t2",
    title: "Create Brand Guidelines",
    description: "Develop a color palette and typography scale for the new mobile app.",
    team: "graphic-design",
    status: "Pending",
    deadline: "2026-01-24",
    dateAdded: "2026-01-19",
    submission: null
  },
  {
    id: "t3",
    title: "User Interview Analysis",
    description: "Analyze the findings from the 5 user interviews conducted last week.",
    team: "product-design",
    status: "In-Progress",
    deadline: "2026-01-23",
    dateAdded: "2026-01-20",
    submission: null
  },
  {
    id: "t4",
    title: "Final Cut Pro Video Edit",
    description: "Edit the 2-minute promotional video for the internship launch.",
    team: "video-editing",
    status: "Pending",
    deadline: "2026-01-25",
    dateAdded: "2026-01-21",
    submission: null
  },
  {
    id: "t5",
    title: "Bug Report: Login Authentication",
    description: "Identify and document bugs in the current login flow on mobile devices.",
    team: "qa-testing",
    status: "Completed",
    deadline: "2026-01-22",
    dateAdded: "2026-01-15",
    submission: "https://docs.google.com/bug-report-1"
  },
  {
    id: "t6",
    title: "Responsive Navbar Implementation",
    description: "Ensure the navigation bar works seamlessly on mobile and tablet screens.",
    team: "frontend-dev",
    status: "In-Progress",
    deadline: "2026-01-24",
    dateAdded: "2026-01-22",
    submission: null
  },
  {
    id: "t7",
    title: "Social Media Asset Creation",
    description: "Design 5 Instagram post templates and 2 LinkedIn banners for the brand.",
    team: "graphic-design",
    status: "In-Progress",
    deadline: "2026-01-26",
    dateAdded: "2026-01-22",
    submission: null
  },
  {
    id: "t8",
    title: "YouTube Intro Animation",
    description: "Create a 5-second motion graphics intro for the team's YouTube channel.",
    team: "video-editing",
    status: "Completed",
    deadline: "2026-01-19",
    dateAdded: "2026-01-15",
    submission: "https://vimeo.com/intro-anim-test"
  },
  {
    id: "t9",
    title: "Wireframe Mobile Dashboard",
    description: "Sketch low-fidelity wireframes for the user settings and profile pages.",
    team: "product-design",
    status: "Pending",
    deadline: "2026-01-28",
    dateAdded: "2026-01-23",
    submission: null
  },
  {
    id: "t10",
    title: "Unit Testing: Auth Service",
    description: "Write Jest unit tests for the login, logout, and token refresh logic.",
    team: "qa-testing",
    status: "Pending",
    deadline: "2026-01-27",
    dateAdded: "2026-01-23",
    submission: null
  },
  {
    id: "t11",
    title: "API Integration: Task Module",
    description: "Connect the frontend task cards to the provided backend API endpoints.",
    team: "frontend-dev",
    status: "Pending",
    deadline: "2026-01-30",
    dateAdded: "2026-01-24",
    submission: null
  },
  {
    id: "t12",
    title: "Color Grading: Interview Video",
    description: "Perform professional color grading on the 'Intern Success Stories' footage.",
    team: "video-editing",
    status: "In-Progress",
    deadline: "2026-01-29",
    dateAdded: "2026-01-24",
    submission: null
  },
  {
    id: "t13",
    title: "Logo Iteration: Phase 2",
    description: "Refine the 3 chosen logo concepts based on feedback from the design lead.",
    team: "graphic-design",
    status: "Completed",
    deadline: "2026-01-21",
    dateAdded: "2026-01-18",
    submission: "https://behance.net/logo-phase-2"
  },
  {
    id: "t14",
    title: "Persona Development",
    description: "Create three detailed user personas representing our target audience.",
    team: "product-design",
    status: "Completed",
    deadline: "2026-01-18",
    dateAdded: "2026-01-14",
    submission: "https://figma.com/file/personas-hng"
  },
  {
    id: "t15",
    title: "Security Audit: Form Inputs",
    description: "Perform cross-site scripting (XSS) tests on all user input fields.",
    team: "qa-testing",
    status: "In-Progress",
    deadline: "2026-01-28",
    dateAdded: "2026-01-25",
    submission: null
  }
];

export const TEAMS = [
  "frontend-dev",
  "video-editing",
  "graphic-design",
  "product-design",
  "qa-testing"
];