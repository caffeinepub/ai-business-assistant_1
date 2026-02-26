import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { TechnologyJourney } from '../backend';

// ─── Journey Queries ───────────────────────────────────────────────────────────

export function useGetUserJourney() {
  const { actor, isFetching } = useActor();

  return useQuery<TechnologyJourney>({
    queryKey: ['userJourney'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.getUserJourney();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useInitializeJourney() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.initializeJourney();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userJourney'] });
    },
  });
}

export function useMarkMilestoneCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestoneId: bigint) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.markMilestoneCompleted(milestoneId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userJourney'] });
    },
  });
}
