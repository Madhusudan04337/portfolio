import googleAiLabImg from "../assets/achievements/1.png";
import buildWithAiImg from "../assets/achievements/2.jpg";
import researchPaperImg from "../assets/achievements/3.jpg";
import researchPaperCert from "../assets/achievements/3c.jpg";

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

export const achievementsCarouselData = [
  {
    project_id: "00b",
    left_panel: {
      header: "Research Paper Presentation – BICET 2026",
      body: "Presented my first survey paper at BICET 2026, Bharath College of Science and Management, Thanjavur. The paper \"The Evolution of Machine Learning in Diabetes Mellitus\" explores how ML is transforming diabetes prediction and management.",
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
    left_panel: {
      header: "Build with AI Bootcamp",
      body: "Attended the Build with AI Bootcamp by Hack2Skill & Google for Developers at Rajalakshmi Institute of Technology, Chennai. Explored Antigravity and built a Sales Report project with real-time data integration.",
      button_text: "Event Details",
    },
    right_panel: {
      visual_asset: buildWithAiImg,
      card_style: "dynamic_3d_render"
    }
  },
  {
    project_id: "000",
    left_panel: {
      header: "Google Cloud AI Labs Series",
      body: "Attended the Gen AI Exchange by Google Cloud & Hack2Skill in Chennai. Gained hands-on experience with Cloud SQL, MCP Toolbox, and built an AI agent using Google’s ADK.",
      button_text: "View Learning Badge",
      link: "https://developers.google.com/profile/badges/recognitions/learnings?hl=en"
    },
    right_panel: {
      visual_asset: googleAiLabImg,
      card_style: "dynamic_3d_render"
    }
  },
  {
    project_id: "swiper-slide",
    type: "swiper",
    left_panel: {
      header: "Symposium Victories",
      body: "9 Symposiums • 12 Winnings. A track record of excellence in technical symposiums and coding competitions across the state.\n\nAll achievements are professionally verified. Visit my LinkedIn profile to explore the full journey and event highlights.",
      button_text: "View LinkedIn Post",
      link: "https://www.linkedin.com/in/madhu-sudan-0006a429a/"
    }
  }
];
