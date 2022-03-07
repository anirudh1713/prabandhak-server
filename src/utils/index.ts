export const wrapWithData = (data: Record<string | number, any>) => {
  return {
    data: {
      ...data,
    },
  };
};
