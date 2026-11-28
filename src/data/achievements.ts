import googleAiLabImg from "../assets/achievements/1.webp";
import buildWithAiImg from "../assets/achievements/2.webp";
import researchPaperImg from "../assets/achievements/3.webp";
import researchPaperCert from "../assets/achievements/3c.webp";
import promptWarsVolunteerImg from "../assets/achievements/v1.webp";

export interface AchievementSlide {
  project_id: string;
  type?: "swiper";
  category: string;
  left_panel: {
    header: string;
    body: string;
    highlights: string[];
    organizer: string;
    location: string;
    button_text?: string;
    link?: string;
    status_label?: string;
  };
  right_panel?: {
    visual_asset: string;
    card_style: string;
  };
}

export const achievementsData = [
  {
    id: "gfg_dsa",
    value: 270,
    prefix: "",
    suffix: "+",
    label: "Algorithmic Challenges Conquered",
  },
  {
    id: "google_badges",
    value: 27,
    prefix: "",
    suffix: "",
    label: "Google Skills Badges",
  },
  {
    id: "gfg_streak",
    value: 77,
    prefix: "",
    suffix: " Days",
    label: "Continuous Active Coding Streak",
  },
];

export const achievementsCarouselData: AchievementSlide[] = [
  {
    project_id: "00b",
    category: "Research & Publication",
    left_panel: {
      header: "Research Paper Presentation – BICET 2026",
      body: "Presented my first survey paper, \"The Evolution of Machine Learning in Diabetes Mellitus,\" exploring how machine learning advances diabetes prediction and clinical management.",
      highlights: [
        "First academic survey paper presentation",
        "Focused on ML-driven diabetes prediction",
        "Presented at the BICET 2026 conference"
      ],
      organizer: "Bharath College of Science & Management",
      location: "Thanjavur",
      button_text: "View Certificate",
      link: researchPaperCert
    },
    right_panel: {
      visual_asset: researchPaperImg,
      card_style: "dynamic_3d_render"
    }
  },
  {
    project_id: "00a",
    category: "Developer Bootcamp",
    left_panel: {
      header: "Build with AI Bootcamp",
      body: "Attended the Build with AI Bootcamp by Hack2Skill and Google for Developers, exploring Antigravity and building a Sales Report project with real-time data integration.",
      highlights: [
        "Hands-on exploration of Antigravity",
        "Built a live Sales Report project",
        "Implemented real-time data integration"
      ],
      organizer: "Hack2Skill & Google for Developers",
      location: "RIT, Chennai",
      status_label: "Bootcamp Completed"
    },
    right_panel: {
      visual_asset: buildWithAiImg,
      card_style: "dynamic_3d_render"
    }
  },
  {
    project_id: "000",
    category: "Cloud & AI Workshop",
    left_panel: {
      header: "Google Cloud AI Labs Series",
      body: "Participated in the Gen AI Exchange by Google Cloud and Hack2Skill, gaining hands-on experience with Cloud SQL, MCP Toolbox, and building AI agents using Google's ADK.",
      highlights: [
        "Hands-on labs with Cloud SQL & MCP Toolbox",
        "Built an AI agent using Google's ADK",
        "Completed Gen AI Exchange developer tracks"
      ],
      organizer: "Google Cloud & Hack2Skill",
      location: "Chennai",
      button_text: "View Learning Badge",
      link: "https://developers.google.com/profile/badges/recognitions/learnings?hl=en"
    },
    right_panel: {
      visual_asset: googleAiLabImg,
      card_style: "dynamic_3d_render"
    }
  },
  {
    project_id: "prompt-wars-volunteer",
    category: "Community & Volunteering",
    left_panel: {
      header: "Prompt Wars Hackathon – Volunteer",
      body: "Volunteered at the Prompt Wars Hackathon alongside Google Developer Groups (GDG) and Hack2Skill teams to support event operations, participant check-ins, and coordination.",
      highlights: [
        "Supported live hackathon event operations",
        "Managed participant check-ins and flow",
        "Collaborated with GDG & Hack2Skill teams"
      ],
      organizer: "GDG & Hack2Skill",
      location: "Chennai",
      status_label: "Community Volunteer"
    },
    right_panel: {
      visual_asset: promptWarsVolunteerImg,
      card_style: "dynamic_3d_render"
    }
  },
  {
    project_id: "swiper-slide",
    type: "swiper",
    category: "Competitive Milestone",
    left_panel: {
      header: "Symposium Victories",
      body: "Achieved 12 winnings across 9 technical symposiums and coding competitions, with every milestone documented and professionally verified.",
      highlights: [
        "9 technical symposiums participated",
        "12 verified competition winnings",
        "Consistent coding & tech event excellence"
      ],
      organizer: "Inter-Collegiate Symposiums",
      location: "Statewide",
      button_text: "View LinkedIn Post",
      link: "https://www.linkedin.com/in/madhu-sudan-0006a429a/"
    }
  }
];
