import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseQueryOptions,
} from '@tanstack/react-query'
import { authApi } from "./api";
import { IUser } from '@project/shared-types';

export function useCurrentUser(options?: Omit<UseQueryOptions<IUser, Error>, 'queryKey' | 'queryFn'>) {
    return useQuery<IUser, Error>({
        queryKey: ['auth', 'me'],
        queryFn: () => authApi.getProfile(),
        ...options,
    });
}