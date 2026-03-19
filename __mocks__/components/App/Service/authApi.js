const authApi = {
  useLoginUserMutation: jest.fn(() => [jest.fn(), { isLoading: false, error: null }]),
  useDeleteUserMutation: jest.fn(() => [jest.fn(), { isLoading: false, error: null }]),
  useCerrarMobileMutation: jest.fn(() => [jest.fn(), { isLoading: false, error: null }]),
};

export default authApi;