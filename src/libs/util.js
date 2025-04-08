import { model } from "../model.js";

export const getModel = () => {
  return model;
};
export const getData = async () => {
  let response = await fetch(
    `${import.meta.env.R2_CUSTOM_DOMAIN}/${
      import.meta.env.PROJECT_ID
    }/data.json`
  );
  let data;
  if (response.ok) {
    data = await response.json();
  } else {
    data = {};
    modelJSON.groups.forEach((group) => {
      data[group.id] = {};
    });
  }
  return data;
};
