interface User {
    name: string
    email: string
}

interface Issue {
    contents: Array<IssueContent>
    issuer: User
    repo_issue_id: number
    status: string
    tag: Array<string>
    title: string
    created_at: number
    updated_at: number
}

interface IssueContent {
    content: string
    created_at: number
    issue_content_id: number
    sender: User
}

interface RepoDesc {
    gitUrl: string
    name: string
    owner: User
    ownerName: string
    public: boolean
    repoName: string
}

export type { Issue, IssueContent, RepoDesc }