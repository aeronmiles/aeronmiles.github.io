import { LitElement, html, css, property, customElement } from '../lit';

type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  default_branch: string;
  updated_at: string;
  readme_image: string;
};

@customElement('github-repos')
export class GitHubRepos extends LitElement
{

  static styles = css`
    .card {
      border: 1px solid #e1e4e8;
      padding: 16px;
      margin: 16px 0;
      border-radius: 6px;
    }
  `;

  @property({ type: String }) username: string = '';
  @property({ type: Array }) repos: GitHubRepository[] = [];

  connectedCallback()
  {
    super.connectedCallback();
    this.fetchRepos();
  }

  async fetchRepos()
  {
    const response = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100`);
    if (!response.ok)
    {
      throw new Error(`GitHub API responded with a status code of ${response.status}`);
    }

    this.repos = await response.json();
    this.repos = this.repos.filter(repo => !repo.fork && repo.description);
    // Fetch images for all repos and wait for all to complete
    this.repos = await Promise.all(
      this.repos.map(async r =>
      {
        r.readme_image = await this.fetchReadmeImage(r);
        console.log(r);
        return r;
      })
    );
  }

  async fetchReadmeImage(repo: GitHubRepository)
  {
    // Step 1: Fetch the README.md content
    const baseUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}`;
    const response = await fetch(baseUrl + '/README.md');

    if (!response.ok)
    {
      throw new Error(`GitHub responded with a status code of ${response.status}`);
    }

    const content = await response.text();

    // Step 2: Parse the content to extract image references
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    let image: string = "";

    while (match = imageRegex.exec(content))
    {
      image = `${baseUrl + match[1].replace('./', '/')}`;
      break;
    }

    return image;
  }

  render()
  {
    return html`
      ${this.repos.map(repo => html`
        <div class="bounds">
          <am-title level="3" title1="${repo.name}" tag1="${repo.description ? repo.description : ""}"></am-title>
          <img width="100%" src="${repo.readme_image}"></a>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        </div>
      `)}
    `;
  }

}