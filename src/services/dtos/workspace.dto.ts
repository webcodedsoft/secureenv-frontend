export interface WorkspaceDto {
  id: number | null
  workspaceId: string
  workspaceName: string
  emailAddress: string
  slug: string
  createdAt: string
  updatedAt: any
  deletedAt: any
}


export type WorkspaceDtoPayload = {
  workspaceName: string;
  emailAddress: string;
};
