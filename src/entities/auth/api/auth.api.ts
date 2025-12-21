import { baseApi } from "@/shared/api/baseApi";

type User = {
  id: string;
  name: string;
  email: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    getUsers: build.query<User, void>({
      query: () => "/users",
    }),
    registerUser: build.mutation<
      { id: string; name: string; email: string },
      { name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery, useRegisterUserMutation } =
  authApi;
