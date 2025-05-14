export interface UserStats {
    Followers: number;
    Repositories: number;
    'Pull Requests': number;
    Issues: number;
    Commits: number;
    'Contributed To': number;
    'Star Earned': number;
    'Total Contibutions': number;
    'Longest Streak': number;
    'Longest Streak Start': string | null;
    'Longest Streak End': string | null;
    'Current Streak': number;
    'Current Streak Start': string | null;
    'Current Streak End': string | null;
    AvatarUrl: string;
    Failure?: any
  }

  export interface UserData {
    user: {
      followers: { totalCount: number };
      repositoriesWithStargazerCount: {
        totalCount: number;
        nodes: { stargazerCount: number }[];
      };
      pullRequests: { totalCount: number };
      issues: { totalCount: number };
      contributionsCollection: { totalCommitContributions: number; contributionYears: string[]; };
      repositoriesContributedTo: { totalCount: number };
      avatarUrl: string;
    };
  }
  