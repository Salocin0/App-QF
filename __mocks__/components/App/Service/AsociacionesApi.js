const AsociacionesApi = {
  useGetAsociacionesQuery: jest.fn(() => ({
    data: [],
    isLoading: false,
    error: null,
  })),
};

export default AsociacionesApi;