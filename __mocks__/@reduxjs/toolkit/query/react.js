export const fetchBaseQuery = jest.fn(() => jest.fn());
export const createApi = jest.fn(() => ({}));

const mockUseQuery = jest.fn(() => ({
  data: [],
  isLoading: false,
  error: null,
}));

const mockUseMutation = jest.fn(() => [jest.fn(), { isLoading: false, error: null }]);

export const useGetAsociacionesQuery = mockUseQuery;
export const useGetPedidosQuery = mockUseQuery;
export const useGetEntregasQuery = mockUseQuery;
export const useCreatePedidoMutation = mockUseMutation;
export const useUpdatePedidoMutation = mockUseMutation;
export const useCreateEntregaMutation = mockUseMutation;
export const useLoginUserMutation = mockUseMutation;
export const useDeleteUserMutation = mockUseMutation;
export const useCerrarMobileMutation = mockUseMutation;