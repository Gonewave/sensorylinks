import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User", "Customer", "Transactions", "Admins", "Sales",
    "Performance", "Dashboard", "Overview", "Goals","Child", "Therapies","Special_Needs","Holiday_Planner",
 "Vacation_Planner" ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"]
    }),
    getCustomers: build.query({
      query: () => "client/customer/",
      providesTags: ["Customer"]
    }),
    getChild: build.query({
      query: () => "client/child/",
      providesTags: ["Child"]
    }),

    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"]
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search }
      }),
      providesTags: ["Transactions"]
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"]
    }),
    getTherapies: build.query({
      query: () => "therapies/therapies/",
      providesTags: ["Therapies"]
    }),
    getNeeds: build.query({
      query: () => "therapies/special_needs/",
      providesTags: ["Special_Needs"]
    }),
    getDifficulties: build.query({
      query: () => "difficulties/difficulties/",
      providesTags: ["Difficulties"]
    }),
    getGoals: build.query({
      query: () => "difficulties/goals/",
      providesTags: ["Goals"]
    }),
    getEvents: build.query({
      query: () => "holiday_planner/holiday_planner/",
      providesTags: ["Holiday_Planner"]
    }),
    getEvents: build.query({
      query: () => "holiday_planner/vacation_planner/",
      providesTags: ["Vacation_Planner"]
    }),
   
  })
});

export const {
  useGetUserQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetTherapiesQuery,
  useGetDashboardQuery,
  useGetNeedsQuery,
  useGetChildQuery,
  useGetGoalsQuery,
  useGetDifficultiesQuery,
  useGetEventsQuery
} = api;
