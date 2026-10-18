// Helper to create a template problem entry
export const p = (title, difficulty, definition, leetcodeSlug, customId) => {
  const slug = leetcodeSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: customId || slug,
    title,
    difficulty,
    definition,
    leetcodeUrl: `https://leetcode.com/problems/${slug}/description/`,
    examples: [
      { input: '', output: '' },
      { input: '', output: '' }
    ],
    brute: { idea: '', code: '', time: '', space: '', timeDesc: '', spaceDesc: '' },
    better: { idea: '', code: '', time: '', space: '', timeDesc: '', spaceDesc: '' },
    optimal: { idea: '', code: '', time: '', space: '', timeDesc: '', spaceDesc: '' }
  };
};
