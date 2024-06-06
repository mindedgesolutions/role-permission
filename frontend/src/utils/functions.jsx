export const serialNo = (page) => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * 10 + 1;
  return srno;
};

export const switchColor = (roleId) => {
  let bcolor;

  if (roleId === 1) {
    bcolor = "primary";
  } else if (roleId === 2) {
    bcolor = "danger";
  } else if (roleId === 3) {
    bcolor = "success";
  }

  return bcolor;
};
