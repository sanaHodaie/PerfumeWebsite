export const ADMIN_USER_ID =
  '08c9a8ca-68fc-4810-bd6e-aa002711ab05';

export const isAdminUser = (user) => {
  return Boolean(user?.id && user.id === ADMIN_USER_ID);
};