import {
  type Comment,
  type User,
  type Tag,
  type Status,
  type Problem,
  type TagsOnProblem,
  type Reply,
  type ProblemsResolved,
} from "@prisma/client"

export type SortByOptions =
  | "date"
  | "likes"
  | "dislikes"
  | "title"
  | "views"
  | "comments"
  | "ProblemsResolved"

export interface QueryProps {
  tags?: string
  keyword?: string
  sortBy?: SortByOptions
  sortByType?: "desc" | "asc"
  status?: Status
  take?: string
  skip?: string
}

export interface UserExtends extends User {
  _count: {
    problemsResolved: number
  }
}

export interface CommentExtends extends Comment {
  author?: UserExtends | null
  reply?: ReplyExtends[] | null
}

export interface ReplyExtends extends Reply {
  userReply?: UserExtends | null
}

export interface TagsOnProblemExtends extends TagsOnProblem {
  tag: Tag
  problem?: Problem | null
}

export interface ProblemsResolvedExtends extends ProblemsResolved {
  resolver?: UserExtends | null
}

export interface ProblemExtends extends Problem {
  user?: UserExtends | null
  comments?: CommentExtends[] | null
  tags?: TagsOnProblemExtends[] | null
  ProblemsResolved?: ProblemsResolvedExtends[] | null
}
