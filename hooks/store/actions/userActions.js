import { useAppDispatch } from "../store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const updateUser = (user) => {
    dispatch(user);
  };

  return { updateUser };
};
