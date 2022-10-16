interface Issue {
    contents: Array<IssueContent>
    issuer: {
        name: string
        email: string
    }
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
    sender: {
        name: string
        email: string
    }
}

export type { Issue, IssueContent }