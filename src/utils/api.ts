interface User {
    name: string
    email: string
}

interface FileData {
    name: string
    folder: boolean
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

interface GitInfo {
    author: User
    commit_hash: string
    commit_message: string
    commit_time: number
    committer: User
    name: string | null
}

interface RepoGitData {
    branches: Array<string>
    default_branch: string
    head: GitInfo
    tags: Array<string>
}

interface Metadata {
    contibutors: Array<User>
    description: string
    fork: number
    forked_from: object
    gitUrl: string
    name: string
    owner: User
    star: number
    watch: number
}

export type { Issue, IssueContent, RepoDesc, Metadata, RepoGitData, FileData }