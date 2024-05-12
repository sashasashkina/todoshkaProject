export const selectUserName = (state) => state.auth.user.name;
export const selectUserId = (state) =>
  state.auth.user ? state.auth.user.id : null;

export const selectUserAvatar = (state) => state.auth.user.avatarURL;

export const selectUserEmail = (state) =>
  state.auth.user ? state.auth.user.email : null;

//NEW Selectors

export const selectAuthState = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLogin;
export const selectAuthToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
// export const selectUser = (state) => state.auth.user;
export const selectUserTheme = (state) => state.auth.user.theme;
