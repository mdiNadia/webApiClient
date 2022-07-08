import React, { useState } from "react";
import { Tree, Input } from "antd";
import "antd/dist/antd.css";
import TreeData from "./treeData";

const TreeView = ({
  saveData,
  treeData,
  setTreeData,
  showLine,
  showIcon,
  autoExpandParent,
  setAutoExpandParent,
  expandedKeys,
  setExpandedKeys,
  checkedKeys,
  selectedKeys,
  searchValue,
  setSearchValue,
  onSelect,
  onCheck,
  onDragEnter,
  onExpand,
  unCheckAll,
  checkAll,
}) => {
  ///////////////////////////////

  //const treeData = treeData;
  const { Search } = Input;
  const dataList = [];
  treeData &&
    treeData.forEach((element) => {
      dataList.push(element);
      if (element.children) {
        element.children.forEach((children) => {
          dataList.push(children);
        });
      }
    });

  function getParentKey(key, tree) {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key == key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  }

  /////////////////////////////////
  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setTreeData(data);
  };

  const onChange = (e) => {
    const { value } = e.target;
    const tree = [];
    treeData.forEach((element) => {
      tree.push(element);
      TreeData(element, tree);
    });
    if (value) {
      const expanded = tree
        .map((item) => {
          console.log(item);
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      if (value) {
        const hasSearchTerm = (n) => n.toLowerCase().indexOf(value) !== -1;
        const filterData = (arr) =>
          arr?.filter(
            (n) => hasSearchTerm(n.title) || filterData(n.children)?.length > 0
          );
        const filteredData = filterData(treeData).map((n) => {
          return {
            ...n,
            children: filterData(n.children),
          };
        });
        console.log("expanded", expanded);
        setTreeData(filteredData);
        setAutoExpandParent(true);
        setExpandedKeys(expanded);
        setSearchValue(value);
      } else {
        setExpandedKeys([]);
        setSearchValue("");
        setAutoExpandParent(false);
      }
    } else {
      setTreeData(saveData);
    }
  };
  //drag&drop
  const loop = (data) =>
    data &&
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  const expandAll = (e) => {
    const tree = [];
    treeData.forEach((element) => {
      tree.push(element);
      TreeData(element, tree);
    });
    setExpandedKeys(tree.map((c) => c.key));
  };

  const collapseAll = (e) => {
    setExpandedKeys([]);
  };

  return (
    <>
      <div className="treeview-search">
        <div>
          <button
            className="btn btn-dark btn-sm"
            onClick={(e) => {
              expandAll(e);
            }}
          >
            <i className="fa fa-expand m-1"></i>
          </button>
          <button
            className="btn btn-light btn-sm m-2"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              collapseAll(e);
            }}
          >
            <i className="fa fa-compress m-1"></i>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              checkAll(e);
            }}
          >
            <i className="fa fa-check-square-o m-1"></i>
          </button>
          <button
            className="btn btn-outline-secondary btn-sm m-2"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              unCheckAll(e);
            }}
          >
            <i className="fa fa-times m-1"></i>
          </button>
        </div>
        <Search
          style={{ marginBottom: 8, width: "300px" }}
          placeholder="Search"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <Tree
        className="draggable-tree"
        onExpand={onExpand}
        showLine={showLine}
        showIcon={showIcon}
        checkable
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        draggable
        blockNode
        onDragEnter={(e) => {
          onDragEnter(e);
        }}
        onDrop={(e) => {
          onDrop(e);
        }}
        multiple
        treeData={loop(treeData)}
      />
    </>
  );
};

export default TreeView;
