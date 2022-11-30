interface User {
    name: string
    email: string
}

interface FileData {
    name: string
    modify_commit: Commit
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
    comment_count: number
}

interface Pull {
    from: RepoDesc
    to: RepoDesc
    from_branch: string
    to_branch: string
}

interface PullStatus {
    conflict_files: Array<string>
    from: RepoDesc
    to: RepoDesc
    from_branch: string
    to_branch: string
    status: string
}

interface IssueContent {
    content: string
    created_at: number
    issue_content_id: number
    sender: User
}

interface Commit {
    commit_hash: string
    commit_message: string
    commiter: User
    author: User
    commit_time: number
}

interface CommitDiff {
    file_path: string,
    origin: string,
    current: string
}

interface RepoDesc {
    gitUrl: string
    name: string
    owner: User
    ownerName: string
    public: boolean
    repoName: string
    starred: boolean
    watched: boolean
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
    starred: boolean
    watch: number
    watched: boolean
    hasPage: boolean
    pageUrl: string
}

interface Collaborator {
    canRead: boolean
    canWrite: boolean
    isOwner: boolean
    repo: RepoDesc
    user: User
}

interface CITaskData {
    id: number
    ciName: string
    hash: string
    createTime: number
}

export type { Issue, Pull, PullStatus, IssueContent, Commit, CommitDiff, RepoDesc, Metadata, RepoGitData, FileData, Collaborator, CITaskData }
