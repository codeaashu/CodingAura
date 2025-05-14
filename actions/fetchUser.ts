import { UserData, UserStats } from "@/types";
import { graphQL } from "./graphql";
import { fetchYearContributions } from "./fetchYearContributions";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateTotalContributions,
  formatDate,
} from "@/utils/calc";

const userStatsQuery = `
  followers {
    totalCount
  }
  contributionsCollection {
    totalCommitContributions
  }
  repositoriesContributedTo(
    first: 1
    contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]
  ) {
    totalCount
  }
  pullRequests(first: 1) {
    totalCount
  }
  issues(first: 1) {
    totalCount
  }
  createdAt
  updatedAt
  repositoriesWithStargazerCount: repositories(
    first: 100
    privacy: PUBLIC
    ownerAffiliations: OWNER
    orderBy: {field: STARGAZERS, direction: DESC}
  ) {
    totalCount
    nodes {
      stargazerCount
    }
  }
  contributionsCollection {
    contributionYears
  }
  avatarUrl
`;

const fetchUser = async (
  username: string
): Promise<{ userStats: UserStats }> => {
  try {
    const query = `
        query ($username: String!){
            user (login: $username) {
                ${userStatsQuery}
            }
        }
    `;

  if(!username) return { userStats: {} as UserStats };
  const response = await graphQL({ query, variables: { username: username } });

  const data: UserData = response;
  
  if(data.user === null ) return { userStats: {} as UserStats };

  const contibutonYears = data.user.contributionsCollection.contributionYears;
  let allContributionDays: { date: string; contributionCount: number }[] = [];

  for (const year of contibutonYears) {
    const yearContributions: { date: string; contributionCount: number }[] =
      await fetchYearContributions(username, Number(year));
    allContributionDays = allContributionDays.concat(yearContributions);
  }

  allContributionDays.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const { total } = calculateTotalContributions(allContributionDays);
  const {
    longestStreak,
    startDate: longestStreakStart,
    endDate: longestStreakEnd,
  } = calculateLongestStreak(allContributionDays);
  const longestStreakStartDate = formatDate(longestStreakStart);
  const longestStreakEndDate = formatDate(longestStreakEnd);
  const {
    currentStreak,
    startDate: currentStreakStart,
    endDate: currentStreakEnd,
  } = calculateCurrentStreak(allContributionDays);
  const currentStreakStartDate = formatDate(currentStreakStart);
  const currentStreakEndDate = formatDate(currentStreakEnd);

  const userStats: UserStats = {
    Followers: data.user.followers.totalCount,
    Repositories: data.user.repositoriesWithStargazerCount.totalCount,
    "Pull Requests": data.user.pullRequests.totalCount,
    Issues: data.user.issues.totalCount,
    Commits: data.user.contributionsCollection.totalCommitContributions,
    "Contributed To": data.user.repositoriesContributedTo.totalCount,
    "Star Earned": data.user.repositoriesWithStargazerCount.nodes.reduce(
      (acc, repo) => acc + repo.stargazerCount,
      0
    ),
    "Total Contibutions": total,
    "Longest Streak": longestStreak,
    "Longest Streak Start": longestStreakStartDate,
    "Longest Streak End": longestStreakEndDate,
    "Current Streak": currentStreak,
    "Current Streak Start": currentStreakStartDate,
    "Current Streak End": currentStreakEndDate,
    AvatarUrl: data.user.avatarUrl,
  };

  return {
    userStats,
  };
  } catch (error) {
    console.log(error);
    return { userStats: { } as UserStats };
  }
};

export default fetchUser;
