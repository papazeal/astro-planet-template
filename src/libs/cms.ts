import data from "/cms/data.json" assert { type: "json" };

export const getSiteData = async () => {
  return data;
};
