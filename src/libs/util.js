import modelJSON from "/src/model.json" assert { type: "json" };

export const getModel = () => {
  return modelJSON;
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
