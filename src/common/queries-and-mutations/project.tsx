import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { services } from 'services'
import {
  Contributors,
  CreateProjectDto,
  ProjectDaum,
  ProjectDto,
  UpdateProjectDto
} from 'services/dtos/project.dto'
import { QueryParams } from 'types/general.type'

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (createProjectDto: CreateProjectDto): Promise<any> => {
      return services.projectService.createProject(createProjectDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['create-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useGetProjects = ({
  whereOptions,
  paginationOptions,
  enabled
}: QueryParams) => {
  return useQuery<ProjectDto, AxiosError<Error>>(
    ['get-projects', paginationOptions, whereOptions],
    () => services.projectService.getProjects(whereOptions, paginationOptions),
    {
      enabled,
      // refetchOnWindowFocus: true,
      retry: false,
      refetchInterval: 4000,
      staleTime: 4000,
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useGetProject = (projectId: number, projectSlug: string) => {
  return useQuery<ProjectDaum, AxiosError<Error>>(
    ['get-project', projectId, projectSlug],
    () => services.projectService.getProject(projectId, projectSlug),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useGetProjectContributors = (
  projectId: number,
  projectSlug: string,
  pageNum: number,
  pageSize: number,
  enabled: boolean
) => {
  return useQuery<Contributors, AxiosError<Error>>(
    ['get-project-contributors', projectId, projectSlug],
    () =>
      services.projectService.getProjectContributors(
        projectId,
        projectSlug,
        pageNum,
        pageSize
      ),
    {
      enabled,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useHandleContributor = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      projectId,
      accountId
    }: {
      projectId: number
      accountId: number
    }): Promise<any> => {
      return services.projectService.handleContributor(projectId, accountId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['handle-contributor'])
        queryClient.invalidateQueries(['get-project-contributors'])
        queryClient.invalidateQueries(['get-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useToggleProjectLock = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      projectId,
      isLocked
    }: {
      projectId: number
      isLocked: boolean
    }): Promise<any> => {
      return services.projectService.toggleProjectLock(projectId, isLocked)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lock-project'])
        queryClient.invalidateQueries(['get-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useEditProject = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      projectId,
      updateProjectDto
    }: {
      projectId: number
      updateProjectDto: UpdateProjectDto
    }): Promise<any> => {
      return services.projectService.editProject(projectId, updateProjectDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['edit-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ projectId }: { projectId: number }): Promise<any> => {
      return services.projectService.deleteProject(projectId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['delete-project'])
        queryClient.invalidateQueries(['get-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}
