function TreeData(element, tree) {
  if (element.children) {
    element.children.forEach((children) => {
      tree.push(children);
      TreeData(children, tree);
    });
  }
}
export default TreeData;
