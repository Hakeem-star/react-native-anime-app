import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
} from "react-query";
import {
  AnimesQuery,
  AnimesQueryVariables,
  fetcher,
} from "../generated/graphql";

interface UseQueryFn<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
> {
  (variables: TVariables, options?: UseQueryOptions<TData>): unknown;
  document: string;
  getKey: (variables: TVariables) => unknown[];
}

export function useInfiniteGraphQLQuery<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
>(
  useQuery: UseQueryFn<TData, TVariables>,
  getVariables: ({ pageParam }: { pageParam?: number }) => TVariables,
  options?: UseInfiniteQueryOptions<TData, Error>
): UseInfiniteQueryResult<TData, Error> {
  return useInfiniteQuery<TData, Error>(
    useQuery.getKey(getVariables({})),
    ({ pageParam }) => {
      const test = fetcher<AnimesQuery, AnimesQueryVariables>(
        useQuery.document,
        getVariables({ pageParam })
      );

      return test() as unknown as Promise<TData> | TData;
    },

    options
  );
}
