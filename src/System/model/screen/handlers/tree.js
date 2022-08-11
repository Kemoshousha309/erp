import { faFile } from "@fortawesome/free-solid-svg-icons";
export const getRelatedIcon = (form_no, iconMap) => {
  let relatedIcon = faFile;
  iconMap.forEach((ele) => {
    if (ele.form_no === form_no) {
      relatedIcon = ele.icon;
    }
  });
  return relatedIcon;
};

const orderList = (list) => {
  if (list.length <= 1) {
    return list;
  }
  const pivot = list[list.length - 1];
  const leftArr = [];
  const rightArr = [];
  for (const el of list.slice(0, list.length - 1)) {
    el.form_order > pivot.form_order ? rightArr.push(el) : leftArr.push(el);
  }
  return [...orderList(leftArr), pivot, ...orderList(rightArr)];
};

const getChildren = (parent, WholeTreeArr) => {
  parent.children = [];
  WholeTreeArr.forEach((ele) => {
    if (ele.parent_form === parent.form_no) {
      parent.children.push(ele);
    }
  });
  parent.children = orderList(parent.children);
  parent.children.forEach((child) => {
    if (child.main) {
      getChildren(child, WholeTreeArr);
    }
  });
};

export const getTreeStructure = (treeArr) => {
  let rootParents = [];
  treeArr.forEach((ele) => {
    if (ele.parent_form === 0 && ele.main) {
      rootParents.push(ele);
    }
  });
  rootParents = orderList(rootParents);
  rootParents.forEach((parent) => {
    getChildren(parent, treeArr);
  });
  return rootParents;
};

export const getRelatedRoute = (form_no, routeMap) => {
  let relatedRoute = null;
  routeMap.forEach((ele) => {
    if (ele.form_no === form_no) {
      relatedRoute = ele.route;
    }
  });
  if (relatedRoute === "") {
    return null;
  }
  return relatedRoute;
};

export const treeHandler = (event, sideNavActivity) => {
  if (sideNavActivity) {
    sideNavActivity();
  }
  let Element = null;
  const path =
    event.nativeEvent.path ||
    (event.nativeEvent.composedPath && event.nativeEvent.composedPath());
  path.forEach((ele) => {
    if (ele.tagName === "LI") {
      Element = ele;
    }
  });
  const children = Element.nextElementSibling;
  if (children) {
    if (children.classList.contains("d-none")) {
      children.classList.remove("d-none");
      children.classList.add("d-block");
    } else if (children.classList.contains("d-block")) {
      children.classList.remove("d-block");
      children.classList.add("d-none");
    }
  }
};
