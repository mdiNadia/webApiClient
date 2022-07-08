import React, { Component } from "react";
import _ from "lodash";
import { Checkbox } from "antd";
import { Static_Source_Url } from "../../../api/api";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.timeout = null;
  }
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  onClick(item, e) {
    e.preventDefault();

    if (this.timeout === null) {
      this.timeout = window.setTimeout(() => {
        this.timeout = null;
        this.props.onRowOnclick(item);
      }, 300);
    }
  }

  onDoubleClick(item, e) {
    e.preventDefault();
    window.clearTimeout(this.timeout);
    this.timeout = null;
    this.props.onRowOnDoubleclick(item);
  }
  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr
              key={index}
              onClick={(e) => {
                this.onClick(item, e);
              }}
              onDoubleClick={(e) => {
                this.onDoubleClick(item, e);
              }}
            >
              {columns.map((column) => (
                <td colSpan={5} key={this.createKey(item, column)}>
              
                  {column.label === "تصویر" ? (
                    <img
                      src={`${Static_Source_Url}`+`${this.renderCell(item, column)}`}
                      width={"80"}
                      alt=""
                    />
                  ) : column.label === "فعال است؟" ? this.renderCell(item, column) === true ? "بله" : "خیر":  (
                    this.renderCell(item, column)
                  )}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    );
  }
}

export default TableBody;
