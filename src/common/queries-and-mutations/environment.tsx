import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Alert } from 'components/Toast'
import { toast } from 'react-toastify'
import { services } from 'services'
import {
  AuditType,
  CreateEnvDto,
  CreateNoteDto,
  DecryptionPasswordDto,
  EditEnvDto,
  EnvironmentDto,
  NoteType,
  SaveEnvDto
} from 'services/dtos/environment.dto'
import { QueryParams } from 'types/general.type'

export const useGetEnvironment = (projectId: number, environmentId: number) => {
  return useQuery<EnvironmentDto, AxiosError<Error>>(
    ['get-environment', projectId, environmentId],
    () => services.environmentService.getEnvironment(projectId, environmentId),
    {
      enabled: !!environmentId,
      keepPreviousData: false,
      refetchOnWindowFocus: true,
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useToggleEnvLock = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      environmentId,
      projectId,
      isEnvLocked
    }: {
      environmentId: number
      projectId: number
      isEnvLocked: boolean
    }): Promise<{ message: string }> => {
      return services.environmentService.toggleEnvironmentLock(
        projectId,
        environmentId,
        isEnvLocked
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['toogle-env-lock'])
        queryClient.invalidateQueries(['get-environment'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useSaveEnv = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (saveEnvDto: SaveEnvDto): Promise<any> => {
      return services.environmentService.saveEnv(saveEnvDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['save-env'])
        queryClient.invalidateQueries(['get-environment'])
        queryClient.invalidateQueries(['get-audits'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useValidateDecryptionPassword = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (decryptionPasswordDto: DecryptionPasswordDto) => {
      return services.environmentService.validateDecryptionPassword(
        decryptionPasswordDto
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['validate-decryption'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useCreateNote = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (createNoteDto: CreateNoteDto) => {
      return services.environmentService.createNote(createNoteDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['create-note'])
        queryClient.invalidateQueries(['get-notes'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useGetNoteList = ({
  whereOptions,
  paginationOptions,
  enabled
}: QueryParams) => {
  return useQuery<NoteType, AxiosError<Error>>(
    ['get-notes', paginationOptions, whereOptions],
    () => services.environmentService.getNotes(whereOptions, paginationOptions),
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

export const useGetProjectEnvs = (projectId: number) => {
  return useQuery<EnvironmentDto[], AxiosError<Error>>(
    ['get-project-env', projectId],
    () => services.environmentService.getProjectEnvs(projectId),
    {
      enabled: !!projectId,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useCreateEnv = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (createEnvDto: CreateEnvDto) => {
      return services.environmentService.createEnv(createEnvDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['create-env'])
        queryClient.invalidateQueries(['get-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useEditEnvironment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (editEnvDto: EditEnvDto): Promise<any> => {
      return services.environmentService.editEnvironment(editEnvDto)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['edit-environment'])
        queryClient.invalidateQueries(['get-project'])
        queryClient.invalidateQueries(['get-audits'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useDeleteEnvironment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      projectId,
      environmentId
    }: {
      projectId: number
      environmentId: number
    }): Promise<any> => {
      return services.environmentService.deleteEnvironment(
        projectId,
        environmentId
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['delete-environment'])
        queryClient.invalidateQueries(['get-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useLockEnvironment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      projectId,
      environmentId
    }: {
      projectId: number
      environmentId: number
    }): Promise<any> => {
      return services.environmentService.lockEnvironment(
        projectId,
        environmentId
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lock-environment'])
        queryClient.invalidateQueries(['get-project'])
      },
      onError: (error: Error) => {
        toast.error(<Alert message={error.message} type="error" />)
      }
    }
  )
}

export const useGetEnvAuditList = ({
  whereOptions,
  paginationOptions,
  enabled
}: QueryParams) => {
  return useQuery<AuditType, AxiosError<Error>>(
    ['get-audits', paginationOptions, whereOptions],
    () =>
      services.environmentService.getEnvAuditLogs(
        whereOptions,
        paginationOptions
      ),
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
