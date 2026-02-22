// Phase mapping for different project categories
// These must match the exact category names from src/data/categories.ts
export interface PhaseConfig {
  phases: string[];
}

export const PHASE_MAPPING: Record<string, PhaseConfig> = {
  // Writing & Content - 3 phases
  "Writing & Content": {
    phases: ["Drafting", "Refinement", "Finalization"]
  },
  // Design & Creative - 3 phases
  "Design & Creative": {
    phases: ["Drafting", "Refinement", "Finalization"]
  },
  // Web, Tech & Development - 6 phases
  "Web, Tech & Development": {
    phases: ["Discovery", "Design", "Development", "Testing", "Finalization", "Support"]
  },
  // Social Media & Digital Marketing - 5 phases
  "Social Media & Digital Marketing": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization", "Support"]
  },
  // Video, Audio & Multimedia - 5 phases
  "Video, Audio & Multimedia": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization", "Support"]
  },
  // Virtual Assistance & Admin - 4 phases
  "Virtual Assistance & Admin": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization"]
  },
  // Education & Tutoring - 5 phases
  "Education & Tutoring": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization", "Support"]
  },
  // AI & Automation - 6 phases
  "AI & Automation": {
    phases: ["Discovery", "Drafting", "Refinement", "Testing", "Finalization", "Support"]
  },
  // Music, Audio & Performing Arts - 5 phases
  "Music, Audio & Performing Arts": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization", "Support"]
  },
  // Art & Illustration - 3 phases
  "Art & Illustration": {
    phases: ["Drafting", "Refinement", "Finalization"]
  },
  // E-commerce & Online Business - 5 phases
  "E-commerce & Online Business": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization", "Support"]
  },
  // Student-Friendly Services - 4 phases
  "Student-Friendly Services": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization"]
  },
  // Beginner Tech & STEM Freelancing - 6 phases
  "Beginner Tech & STEM Freelancing": {
    phases: ["Discovery", "Design", "Development", "Testing", "Finalization", "Support"]
  },
  // Medical Writing & Editing - 6 phases
  "Medical Writing & Editing": {
    phases: ["Discovery", "Drafting", "Refinement", "Testing", "Finalization", "Support"]
  },
  // Medical Research & Analytics - 6 phases
  "Medical Research & Analytics": {
    phases: ["Discovery", "Drafting", "Refinement", "Testing", "Finalization", "Support"]
  },
  // Clinical Services - 5 phases
  "Clinical Services": {
    phases: ["Discovery", "Drafting", "Refinement", "Finalization", "Support"]
  }
};

// Default phases if category is not found
export const DEFAULT_PHASES = ["Discovery", "Drafting", "Refinement", "Finalization"];

// Get phases for a given category
export const getPhasesForCategory = (category: string | null): string[] => {
  if (!category) return DEFAULT_PHASES;
  return PHASE_MAPPING[category]?.phases || DEFAULT_PHASES;
};
