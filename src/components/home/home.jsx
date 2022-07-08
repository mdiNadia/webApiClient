import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TreeData from "../common/treeView/treeData";
import TreeView from "../common/treeView/treeView";

const Home = () => {
  const store = useSelector((repo) => repo.Module.payload);
  const [treeData, setTreeData] = useState([]);
  const [saveData, setSaveData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [showLine, setShowLine] = useState(true);

  const [showIcon, setShowIcon] = useState(false);
  const [showLeafIcon, setShowLeafIcon] = useState(true);
  const getChildren = (parent) => {
    const chilren =
      store &&
      store
        .filter((s) => s.id == parent)
        .map((c) => {
          return {
            title: c.title,
            key: `${c.id}`,
            // icon: <i className="fa fa-trash"></i>,
            children: getChildren(`${c.id}`),
          };
        });
    return chilren;
  };
  const treeWithChildren = (store) => {
    const dataAnalys =
      store &&
      store
        .filter((s) => s.parentId === 0)
        .map((t) => {
          return {
            title: t.title,
            key: `${t.id}`,
            //icon: <i className="fa fa-trash"></i>,
            children: getChildren(`${t.id}`),
          };
        });
    setSaveData(dataAnalys);
    setTreeData(dataAnalys);
  };
  const onExpand = (expandedKeys) => {
    console.log("onExpand", expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  // show line or icon
  const onSetLeafIcon = (checked) => {
    setShowLeafIcon(checked);
    setShowLine({
      showLeafIcon: checked,
    });
  };
  const onSetShowLine = (checked) => {
    setShowLine(
      checked
        ? {
            showLeafIcon,
          }
        : false
    );
  };
  //end show line or icon

  const onDragEnter = (e) => {
    console.log("onDragEnter", e);
    setExpandedKeys(e.expandedKeys);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  const checkAll = (e) => {
    const tree = [];
    treeData.forEach((element) => {
      tree.push(element);
      TreeData(element, tree);
    });
    setCheckedKeys(tree.map((c) => c.key));
  };
  const unCheckAll = (e) => {
    setCheckedKeys([]);
  };
  useEffect(() => {
    treeWithChildren(store);

    onSetLeafIcon(false);
    onSetShowLine(true);
  }, [showLeafIcon, store]);

  return (
    <div className="content-box">
      <TreeView
        saveData={saveData}
        treeData={treeData}
        setTreeData={setTreeData}
        showLine={showLine}
        showLeafIcon={showLeafIcon}
        showIcon={showIcon}
        expandedKeys={expandedKeys}
        setExpandedKeys={setExpandedKeys}
        checkedKeys={checkedKeys}
        setCheckedKeys={setCheckedKeys}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        autoExpandParent={autoExpandParent}
        setAutoExpandParent={setAutoExpandParent}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setShowIcon={setShowIcon}
        onDragEnter={onDragEnter}
        onCheck={onCheck}
        onSelect={onSelect}
        onExpand={onExpand}
        checkAll={checkAll}
        unCheckAll={unCheckAll}
      />
    </div>
  );
};

export default Home;
